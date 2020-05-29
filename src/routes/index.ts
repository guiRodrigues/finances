import { Router } from 'express';
import TransactionRoutes from './transactions.routes';

const routes = Router();

routes.use('/transactions', TransactionRoutes);

export default routes;
