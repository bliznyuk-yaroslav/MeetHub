import express from 'express';
import cors from 'cors';
import {PORT} from './constant';
import rootRouter from './routers';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
export const setupServer = () => {
    const app =express();
    app.use(cors());
    app.use(express.json());
    app.use('/', rootRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}