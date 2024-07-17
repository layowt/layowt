import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface BackProps extends React.HTMLAttributes<HTMLButtonElement> {
  contentElement?: React.ReactNode;
  href?: string;
  prefetch?: boolean;
  replace?: boolean;
}

function DefaultBackContent() {
  return (
    <div className="flex items-center gap-x-1">
      <ChevronLeftIcon />
    </div>
  )
}

/**
 * Method to allow the user to return to the previous page.
 * 
 * @params BackProps - The props for the Back component.
 * @returns JSX.Element
 */
export default function Back({
  contentElement = <DefaultBackContent />,
  href,
  prefetch,
  replace,
  ...props
}: BackProps) {
  const router = useRouter();

  // If there is no href, we will use the router.back() method.
  if (!href) {
    return (
      <button
        onClick={() => router.back()}
        {...props}
      >
        {contentElement}
      </button>
    )
  }

  return (
    <Link href={href} prefetch={prefetch} replace={replace}>
      <span {...props}>
        {contentElement}
      </span>
    </Link>
  )
}