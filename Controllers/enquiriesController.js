const EnquiriesService = require('../Services/enquiriesService');

exports.createEnquiry = async (req, res, next) => {
    try {
        const enquiry = await EnquiriesService.createEnquiry(req.body);
        res.status(200).json({ status: true, message: "Enquiry created", data: enquiry });
    } catch (error) {
        next(error);
    }
};

exports.getAllEnquiries = async (req, res, next) => {
    try {
        const enquiries = await EnquiriesService.getAllEnquiries();
        res.status(200).json({ status: true, message: "Enquiries retrieved", data: enquiries });
    } catch (error) {
        next(error);
    }
};
