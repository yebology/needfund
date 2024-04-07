import moment from "moment"
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    createScale: 'scale-0',
    updateScale: 'scale-0',
    investScale: 'scale-0',
    deleteScale: 'scale-0',
    connectedAccount: '',
})

const truncate = (text, startChar, endChar, maxLength) => {
    if (text.length > maxLength) {
        let start = text.substring(0, startChar)
        let end = text.substring(text.length - endChar, text.length)
        while (start.length + end.length < maxLength) {
            start = start + '.'
        }
        return start + end 
    }
    return text 
}

const remainingDay = (days) => {
    const today = moment()
    days = Number((days + '000').slice(0))
    days = moment(days).format('YYYY-MM-DD')
    days = moment(days)
    days = days.diff(today, 'days')
    return days == 1 ? '1 day' : days + ' days'
}

export {
    useGlobalState,
    setGlobalState,
    getGlobalState,
    truncate,
    remainingDay
}