import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/src/cn';

// variants of the input
const inputVariants = cva(
  'focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'light:bg-white dark:bg-black-75 border border-black-50',
        secondary: '',
        tertiary: '',
        outline: '',
        transparent: 'bg-transparent placeholder:text-muted-foreground'
      },
      size: {
        default: 'h-10 w-56',
        sm: 'w-32',
        md: 'w-56',
        lg: 'w-64',
        xl: 'w-96',
        wide: 'w-full'
      },
      underline: {
        none: '!border-none',
        default: '!border-b !border-b-black-75 rounded-none'
      },
      padding: {
        none: '!p-0',
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-8 py-4'
      },
      color: {
        'light-black': ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      padding: 'md',
      size: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface InputVariantProps extends VariantProps<typeof inputVariants> {}

export type InputCombinedProps = InputProps & InputVariantProps;

const Input = React.forwardRef<HTMLInputElement, InputCombinedProps>(
  (
    { className, variant, size, type, padding, underline, color, ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          inputVariants({ className, padding, size, variant, underline, color })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
