const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const client = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${client.connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};