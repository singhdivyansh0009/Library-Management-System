import Request from '../models/requestissue.model.js';

export const addRequest = async (req, res) => {
    try {
        const { membershipId, nameOfBookMovie, requestedDate, requestFulfilledDate } = req.body;

        // Validate input
        if (!membershipId || !nameOfBookMovie || !requestedDate) {
            return res.status(400).json({
                success: false,
                message: "Membership Id, Name of Book/Movie, and Requested Date are required.",
            });
        }

        const newRequest = new Request({
            membershipId,
            nameOfBookMovie,
            requestedDate: new Date(requestedDate),
            requestFulfilledDate: requestFulfilledDate ? new Date(requestFulfilledDate) : null,
        });

        await newRequest.save();

        return res.status(201).json({
            success: true,
            message: "Request added successfully",
            request: newRequest,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding request",
            details: error.message,
        });
    }
};

import Request from '../models/Request.js';

export const updateRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { requestFulfilledDate } = req.body;

        // Validate input
        if (!requestFulfilledDate) {
            return res.status(400).json({
                success: false,
                message: "Request Fulfilled Date is required to update the request.",
            });
        }

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        request.requestFulfilledDate = new Date(requestFulfilledDate);
        await request.save();

        return res.status(200).json({
            success: true,
            message: "Request updated successfully",
            request,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating request",
            details: error.message,
        });
    }
};
