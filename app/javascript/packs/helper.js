const SUNDAY = "Sunday"
const MONDAY = "Monday"
const TUESDAY = "Tuesday"
const WEDNESDAY = "Wednesday"
const THURSDAY = "Thursday"
const FRIDAY = "Friday"
const SATURDAY = "Saturday"

export const WEEKDAYS = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]

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