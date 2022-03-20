export const fetchServeDates = (date) => {
    return $.ajax({
        method: 'GET',
        url: `/api/serve_dates/${date}`
    })
}