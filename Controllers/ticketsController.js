const TicketsService = require('../Services/ticketsService');

exports.createTicket = async (req, res, next) => {
    try {
        const ticket = await TicketsService.createTicket(req.body);
        res.status(200).json({ status: true, message: "Ticket created", data: ticket });
    } catch (error) {
        next(error);
    }
};

exports.getAllTickets = async (req, res, next) => {
    try {
        const tickets = await TicketsService.getAllTickets();
        res.status(200).json({ status: true, message: "Tickets retrieved", data: tickets });
    } catch (error) {
        next(error);
    }
};
