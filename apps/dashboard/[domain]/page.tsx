import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {}

export default function Page({ params }: { params: { domain: string } }) {
  console.log('ran');
  //  const domain = decodeURIComponent(params.domain);

  return <div className="text-black">hello</div>;
}
