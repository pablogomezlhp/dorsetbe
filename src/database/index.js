const mongoose = require('mongoose');

//This URL was taken by MongoDB Cluster.
const URI = "mongodb+srv://pablo:pablo@cluster0.xudnp.mongodb.net/<dbname>?retryWrites=true&w=majority"
const connectDB = async() => {
    try {
        await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('💾 database connected')
    } catch (err) {
        console.log('error', err)
    }
}

module.exports = connectDB;