const AdminModel = require('../Models/adminModel');

// Function to verify admin credentials
exports.verifyCredentials = async (email, password) => {
    try {
        const admin = await AdminModel.findOne({ email });
        
        if (!admin) {
            return null;  // Admin not found
        }

        // Compare the hashed password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return null;  // Password mismatch
        }

        return admin;  // Return the admin if credentials are valid
    } catch (error) {
        throw new Error('Error verifying admin credentials');
    }
};

// Function to create a new admin
exports.createAdmin = async (adminData) => {
    try {
        const admin = new AdminModel(adminData);
        await admin.save();
        return admin;  // Return the created admin
    } catch (error) {
        throw new Error('Error creating admin');
    }
};
