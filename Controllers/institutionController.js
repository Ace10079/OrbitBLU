const InstitutionService = require('../Services/institutionService');
const IdcodeServices = require('../Services/idcodeService');
exports.createInstitution = async (req, res, next) => {
    try {
        const { institution_name, email, spoc_name, spoc_phone, address, district, state, status, credit, password } = req.body;
        const institution_id = await IdcodeServices.generateCode("Institution");
        const institution = await InstitutionService.createInstitution({
            institution_id,
            institution_name,
            email,
            spoc_name,
            spoc_phone,
            address,
            district,
            state,
            status,
            credit,
            password 
        });

        res.status(200).json({
            status: true,
            message: "Institution created successfully",
            data: institution
        });
    } catch (error) {
        next(error);
    }
};
exports.getAllInstitutions = async (req, res, next) => {
    try {
        const institutions = await InstitutionService.getAllInstitutions();
        res.status(200).json({
            status: true,
            message: "Institutions retrieved successfully",
            data: institutions
        });
    } catch (error) {
        next(error);
    }
};
