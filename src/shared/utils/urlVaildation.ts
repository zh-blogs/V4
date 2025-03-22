import psl from 'psl'

export default (url: string): boolean => {
  try {
    const newUrl = new URL(url)
    return psl.isValid(newUrl.hostname)
  } catch {
    return false
  }
}
