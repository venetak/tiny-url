/**
 * Entry point for the Express server application.
 * Sets up middleware and routes, and starts the server.
 */
import express from 'express';
import path from 'path';

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


// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from frontend/build
const frontendBuildPath = path.resolve(process.cwd(), 'frontend/build');
app.use(express.static(frontendBuildPath));

import router from './routes.js';

// Register main router for API
app.use('/api', router);

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

/**
 * Starts the Express server and listens on the specified port.
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
