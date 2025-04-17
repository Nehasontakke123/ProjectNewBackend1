import DesignModel from '../models/designModel.js';

export const createDesign = async (data) => {
    const design = new DesignModel(data);
    return await design.save();
};

export const getAllDesigns = async () => {
    return await DesignModel.find();
};
