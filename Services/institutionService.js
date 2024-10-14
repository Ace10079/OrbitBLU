const InstitutionModel = require('../Models/institution');

exports.createInstitution = async (institutionData) => {
    const institution = new InstitutionModel(institutionData);
    return await institution.save();
};

exports.getAllInstitutions = async () => {
    return await InstitutionModel.find();
};
