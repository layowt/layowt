import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ModalDeleteSite({ siteId }: { siteId: string }) {
  return (
    <Dialog>
      <DialogContent showCloseButton={true}>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-bold">Delete Site</h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this site?
          </p>
          <div className="flex gap-x-4">
            <button
              onClick={() => {
                // delete site
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // close modal
              }}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
