import * as React from 'react';
import { Input } from '@layowt/components/src/ui/input';
import { cn } from '@layowt/utils/src/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@layowt/components/src/ui/tooltip';

interface InputWithLabelProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  wrapperclassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  question?: {
    text: string;
    icon: React.ReactNode;
  }
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, ...props }, ref) => {
    return (
      <div 
        className={cn`
          flex flex-col gap-y-1.5
          ${props.wrapperclassName}
        `}
      >
        <div className="flex gap-x-1 items-center">
          <label 
            className="text-sm text-muted-foreground text-white/80"
            >
            {label}
          </label>
          {props.question && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger
                  className="text-white/50 hover:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  {props.question.icon}
                </TooltipTrigger>
                <TooltipContent>
                  {props.question.text}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
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
