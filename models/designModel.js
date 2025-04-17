import { Schema, model } from 'mongoose';

const designSchema = new Schema({
    jewelleryType: { type: String, required: true },
    metal: { type: String, required: true },
    stone: { type: String }
});

const DesignModel = model('Design', designSchema);

export default DesignModel;
