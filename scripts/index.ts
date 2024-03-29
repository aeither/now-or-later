import { users } from '@/drizzle/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not found');
const DATABASE_URL = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(DATABASE_URL, { prepare: false });
const db = drizzle(client);

async function main() {
  try {
    const allUsers = await db.select().from(users);
    console.log('🚀 ~ main ~ allUsers:', allUsers);
    process.exit(0);
  } catch (error) {
    console.error('Error performing migration: ', error);
    process.exit(1);
  }
}

main();
