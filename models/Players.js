import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const Player = mongoose.model('user', PlayerSchema);

export default Player;