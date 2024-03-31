import Link from 'next/link';
import Image from 'next/image';

export default function SiteLogo() {
  return (
    <Link
      href="/dashboard"
      className="py-5 pl-2 flex gap-x-1 items-center hover:cursor-pointer group"
    >
      <Image
        src="/favicon.ico"
        width={20}
        height={20}
        alt="Draggle logo"
        className="rounded"
      />
      <h1 className="font-bold font-poppins group-hover:text-white/60 duration-300">
        Draggle
      </h1>
    </Link>
  );
}
