function singleton (user) {
    if (user.timestamp) {
        return user
    } else {
        user.timestamp = new Date().toLocaleString()
    }
    return user
}

export default singleton