import mongoose from 'mongoose';

const ModelSchema = new mongoose.Schema({
    name: String,
    type: String,
});

export default mongoose.model('Model', ModelSchema);
