import { getEnv } from ".."

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'https://app.layowt.com'
  return getEnv() === 'development' ? 'http://localhost:4343' :  publicRootDomain
}