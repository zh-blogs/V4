import { logger } from 'nuxt/kit'

const requiredEnvVariables = [
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'NUXT_SESSION_PASSWORD',
  'DATABASE_URL',
] as const

export function checkEnv() {
  const missingVars: string[] = []

  for (const envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
      missingVars.push(envVar)
    }
  }

  if (missingVars.length > 0) {
    logger.error('Error: Missing required environment variables:')
    missingVars.forEach((v) => {
      logger.error(`- ${v}`)
    })
    console.error(
      'Please make sure to set these environment variables before running the app',
    )
    process.exit(1)
  }
  logger.success('Environment variables are valid')
}
