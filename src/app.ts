import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { checkJwt } from './middleware/auth';
import { publicRoutes } from './routes/public-routes';
import { protectedRoutes } from './routes/protected-routes';
import { config } from './config/config';
import { singleLimiter } from './middleware/rate-limiter';

// Initialize core express application
export const app = express();

// Initialize the helmet middleware for added security
app.use(helmet());

// Trust the first proxy
app.set('trust proxy', config.trustProxy);

// Initialize the CORS middleware
app.use(cors({
  optionsSuccessStatus: 200, origin: config.corsOrigin
}));

// Initialize the JSON body parser
app.use(express.json({ limit: config.jsonBodyLimit }));

// Initialize the rate limiter middleware
app.use(singleLimiter);

// Initialize the public routes before initializing the checkJwt middleware
app.use(publicRoutes);

// Initialize the protected routes after initializing the checkJwt middleware
app.use(checkJwt, protectedRoutes);