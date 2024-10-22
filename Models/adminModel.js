const db = require('../Config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing the password
const { Schema } = mongoose;

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },  // Unique email
    password: { type: String, required: true },  // Hashed password
}, { timestamps: true });

// Hash the password before saving the admin
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);  // Hash the password with 10 rounds
    }
    next();
});

// Method to compare hashed password
AdminSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const AdminModel = db.model('Admin', AdminSchema);
module.exports = AdminModel;
