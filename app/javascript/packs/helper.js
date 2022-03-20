const SUNDAY = "Sunday"
const MONDAY = "Monday"
const TUESDAY = "Tuesday"
const WEDNESDAY = "Wednesday"
const THURSDAY = "Thursday"
const FRIDAY = "Friday"
const SATURDAY = "Saturday"

export const WEEKDAYS = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const updateInput = (field, component) => {
    return event => {
        component.setState({
            [field]: event.target.value
        })
    }
}

export const alphaSort = (a, b) => (a.toLowerCase().localeCompare(b.toLowerCase()))

export const noDisplay = (target) => {
    console.log(target)
    target.style.display = "none"}

export const formatTime = (datetime) => {
    const raw_time = new Date(datetime)
    let time = raw_time.toLocaleTimeString()
        time = time.split(":") // the format is HH:MM:SS AM/PM, but the hour can be single or double digit
        let meridan = time[2].slice(2)
        time = time[0] + ":" + time[1] + meridan
        return time
}

export const formatDay = (datetime) => {
    const raw_date = new Date(datetime)
    const day = WEEKDAYS[raw_date.getDay()]
    const month = MONTHS[raw_date.getMonth()]
    return `${day}, ${month} ${raw_date.getDate()}`
}