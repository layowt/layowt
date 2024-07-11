'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/index';
import { useAppDispatch } from '@/utils/index';
import { setBillingPeriod } from '../../store/slices/user-store';

type Tab = {
  title: string;
  value: 'month' | 'year';
  content?: string | React.ReactNode | any;
};

export const ButtonGroup = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  const dispatch = useAppDispatch();

  const [active, setActive] = useState<Tab>(propTabs[0]);

  const handleSetBillingPeriod = (period: 'month' | 'year') => {
    dispatch(setBillingPeriod(period));
  };

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full',
        containerClassName
      )}
    >
      {propTabs.map((tab) => (
        <button
          key={tab.title}
          onClick={() => {
            setActive(tab);
            handleSetBillingPeriod(tab.value);
          }}
          className={cn('rounded-full', tabClassName)}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {active.value === tab.value && (
            <motion.div
              layoutId="clickedbuttonn"
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              className={cn(
                'absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ',
                activeTabClassName
              )}
            />
          )}
          <span className="relative block text-black dark:text-white">
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
};
