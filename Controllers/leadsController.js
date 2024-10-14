const LeadsService = require('../Services/leadsService');

exports.createLead = async (req, res, next) => {
    try {
        const lead = await LeadsService.createLead(req.body);
        res.status(200).json({ status: true, message: "Lead created", data: lead });
    } catch (error) {
        next(error);
    }
};

exports.getAllLeads = async (req, res, next) => {
    try {
        const leads = await LeadsService.getAllLeads();
        res.status(200).json({ status: true, message: "Leads retrieved", data: leads });
    } catch (error) {
        next(error);
    }
};
