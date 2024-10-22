const PackagesService = require('../Services/packagesService');
const IdcodeServices = require('../Services/idcodeService');

// Create Package (POST)
exports.createPackage = async (req, res, next) => {
    try {
        const { package_name, pricing, credit, description, status } = req.body;
        const package_id = await IdcodeServices.generateCode("Package");
        const package = await PackagesService.createPackage({
            package_id,
            package_name,
            pricing,
            credit,
            description,
            status
        });

        res.status(200).json({
            status: true,
            message: "Package created successfully",
            data: package
        });
    } catch (error) {
        next(error);
    }
};
exports.getAllPackages = async (req, res, next) => {
    try {
        const packages = await PackagesService.getAllPackages();
        res.status(200).json({
            status: true,
            message: "Packages retrieved successfully",
            data: packages
        });
    } catch (error) {
        next(error);
    }
};
