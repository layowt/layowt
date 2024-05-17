import { getDynamicSite } from '@/utils/websites';
import { websites as Website } from '@prisma/client';
import type { Metadata } from 'next';
import Head from 'next/head';

export async function generateMetaData({ 
  params 
}): Promise<Metadata>{
  const { domain } = params;
  const website = await getDynamicSite(domain);

  return {
    title: website?.websiteName
  } 
}

export default function DyanmicHead() {
  return (
    <>
      <Head>
        <meta property='og:title' content="test" />
      </Head>
    </>
  )
}