'use client';
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Socials() {
  const socials = [
    {
      href: 'https://github.com/Logannford/draggle',
      icon: GitHubLogoIcon
    },
    {
      href: 'https://www.instagram.com/draggle.io/',
      icon: InstagramLogoIcon
    },
    {
      href: '/',
      icon: TwitterLogoIcon
    }
  ];

  return (
    <div className="flex gap-x-5 text-white/80">
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          className="size-6 hover:text-electric-violet hover:cursor-pointer duration-300"
        >
          <social.icon className="size-full" />
        </Link>
      ))}
    </div>
  );
}
