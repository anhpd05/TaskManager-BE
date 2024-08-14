const mongoose = require('mongoose');

function connect() {
    const uri = process.env.MONGO_URL;

    if (!uri) {
        console.error('MongoDB connection URI is not defined.');
        process.exit(1);
    }

    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        });
}

module.exports = { connect };
