require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/pharmacies', require('./pharmacies/pharmacies.controller'));
app.use('/pharmacyBranches', require('./pharmacyBranches/pharmacyBranches.controller'));
app.use('/medicines', require('./medicines/medicines.controller'));
app.use('/pharmacyMedicines', require('./pharmacyMedicines/pharmacyMedicines.controller'));
app.use('/patinetDescription', require('./patinetDescription/patinetDescription.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));