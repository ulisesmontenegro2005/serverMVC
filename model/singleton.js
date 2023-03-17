function singleton (user) {
    if (user.timestamp) {
        return user
    } else {
        user.timestamp = Date.now()
    }
    return user
}

export default singleton