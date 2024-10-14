const TicketsModel = require('../Models/tickets');

exports.createTicket = async (ticketData) => {
    const ticket = new TicketsModel(ticketData);
    return await ticket.save();
};

exports.getAllTickets = async () => {
    return await TicketsModel.find();
};
