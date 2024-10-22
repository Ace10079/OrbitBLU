const jwt = require('jsonwebtoken');
const adminService = require('../Services/adminService');

// Controller for creating a new admin
exports.createAdminUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;  // Get email and password from request body
        const adminData = { email, password };

        const admin = await adminService.createAdmin(adminData);
        res.status(200).json({
            status: true,
            message: 'Admin created successfully',
            data: admin
        });
    } catch (error) {
        next(error);
    }
};

// Controller for verifying admin credentials (login)
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const admin = await adminService.verifyCredentials(email, password);

        if (!admin) {
            return res.status(401).json({ status: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token (you can adjust this logic as needed)
        const token = jwt.sign({ email: admin.email }, 'hackwit', { expiresIn: '1h' });

        res.status(200).json({
            status: true,
            message: 'Login successful',
            data: { admin, token }
        });
    } catch (error) {
        next(error);
    }
};
