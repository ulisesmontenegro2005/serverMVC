import mongoose from 'mongoose';
import config from './../../../config.js'

    const connect = async () => {
        let connection = await mongoose.connect(config.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    };

export default {
    connect
}
