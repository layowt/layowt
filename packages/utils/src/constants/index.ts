// the name of the site
export const APP_NAME = 'Layowt';

// Easy way to get the domain for the app depending on the environment
export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://app.layowt.com"
    : "http://localhost:4343";

/** USED FOR METADATA */

// the title of the site
export const APP_TITLE = 'Layowt | Build your next digital product with ease';

// the description of the site
export const APP_DESCRIPTION = 'Layowt is the all-in-one platform for creating your next digital product';
