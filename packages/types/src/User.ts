export type User = {
  uid: string;
  email: string;
  hasAuthenticatedEmail: boolean;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;

  /** TODO: CHANGE WHEN WE HAVE THE WEBSITE TYPE */
  websites?: string[];

  subscription: string[]
}