import app from "@server/app";

const redis = app.redis;

/**
 *
 * @param lockKey the unique identifier for the lock
 * @param ttl the time-to-live for the lock in milliseconds, default is 10000ms
 * @param uniqueValue a unique value to ensure the lock is not released by another process, default is "unique_lock_value"
 * @returns a boolean indicating whether the lock was acquired successfully
 */
export async function acquire(
  lockKey: string,
  uniqueValue: string = "unique_lock_value",
  ttl: number = 10000
): Promise<boolean> {
  const key = `lock:${lockKey}`;
  const existingValue = await redis.get(key);
  if (existingValue) {
    return false;
  }
  const result = await redis.set(
    `lock:${lockKey}`,
    uniqueValue,
    "PX",
    ttl,
    "NX"
  );
  return result === "OK";
}

/**
 *
 * @param lockKey the unique identifier for the lock
 * @param uniqueValue a unique value to ensure the lock is released by the same process that acquired it, default is "unique_lock_value"
 */
export async function release(
  lockKey: string,
  uniqueValue: string = "unique_lock_value"
): Promise<void> {
  const unlockScript = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  await redis.eval(unlockScript, 1, `lock:${lockKey}`, uniqueValue);
}
