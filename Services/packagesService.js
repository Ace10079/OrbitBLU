const PackagesModel = require('../Models/packages');

exports.createPackage = async (packageData) => {
    const package = new PackagesModel(packageData);
    return await package.save();
};

exports.getAllPackages = async () => {
    return await PackagesModel.find();
};
