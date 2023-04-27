import dotenv from 'dotenv';
dotenv.config()

export default {
    PORT: process.env.PORT || 8080,
    MONGO: process.env.MONGO,
    EMAIL: process.env.EMAIL_ACCOUNT,
    EMAIL_PASS: process.env.EMAIL_PASSWORD
}