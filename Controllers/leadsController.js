const LeadsService = require('../Services/leadsService');
const IdcodeServices = require('../Services/idcodeService');
exports.createLead = async (req, res, next) => {
    try {
        const { origin, name, email, phone, city, state, follow_up, note, status } = req.body;
        const lead_id = await IdcodeServices.generateCode("Lead");
        const lead = await LeadsService.createLead({
            lead_id,
            origin,
            name,
            email,
            phone,
            city,
            state,
            follow_up,
            note,
            status
        });

        res.status(200).json({
            status: true,
            message: "Lead created successfully",
            data: lead
        });
    } catch (error) {
        next(error);
    }
};
exports.getAllLeads = async (req, res, next) => {
    try {
        const leads = await LeadsService.getAllLeads();
        res.status(200).json({
            status: true,
            message: "Leads retrieved successfully",
            data: leads
        });
    } catch (error) {
        next(error);
    }
};
