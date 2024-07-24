/**
 * @description The name of the app
 * @constant
 */
export const APP_NAME = 'Layowt';

/**
 * @description The domain of the site (set up this way to allow for local development)
 * @constant
 */
export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://app.layowt.com"
    : "http://localhost:4343";

/** USED FOR METADATA */

/**
 * @description The title of the site
 * @constant
 */
export const APP_TITLE = 'Layowt | Build your next digital product with ease';

/**
 * @description The description of the site
 * @constant
 */
export const APP_DESCRIPTION = 'Layowt is the all-in-one platform for creating your next digital product';
