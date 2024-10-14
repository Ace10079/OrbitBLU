const EnquiriesModel = require('../Models/enquiries');

exports.createEnquiry = async (enquiryData) => {
    const enquiry = new EnquiriesModel(enquiryData);
    return await enquiry.save();
};

exports.getAllEnquiries = async () => {
    return await EnquiriesModel.find();
};
