// SPDX-License-Identifier : MIT

pragma solidity ^0.8.23;

contract NeedFund {
    //
    address private owner;
    uint256 private balance;
    uint256 private totalProject;
    uint256 private projectTax;
    Stats private stats;
    Project[] private projects;

    mapping(address user => Project[] projects) private projectsOf;
    mapping(uint256 => Backer[]) private backersOf;
    mapping(uint256 => bool) private isProjectExisted;

    enum ProjectStatus {
        OPEN,
        APPROVED,
        DELETED,
        PAIDOUT
    }

    struct Stats {
        uint256 totalProjects;
        uint256 totalBacking;
        uint256 totalDonations;
    }

    struct Backer {
        address owner;
        uint256 totalDonatingAmount;
        uint256 timestamp;
        bool refunded;
    }

    struct Project {
        uint256 index;
        address owner;
        string projectTitle;
        string projectDescription;
        string projectImageURL;
        uint256 cost;
        uint256 raised;
        uint256 totalRaisedSoFar;
        uint256 timestamp;
        uint256 expiredAt;
        uint256 backers;
        ProjectStatus status;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed caller,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be owner");
        _;
    }

    modifier cannotSendEmptyInput(
        string memory title,
        string memory description,
        string memory imageURL
    ) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image URL cannot be empty");
        _;
    }

    modifier onlyOwnerCanEditProject(uint256 id) {
        require(
            msg.sender == projects[id].owner,
            "Only owner can update or delete project"
        );
        _;
    }

    modifier isProjectExistsAndOpen(uint256 id) {
        require(isProjectExisted[id], "Project is not exists");
        require(
            projects[id].status == ProjectStatus.OPEN,
            "Project is not open anymore"
        );
        _;
    }

    modifier valueMustBeGreaterThanZeroEther(uint256 value) {
        require(value > 0 ether, "Value must be greater than 0 ETH");
        _;
    }
    constructor() {
        owner = msg.sender;
    }

    function createProject(
        string memory title,
        string memory description,
        string memory imageURL,
        uint256 costNeeded,
        uint256 expiredAt
    )
        external
        cannotSendEmptyInput(title, description, imageURL)
        valueMustBeGreaterThanZeroEther(costNeeded)
        returns (bool result)
    {
        Project memory project;
        project.index = totalProject;
        project.owner = msg.sender;
        project.projectTitle = title;
        project.projectDescription = description;
        project.projectImageURL = imageURL;
        project.cost = costNeeded;
        project.timestamp = block.timestamp;
        project.expiredAt = expiredAt;

        projects.push(project);
        isProjectExisted[totalProject] = true;
        projectsOf[msg.sender].push(project);
        totalProject += 1;
        stats.totalProjects = totalProject;

        emit Action(
            totalProject,
            "Successfully created project",
            msg.sender,
            project.timestamp
        );

        return true;
    }

    function updateProject(
        uint256 id,
        string memory newTitle,
        string memory newDescription,
        string memory newImageURL,
        uint256 newExpiredAt
    )
        external
        isProjectExistsAndOpen(id)
        onlyOwnerCanEditProject(id)
        returns (bool result)
    {
        projects[id].projectTitle = newTitle;
        projects[id].projectDescription = newDescription;
        projects[id].projectImageURL = newImageURL;
        projects[id].expiredAt = newExpiredAt;

        projectsOf[msg.sender][id].projectTitle = newTitle;
        projectsOf[msg.sender][id].projectDescription = newDescription;
        projectsOf[msg.sender][id].projectImageURL = newImageURL;
        projectsOf[msg.sender][id].expiredAt = newExpiredAt;

        emit Action(
            id,
            "Successfully updated project",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function deleteProject(
        uint256 id
    )
        external
        isProjectExistsAndOpen(id)
        onlyOwnerCanEditProject(id)
        returns (bool result)
    {
        projects[id].status = ProjectStatus.DELETED;
        isProjectExisted[id] = false;
        // address owner = projects[id].owner;

        refundToBackers(id);

        emit Action(
            id,
            "Successfully deleted this project",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function refundToBackers(uint256 id) private {
        for (uint256 i = 0; i < backersOf[id].length; i++) {
            address backer = backersOf[id][i].owner;
            uint256 contribution = backersOf[id][i].totalDonatingAmount;

            backersOf[id][i].refunded = true;
            backersOf[id][i].timestamp = block.timestamp;

            transferTo(backer, contribution);

            stats.totalDonations -= contribution;
            stats.totalBacking -= 1;
        }
    }

    function backProject(
        uint256 id
    )
        external
        payable
        valueMustBeGreaterThanZeroEther(msg.value)
        isProjectExistsAndOpen(id)
        returns (bool result)
    {
        stats.totalBacking += 1;
        stats.totalDonations += msg.value;

        projects[id].backers += 1;
        projects[id].raised += msg.value;

        backersOf[id].push(
            Backer(msg.sender, msg.value, block.timestamp, false)
        );

        emit Action(
            id,
            "Successfully invest in a project",
            msg.sender,
            block.timestamp
        );

        if (projects[id].raised >= projects[id].cost) {
            projects[id].status = ProjectStatus.APPROVED;
            payoutToUser(id);
        }

        return true;
    }

    function payoutToUser(uint256 id) public {
        projects[id].status = ProjectStatus.PAIDOUT;
        transferTo(projects[id].owner, projects[id].raised);

        emit Action(
            id, 
            "Succesfully paidout project", 
            msg.sender, 
            block.timestamp
        );
    }

    function transferTo(address to, uint256 amount) private {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getBackers(uint256 id) external view returns (Backer[] memory) {
        return backersOf[id];
    }

    function getProjects() external view returns (Project[] memory) {
        return projects;
    }
    //
}
