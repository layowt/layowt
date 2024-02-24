/** The ids of addresses */
type UserAddressId = number;

type planType = 'single' | 'monthly' | 'yearly';

type availableCountries = 'UK' | 'FR' | 'ES';

export type User = {
  /** uid of the user */
  uid: string;

  /** email of the user */
  email: string;

  firstName: string;

  lastName: string;

  /** array of user addresses ids
   *  - allowing multiple addresses per user
   *  - preventing too deeply nested data
   *  - just need to search the array for the address id
   *
   * Optional as user may have created an account, but not subscribed
   * */
  userAddress?: UserAddressId[];

  /** mobile number for the user */
  userPhoneNumber?: number;

  /** array of userIds that this person has access to view */
  userAccess?: User['uid'][];

  /** can easily changes the available countries from the type 'availableCountries' */
  userCountry: availableCountries;

  /** subscription object - need to not make this optional */
  subscription?: {
    /** is the subscription active */
    subscriptionActive: boolean;

    /** email used for payment */
    paymentEmail: string;

    /** transaction id from stripe */
    transactionId: string;

    /** plan type */
    planType: planType;

    /** date of purchase - user may not be subscribed */
    dateOfPurchase: string | null;

    /** date of expiry - user may not be subscribed */
    dateOfExpiry: string | null;
  };
};
