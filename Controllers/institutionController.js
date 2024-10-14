const InstitutionService = require('../Services/institutionService');

exports.createInstitution = async (req, res, next) => {
    try {
        const institution = await InstitutionService.createInstitution(req.body);
        res.status(200).json({ status: true, message: "Institution created", data: institution });
    } catch (error) {
        next(error);
    }
};

exports.getAllInstitutions = async (req, res, next) => {
    try {
        const institutions = await InstitutionService.getAllInstitutions();
        res.status(200).json({ status: true, message: "Institutions retrieved", data: institutions });
    } catch (error) {
        next(error);
    }
};
