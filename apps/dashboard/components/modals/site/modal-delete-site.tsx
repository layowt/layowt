import { Button } from '~/packages/components/src/ui/button';
import { Dialog, DialogContent } from '~/packages/components/ui/dialog';
import { deleteWebsite } from '@/actions/websites/delete';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default async function ModalDeleteSite({ siteId }: { siteId: string }) {
  const router = useRouter();

  const handleWebsiteDelete = async () => {
    try {
      await deleteWebsite(siteId);
      toast.success('Site deleted successfully');
      // redirect to dashboard
      router.push('/dashboard');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <DialogContent
      showCloseButton={true}
      className="bg-black !border-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none text-white"
    >
      <div className="flex flex-col gap-y-4">
        <h2 className="text-lg font-bold">Delete Site</h2>
        <p className="text-sm text-white flex items-center gap-x-1 font-inter">
          This action is <p className="text-red-500">irreversible.</p> Are you
          sure you want to delete this site?
        </p>
        <div className="flex gap-x-4">
          <Button
            onClick={async () => {
              // delete site
              await handleWebsiteDelete();
            }}
            variant="destructive"
            rounded="sm"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              // close modal
            }}
            variant="tertiary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
