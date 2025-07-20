import app from "@server/app.js";

const REDIS_RUNNING_TASKS_KEY = "task-manager:running-tasks"; // List
const REDIS_PENDING_TASKS_KEY = "task-manager:pending-tasks"; // Set
const REDIS_TASK_LOCK_KEY = "task-manager:task-lock";

let systemUpgradeInProgress = false;

/**
 *
 * @param value sets the system upgrade in progress status.
 * Sets the system upgrade in progress status.
 * This is used to prevent new tasks from being added while an upgrade is in progress.
 * If set to true, new tasks will be added to the pending tasks set.
 * If set to false, new tasks will be added to the running tasks list.
 */
export function setSystemUpgradeInProgress(value: boolean): void {
  systemUpgradeInProgress = value;
}

/**
 *
 * @returns returns the current system upgrade in progress status.
 * This is used to check if an upgrade is in progress before adding new tasks.
 */
export function getSystemUpgradeInProgress(): boolean {
  return systemUpgradeInProgress;
}

/**
 *
 * @param instanceId the ID of the instance that is adding the task.
 * @param taskName the name of the task to be added.
 * Adds a task to the running tasks list or pending tasks set based on the system upgrade status.
 * If the system upgrade is in progress, the task is added to the pending tasks set.
 * Otherwise, it is added to the running tasks list.
 * This allows tasks to be queued during an upgrade and processed later.
 */
export async function addTask(
  instanceId: string,
  taskName: string
): Promise<void> {
  if (systemUpgradeInProgress) {
    const taskKey = taskName;
    await app.redis.sadd(REDIS_PENDING_TASKS_KEY, taskKey);
    app.log.info(
      `System upgrade in progress, task ${taskName} added to pending tasks`
    );
  } else {
    const taskKey = `${instanceId}:${taskName}`;
    await app.redis.lpush(REDIS_RUNNING_TASKS_KEY, taskKey);
    app.log.info(
      `Task ${taskName} added to running tasks for instance ${instanceId}`
    );
  }
}

/**
 *
 * @param tasksKey the key indicating whether the task is in pending or running state.
 * @param instanceId the ID of the instance that is removing the task.
 * @param taskName the name of the task to be removed.
 * Removes a task from the pending tasks set or running tasks list based on the tasksKey.
 * If tasksKey is "pending", the task is removed from the pending tasks set.
 * If tasksKey is "running", the task is removed from the running tasks list.
 * This is used to clean up tasks that are no longer needed or have been completed.
 */
export async function removeTask(
  tasksKey: "pending" | "running",
  instanceId: string,
  taskName: string
): Promise<void> {
  if (tasksKey === "pending") {
    const taskKey = taskName;
    await app.redis.srem(REDIS_PENDING_TASKS_KEY, taskKey);
    app.log.info(`Task ${taskName} removed from pending tasks`);
  } else {
    const taskKey = `${instanceId}:${taskName}`;
    await app.redis.lrem(REDIS_RUNNING_TASKS_KEY, 0, taskKey);
    app.log.info(
      `Task ${taskName} removed from running tasks for instance ${instanceId}`
    );
  }
}

/**
 *
 * @param tasksKey the key indicating whether to get pending or running tasks.
 * @returns a list of task names based on the tasksKey.
 * If tasksKey is "pending", it returns the pending tasks set.
 * If tasksKey is "running", it returns the running tasks list.
 */
export async function getTasks(
  tasksKey: "pending" | "running"
): Promise<string[]> {
  if (tasksKey === "pending") {
    return await app.redis.smembers(REDIS_PENDING_TASKS_KEY);
  } else {
    return await app.redis.lrange(REDIS_RUNNING_TASKS_KEY, 0, -1);
  }
}

/**
 *
 * @param tasksKey the key indicating whether to clear pending or running tasks.
 * Clears all tasks from the specified tasksKey.
 * If tasksKey is "pending", it clears the pending tasks set.
 * If tasksKey is "running", it clears the running tasks list.
 * This is used to reset the task manager state.
 */
export async function clearTasks(
  tasksKey: "pending" | "running"
): Promise<void> {
  if (tasksKey === "pending") {
    await app.redis.del(REDIS_PENDING_TASKS_KEY);
    app.log.info("Cleared all pending tasks");
  } else {
    await app.redis.del(REDIS_RUNNING_TASKS_KEY);
    app.log.info("Cleared all running tasks");
  }
}

/**
 *
 * @param taskName the name of the task to acquire a lock for.
 * @param ttl the time-to-live for the lock in seconds.
 * @returns true if the lock was acquired, false otherwise.
 * Acquires a lock for task processing to ensure that only one instance can process tasks at a time.
 */
export async function acquireTaskLock(
  taskName: string,
  ttl: number = 60 // Default lock TTL is 60 seconds
): Promise<boolean> {
  const lockAcquired = await app.redis.set(
    `${REDIS_TASK_LOCK_KEY}:${taskName}`,
    "locked",
    "EX",
    ttl,
    "NX"
  );

  if (lockAcquired) {
    app.log.info("Task lock acquired");
    return true;
  } else {
    app.log.warn(
      "Failed to acquire task lock, another instance may be processing tasks"
    );
    return false;
  }
}

/**
 *
 * @param taskName the name of the task to release the lock for.
 * Releases the lock for task processing.
 */
export async function releaseTaskLock(taskName: string): Promise<void> {
  await app.redis.del(`${REDIS_TASK_LOCK_KEY}:${taskName}`);
  app.log.info("Task lock released");
}
