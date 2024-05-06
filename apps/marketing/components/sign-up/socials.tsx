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
      href: 'https://github.com/Logannford/layowt',
      icon: GitHubLogoIcon,
      ariaLabel: 'GitHub'
    },
    {
      href: 'https://www.instagram.com/layowt.app/',
      icon: InstagramLogoIcon,
      ariaLabel: 'Instagram'
    },
    {
      href: '/',
      icon: TwitterLogoIcon,
      ariaLabel: 'Twitter'
    }
  ];

  return (
    <div className="flex gap-x-5 text-white/80">
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          aria-label={social.ariaLabel}
          className="size-6 hover:text-electric-violet hover:cursor-pointer duration-300"
        >
          <social.icon className="size-full" />
        </Link>
      ))}
    </div>
  );
}
