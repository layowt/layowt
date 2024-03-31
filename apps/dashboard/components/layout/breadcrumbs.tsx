'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { SlashIcon } from '@radix-ui/react-icons';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // get the current path and split it into an array
  const path = pathname.split('/').filter((p) => p !== '');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((name, index) => {
          const isLast = index === path.length - 1;
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${name}`}
                  className={`text-white font-poppins text-xs font-medium hover:!text-white/80 duration-300`}
                >
                  {name.charAt(0).toLocaleUpperCase() + name.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
