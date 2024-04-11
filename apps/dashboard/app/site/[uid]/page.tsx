import { prisma } from '@/utils/prisma';

export default async function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteUid } = params;

  // TODO: HANDLE BETTER
  if (!websiteUid) throw new Error('Website UID not found');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = await prisma.websites.findFirst({
    where: {
      websiteId: websiteUid
    }
  });

  return (
    <div className="text-white">
      <h6>{website.userId}</h6>
      <h6>{website.websiteId}</h6>
    </div>
  );
}
