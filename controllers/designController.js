import * as designService from '../services/designService.js';

export const createDesign = async (req, res) => {
    try {
        const { jewelleryType, metal, stone } = req.body;
        const newDesign = await designService.createDesign({ jewelleryType, metal, stone });
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDesigns = async (req, res) => {
    try {
        const designs = await designService.getAllDesigns();
        res.status(200).json(designs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
