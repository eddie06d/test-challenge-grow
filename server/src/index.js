const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const port = process.env.PORT || 5001;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Swagger Route
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Server
app.listen(port, () => console.log('Server running on port', port));