const EnquiriesService = require('../Services/enquiriesService');
const IdcodeServices = require('../Services/idcodeService'); // Assuming you have this for generating enquiry_id

// Create Enquiry
exports.createEnquiry = async (req, res, next) => {
    try {
        // Extract variables from req.body
        const { name, phone, email, institution, subject, note, status } = req.body;
        
        // Generate enquiry_id using IdcodeService
        const enquiry_id = await IdcodeServices.generateCode("Enquiry");

        // Create the enquiry object
        const enquiry = await EnquiriesService.createEnquiry({
            enquiry_id,
            name,
            phone,
            email,
            institution,
            subject,
            note,
            status
        });

        res.status(200).json({
            status: true,
            message: "Enquiry created successfully",
            data: enquiry
        });
    } catch (error) {
        next(error);
    }
};

// Get All Enquiries
exports.getAllEnquiries = async (req, res, next) => {
    try {
        const enquiries = await EnquiriesService.getAllEnquiries();
        res.status(200).json({
            status: true,
            message: "Enquiries retrieved successfully",
            data: enquiries
        });
    } catch (error) {
        next(error);
    }
};

// Update Enquiry By ID
exports.updateEnquiryById = async (req, res, next) => {
    try {
        const { enquiry_id } = req.query; // Assuming enquiry_id is passed as query parameter
        const updateData = req.body; // The data to update is in the body

        const updatedEnquiry = await EnquiriesService.updateEnquiryById(enquiry_id, updateData);

        if (!updatedEnquiry) {
            return res.status(404).json({ status: false, message: "Enquiry not found" });
        }

        res.status(200).json({
            status: true,
            message: "Enquiry updated successfully",
            data: updatedEnquiry
        });
    } catch (error) {
        next(error);
    }
};

// Delete Enquiry By ID
exports.deleteEnquiryById = async (req, res, next) => {
    try {
        const { enquiry_id } = req.query; // Assuming enquiry_id is passed as query parameter

        const result = await EnquiriesService.deleteEnquiryById(enquiry_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Enquiry not found" });
        }

        res.status(200).json({
            status: true,
            message: "Enquiry deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
