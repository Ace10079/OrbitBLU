const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

require('dotenv').config(); // Load environment variables

// Importing routers
const InstitutionRouter = require('./Routers/institutionRouter');
const LeadsRouter = require('./Routers/leadsRouter');
const EnquiriesRouter = require('./Routers/enquiriesRouter');
const TicketsRouter = require('./Routers/ticketsRouter');
const PackagesRouter = require('./Routers/packagesRouter');



// Middleware to parse JSON
app.use(express.json());



// Define routes
app.use('/institution', InstitutionRouter);
app.use('/leads', LeadsRouter);
app.use('/enquiries', EnquiriesRouter);
app.use('/tickets', TicketsRouter);
app.use('/packages', PackagesRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
