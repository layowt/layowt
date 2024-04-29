import { getWebsite } from '@/utils/websites/website.get';

export default async function Page({ params }: { params: { uid: string } }) {
  const { uid: websiteId } = params;

  const website = await getWebsite({ websiteId: websiteId });

  return <div>{website.websiteName}</div>;
}
