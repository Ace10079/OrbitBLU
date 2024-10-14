const LeadsModel = require('../Models/leads');

exports.createLead = async (leadData) => {
    const lead = new LeadsModel(leadData);
    return await lead.save();
};

exports.getAllLeads = async () => {
    return await LeadsModel.find();
};
