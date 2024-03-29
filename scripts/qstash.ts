import { Client } from '@upstash/qstash';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.QSTASH_TOKEN) throw new Error('QSTASH_TOKEN not found');
const QSTASH_TOKEN = process.env.QSTASH_TOKEN;

const url = 'https://35fb-182-208-87-6.ngrok-free.app/api/test';
const client = new Client({ token: QSTASH_TOKEN });

const main = async () => {
  console.log('hello world');

  // After 10 seconds
  const now = new Date();
  const tenSecondsLater = new Date(now.getTime() + 10000);
  const timestamp = tenSecondsLater.getTime() / 1000;

  const res = await client.publishJSON({
    url: url,
    body: { hello: 'world' },
    notBefore: timestamp,
  });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
