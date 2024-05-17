'use server'
import { getDynamicSite } from '@/utils/websites';
import { websites as Website } from '@prisma/client';
import Head from 'next/head';

export async function generateMetaData({ params }){
  const domain = decodeURIComponent(params.domain);
  const website = await getDynamicSite(domain);
  return {
    metadata: {
      title: website?.websiteName
    }
  }
}

export default function DyanmicHead({ website }: { website: Website }) {
  return (
    <Head>
      <title>{website?.websiteName}</title>
      <meta property='og:title' content={website?.websiteName} />
    </Head>
  )
}