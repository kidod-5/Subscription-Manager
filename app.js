import express from 'express';
import {PORT} from './config/env.js'; // Importing PORT from the environment configuration
import userRouter from './routes/user.routes.js'; // Importing user routes
import authRouter from './routes/auth.routes.js'; // Importing authentication routes  
import subscriptionRouter from './routes/subscriptions.routes.js'; // Importing subscription routes
import connectToDatabase from './database/mongodb.js'; // Importing the database connection function
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  console.log(`Sub Manager is running on http://localhost:${PORT}`);
  await connectToDatabase(); // Connect to the database when the server starts
  console.log("Connected to MongoDB successfully");
});
