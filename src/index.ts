import { PrismaClient } from '@prisma/client';
import { appRouter } from './trpc';
import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen(3001, () => 'server startet');
export type AppRouter = typeof appRouter;
