import type { User } from './User';

export type Subscritpion = {
  userId: string;

  websiteId: string;
  websiteName: string;
  websiteUrl: string;
  websiteLogo: string;

  websitePrimaryColor: string;
  websiteSecondaryColor: string;
  websiteBackgroundColor: string;

  hasBeenPublished: boolean;

  createdAt: Date;
  updatedAt: Date;
  lastUpdatedUid: User['uid'];
}