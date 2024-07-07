import React from 'react';
import { Input } from '~/components/ui/input';
import { cn } from '~/utils/src/cn';

interface InputWithLabelProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, ...props }, ref) => {
    return (
      <div 
        className={cn`
          flex flex-col gap-y-1.5
          ${props.wrapperClassName}
        `}
      >
        <label className="text-sm text-muted-foreground text-white/80">
          {label}
        </label>
        <Input
          ref={ref}
          className="
            bg-transparent w-full p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
            focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-10
            hover:border-white/50
          "
          {...props}
        />
      </div>
    );
  }
);

InputWithLabel.displayName = 'InputWithLabel';

export { InputWithLabel };
