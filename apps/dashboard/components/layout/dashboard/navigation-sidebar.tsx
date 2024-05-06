'use client';
import NavigationItems from '@/components/layout/dashboard/navigation-items';
import SiteLogo from '@/components/logo';
import { motion } from 'framer-motion';

export default function DashboardSidebar() {
  return (
    <section
      className="
					min-w-48 min-h-screen flex flex-col text-white font-poppins bg-[#05050A]
				"
    >
      <div className="border-b border-black-50 relative -top-px">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="px-4">
            <SiteLogo className="py-4" />
          </div>
        </motion.div>
      </div>
      <NavigationItems className="px-2 h-full border-r border-black-50 pt-6" />
    </section>
  );
}
