import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { cn } from '~/utils/cn';

const buttonVariants = cva(
  'relative w-full inline-flex items-center font-kanit justify-center whitespace-nowrap rounded-2xl hover:rounded-xl duration-300 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-2 border-electric-violet-300 hover:bg-electric-violet-500 shadow-sm hover:shadow-md',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-electric-violet-500 hover:bg-electric-violet-600 text-white border-2 border-electric-violet-300',
        tertiary:
          'bg-electric-violet-500 text-white hover:bg-white hover:text-black duration-300',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        none: 'hover:bg-accent hover:text-accent-foreground hover:!bg-transparent hover:!text-none'
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-7 rounded-md px-3 py-1',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  special?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, special, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <div className={special ? 'relative w-full' : 'w-full'}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
          {special ? '' : ''}
        </motion.div>
      </div>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
