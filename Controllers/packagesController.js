const PackagesService = require('../Services/packagesService');

exports.createPackage = async (req, res, next) => {
    try {
        const package = await PackagesService.createPackage(req.body);
        res.status(200).json({ status: true, message: "Package created", data: package });
    } catch (error) {
        next(error);
    }
};

exports.getAllPackages = async (req, res, next) => {
    try {
        const packages = await PackagesService.getAllPackages();
        res.status(200).json({ status: true, message: "Packages retrieved", data: packages });
    } catch (error) {
        next(error);
    }
};
