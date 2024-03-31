'use client';
import NavigationItems from '@/components/layout/navigation-items';
import SiteLogo from '@/components/logo';
import { motion } from 'framer-motion';

export default function DashboardSidebar() {
  return (
    <section
      className="
					min-w-40 min-h-screen px-2 flex flex-col gap-y-10 text-white font-poppins border-r border-black-50
				"
    >
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1 }}
      >
        <SiteLogo />
      </motion.div>
      <NavigationItems />
    </section>
  );
}
