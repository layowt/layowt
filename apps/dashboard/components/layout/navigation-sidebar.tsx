'use client';
import NavigationItems from '@/components/layout/navigation-items';
import SiteLogo from '@/components/logo';
import { motion } from 'framer-motion';

export default function DashboardSidebar() {
  return (
    <section
      className="
					min-w-40 min-h-screen flex flex-col gap-y-6 text-white font-poppins border-r border-black-50
				"
    >
      <div className="border-b border-black-50 relative -top-px">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="px-2">
            <SiteLogo />
          </div>
        </motion.div>
      </div>
      <NavigationItems className="px-2 h-full" />
    </section>
  );
}
