import { connectDb } from './db/prisma';
import { setupServer } from './server';

const bootstrap = async () => {
  await connectDb();
  setupServer();
};

bootstrap();