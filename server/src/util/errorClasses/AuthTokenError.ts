class AuthTokenError extends Error {
    constructor() {
        super()
        this.message = `JWT error: ${this.message}`
    }
}

export default AuthTokenError