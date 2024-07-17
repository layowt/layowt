'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@layowt/utils/src/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const separatorVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      color: {
        default: '',
        white: 'bg-white',
        offWhite: 'bg-black-100',
        red: 'bg-red-500',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  }
);

type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & VariantProps<typeof separatorVariants>;

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = 'horizontal', decorative = true, color, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
        separatorVariants({ color })
      )}
      {...props}
    />
  )
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
