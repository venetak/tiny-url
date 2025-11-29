/**
 * Entry point for the Express server application.
 * Sets up middleware and routes, and starts the server.
 */
import express from 'express';

/**
 * Express application instance
 */
const app = express();
/**
 * Port number for the server
 */
const port = 3000;


/**
 * Main router for handling application routes
 */
import router from './routes.js';


// Middleware to parse JSON requests
app.use(express.json());
// Register main router
app.use('/', router);


/**
 * Starts the Express server and listens on the specified port.
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
