const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connt = await mongoose.connect(process.env.DP_URL)
        console.log(`mongoDB is Connected ${connt.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = { connectDB }