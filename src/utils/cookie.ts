import { cookies } from 'next/headers'

const cookieStore = cookies()

export const deleteCookies = async(cookieName: string) => {
	cookieStore.delete(cookieName);
}