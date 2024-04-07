const fs = require("fs");

async function main() {
  const Contract = await ethers.getContractFactory("NeedFund");
  const contract = await Contract.deploy();

  JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile(
    "./src/artifacts/contractAddress.json",
    address,
    "utf8",
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deployed contract address", contract.target);
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
