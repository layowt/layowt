import type { websites as Website } from '@prisma/client';
import type { Metadata } from 'next';

export const generateSiteMetadata = (
  website: Website
): Partial<Metadata> => {
  return {
    title: website?.websiteName || 'Website | Website build with Layowt',
    icons: [
      {
        url: website?.websiteLogo || '/favicon.ico',
        rel: 'icon',
        sizes: '32x32'
      },
      {
        url: website?.websiteLogo || '/favicon.ico',
        rel: 'apple-touch-icon',
        sizes: '32x32'
      }
    ],
    applicationName: website?.websiteName || 'Website | Website build with Layowt',
  }
}