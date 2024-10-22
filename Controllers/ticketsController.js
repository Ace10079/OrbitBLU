const TicketsService = require('../Services/ticketsService');
const IdcodeServices = require('../Services/idcodeService'); // Assuming you have this service
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Secret keys
const ENCRYPTION_SECRET = 'HACKWIT123';  // Replace with your own secret key for encryption
const JWT_SECRET = 'hackwit';  // Replace with your JWT_SECRET

// Middleware to verify Bearer token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // No token provided
    }
};

// Create Ticket (POST) - Data will be stored as plain text
exports.createTicket = async (req, res, next) => {
    try {
        // Generate ticket_id using IdcodeService
        const ticket_id = await IdcodeServices.generateCode("Ticket");

        // Extract fields from req.body
        const { name, complaint, priority, note, status, assign_ticket } = req.body;

        // Encrypt fields before saving
        const encryptedName = CryptoJS.AES.encrypt(name, ENCRYPTION_SECRET).toString();
        const encryptedComplaint = CryptoJS.AES.encrypt(complaint, ENCRYPTION_SECRET).toString();
        const encryptedNote = CryptoJS.AES.encrypt(note, ENCRYPTION_SECRET).toString();

        // Create ticket object
        const ticket = await TicketsService.createTicket({
            ticket_id,
            name: encryptedName,
            complaint: encryptedComplaint,
            priority,
            note: encryptedNote,
            status,
            assign_ticket
        });

        res.status(200).json({
            status: true,
            message: "Ticket created successfully",
            data: ticket
        });
    } catch (error) {
        next(error);
    }
};

// Get All Tickets (GET) - Encrypt data when sending the response
exports.getAllTickets = async (req, res, next) => {
    try {
        const tickets = await TicketsService.getAllTickets();

        // Encrypt data before sending it back in the response
        const encryptedTickets = tickets.map(ticket => ({
            ...ticket._doc,
            name: CryptoJS.AES.encrypt(ticket.name, ENCRYPTION_SECRET).toString(),
            complaint: CryptoJS.AES.encrypt(ticket.complaint, ENCRYPTION_SECRET).toString(),
            note: CryptoJS.AES.encrypt(ticket.note, ENCRYPTION_SECRET).toString(),
        }));

        res.status(200).json({
            status: true,
            message: "Tickets retrieved and encrypted successfully",
            data: encryptedTickets
        });
    } catch (error) {
        next(error);
    }
};

// Get All Tickets (GET) - Decrypt data for authenticated users (using Bearer token)
exports.getAllTicketsDecrypted = async (req, res, next) => {
    try {
        const tickets = await TicketsService.getAllTickets();
        
        // Get the user information from the JWT token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Assuming the user is authenticated and the token contains the user's details
        // If you want to use this token for extra verification, you can
        console.log("User ID from Token:", decoded.userId);  // Example: Log userId from token
        
        // Decrypt data using the same key used for encryption
        const decryptedTickets = tickets.map(ticket => ({
            ...ticket._doc,
            name: CryptoJS.AES.decrypt(ticket.name, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8),
            complaint: CryptoJS.AES.decrypt(ticket.complaint, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8),
            note: CryptoJS.AES.decrypt(ticket.note, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8),
        }));

        res.status(200).json({
            status: true,
            message: "Tickets retrieved and decrypted successfully",
            data: decryptedTickets
        });
    } catch (error) {
        console.error("Error during decryption:", error.message);
        next(error);
    }
};