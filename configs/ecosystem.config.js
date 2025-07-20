export const apps = [
  {
    name: 'zhblogs-server',
    port: '8765',
    exec_mode: 'cluster',
    instances: '2',
    script: './apps/server/dist/index.js',
    node_args: '--env-file ./apps/server/.env',
    env: {
      SHUTDOWN_TIMEOUT: 10000,
      SHUTDOWN_CHECK_INTERVAL: 1000,
      PM2_KILL_SIGNAL: 'SIGINT',
    },
    kill_timeout: 15000,
    wait_ready: true,
    listen_timeout: 5000,
    merge_logs: true,
    out_file: "./apps/server/logs/pm2-out.log",
    error_file: "./apps/server/logs/pm2-error.log",
  }
];
