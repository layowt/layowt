import { getWebsite } from '@/utils/websites/website.get';
import PageClient from './page-client';

export default async function Page({ params }: { params: { uid: string } }) {
  const { uid: websiteId } = params;

  const website = await getWebsite({ websiteId: websiteId });

  return <PageClient website={website} />;
}
