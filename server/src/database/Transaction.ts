import Database from 'apps/database';
import Context from './Context';
import { Prisma, PrismaClient } from '@prisma/client';

type transactionOptions = {
  isolationLevel?: Prisma.TransactionIsolationLevel | undefined;
  maxWait?: number;
  timeout?: number;
};

export default class Transaction {
  ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  async execute(transaction: (ctx: Context) => Promise<void>, options?: transactionOptions) {
    const client = this.ctx.db.client as PrismaClient;
    client.$transaction(async (tx) => {
      const txContext = new Context(new Database(tx));
      await transaction(txContext);
    }, options);
  }
}
