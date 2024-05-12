import { prisma } from '@/utils/prisma';

//export async function generateStaticParams() {}

export default function Page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  return <div className="text-white">hello from {domain}</div>;
}
