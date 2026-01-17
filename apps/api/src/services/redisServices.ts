import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const client = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const generatedId = () => Math.random().toString(36).substring(2, 9);

export const addToBundle = async (
  bundleId: string,
  code: string,
  ttlsec: number,
) => {
  const snippetId = `snippet:${generatedId()}`;
  const bundleKey = `bundle:${bundleId}`;

  const pipeline = client.pipeline();

  pipeline.set(snippetId, code, "EX", ttlsec);
  pipeline.rpush(bundleKey, snippetId);
  pipeline.expire(bundleKey, ttlsec);

  await pipeline.exec();


  // await client.set(snippetId, code, "EX", ttlsec);
// 
  // await client.rpush(bundleKey, snippetId);
// 
  // await client.expire(bundleKey, ttlsec);
// 
  return snippetId;
};

export const getBundle = async (bundleId: string) => {
  const bundleKey = `bundle:${bundleId}`;

  const snippetIds = await client.lrange(bundleKey, 0, -1);

  if (snippetIds.length === 0) {
    return null;
  }

  const snippets = await client.mget(snippetIds);

  const parsedData = snippets
    .filter((snippet) => snippet !== null)
    .map((snippet) => JSON.parse(snippet as string));
  return parsedData;
};
