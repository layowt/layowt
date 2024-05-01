import { useEffect, useState } from 'react';
import { getWebsite } from '@/utils/websites/website.get';
import { websites } from '@prisma/client';

const useUserWebsites = <T extends websites[]>(userId: string): T | null => {
  const [websites, setWebsites] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const fetchedWebsites = await getWebsite<T>({ userId }, true);
          setWebsites(fetchedWebsites);
        }
      } catch (error) {
        console.error('Error fetching user websites:', error);
      }
    };

    fetchData(); 
  }, [userId]);

  return websites;
};

export default useUserWebsites;
