import * as fs from 'fs'
import { execSync } from 'child_process'

const isBuildMode = process.argv.includes('--build')

const getLastCommitHash = () => {
  try {
    const fullHash = execSync('git rev-parse HEAD').toString().trim()
    const remoteUrl = execSync('git config --get remote.origin.url')
      .toString()
      .trim()
    const commitTime = execSync('git log -1 --pretty=format:"%cd" --date=iso')
      .toString()
      .trim()

    let repoUrl = ''
    if (remoteUrl.includes('github.com')) {
      if (remoteUrl.startsWith('git@github.com:')) {
        const repo = remoteUrl
          .replace('git@github.com:', '')
          .replace('.git', '')
        repoUrl = `https://github.com/${repo}`
      } else if (remoteUrl.startsWith('https://github.com/')) {
        repoUrl = remoteUrl.replace('.git', '')
      }
    }

    const commitLink = repoUrl ? `${repoUrl}/commit/${fullHash}` : ''

    return {
      fullHash,
      commitLink,
      commitTime,
    }
  } catch (error) {
    console.error('获取Git信息失败:', error.message)
    return {
      fullHash: 'unknown',
      commitLink: '',
      commitTime: '',
    }
  }
}

const getVersion = () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
    return packageJson.version || '0.0.0'
  } catch (error) {
    console.error('读取package.json失败:', error.message)
    return '0.0.0'
  }
}

const systemInfo = () => {
  const { fullHash, commitLink, commitTime } = getLastCommitHash()
  const version = getVersion()
  const path = './src/assets/system-info.json'

  const systemInfo = {
    version,
    commitTime,
    commitHash: fullHash,
    commitLink,
  }

  if (isBuildMode) {
    systemInfo.buildTime = new Date().toISOString()
  }

  fs.writeFileSync(path, JSON.stringify(systemInfo, null, 2))

  console.log('Success generated system build infomation to:', path)
}

systemInfo()
