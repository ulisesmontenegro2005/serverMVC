import mongoose from 'mongoose';
import config from './../../config.js'

    const connect = async () => {
        let connection = await mongoose.connect(config.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    };
    
    const disconnect = async () => {
        await mongoose.disconnect();
    };

export default {
    connect,
    disconnect
}
