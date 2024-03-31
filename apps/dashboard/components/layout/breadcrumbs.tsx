import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/ui/breadcrumb';
import { usePathname, useRouter } from 'next/navigation';
import { SlashIcon } from '@radix-ui/react-icons';

export default function Breadcrumbs({ ...props }) {
  const router = useRouter();
  const pathname = usePathname();

  // get the current path and split it into an array
  const path = pathname.split('/').filter((p) => p !== '');

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList className="!gap-1">
        {path.map((name, index) => {
          const isLast = index === path.length - 1;
          // Construct the href by joining the parts of the path up to the current index
          const href = `/${path.slice(0, index + 1).join('/')}`;
          return (
            <div
              key={`breadcrumb-${index}`}
              className="flex items-center !gap-1"
            >
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(href);
                  }}
                  className={`text-white font-poppins text-[0.65rem] font-medium hover:!text-white/80 duration-300`}
                >
                  {name.charAt(0).toLocaleUpperCase() + name.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator key={`separator-${index}`}>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
