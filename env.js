const { mongo } = require("mongoose")

require("dotenv").config()
const env = {
    port : process.env.PORT || 8082,
    mongo_url : process.env.MONGO_URL
}
module.exports = env