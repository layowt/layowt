import { Karla } from 'next/font/google';

const karla = Karla({ subsets: ['latin'] });

export default function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col px-20">
        {/** No nav shown on the sign up page */}
        <div
          className={karla.className + ` text-white text-3xl font-bold py-5`}
        >
          secure
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
}
