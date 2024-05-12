import { prisma } from '@/utils/prisma';

//export async function generateStaticParams() {}

export default function Page({ params }: { params: { domain: string } }) {
  console.log('ran');
  //  const domain = decodeURIComponent(params.domain);

  return <div className="text-white">hello from {params.domain}</div>;
}
