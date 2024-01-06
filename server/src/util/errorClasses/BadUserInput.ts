class BadUserInput extends Error {
    constructor(message?: string) {
        super(message)
    }
}

export default BadUserInput