// src/components/CustomDialog.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react"; // hoặc heroicons tuỳ bạn chọn

type CustomDialogProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CustomDialog({
  title,
  description,
  children,
  isOpen,
  onOpenChange,
}: CustomDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {/* Nút mở dialog */}

      {/* Overlay mờ nền */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fadeIn z-500" />

        {/* Hộp thoại */}
        <Dialog.Content
          className="fixed top-[50%] left-[50%] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%]
                     rounded-xl bg-white p-6 shadow-xl data-[state=open]:animate-scaleIn z-500"
        >
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Close
              asChild
              className="bg-white rounded-full p-1.5 hover:bg-gray-100 "
            >
              <button className="rounded-full p-1.5 hover:bg-gray-100 ">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-sm text-gray-500 mt-2 mb-4">
              {description}
            </Dialog.Description>
          )}

          {children}

          <div className="mt-5 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
                Hủy
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Đồng ý
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
