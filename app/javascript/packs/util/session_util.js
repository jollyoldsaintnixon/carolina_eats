export const sendSignUp = user => {
    return $.ajax({
        method: 'post',
        url: '/api/users',
        data: { user }
    })
}

export const sendLogIn = user => {
    return $.ajax({
        method: 'post',
        url: '/api/session',
        data: { user }
    })
}

export const sendLogOut = () => {
    return $.ajax({
        method: 'delete',
        url: '/api/session'
    })
}