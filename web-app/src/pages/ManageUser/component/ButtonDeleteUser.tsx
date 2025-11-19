import { deleteUser } from "@/api/authentication/deleteUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomDialog } from "@/components/ui/DialogCustom";
import { SpinnerButton } from "@/components/ui/SpinnerButton";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";

type ButtonDeletedUserProps = {
  userId: string;
  onDeleted: (userId: string) => void;
  disabled: boolean;
};

function ButtonDeleteUser({
  userId,
  onDeleted,
  disabled,
}: ButtonDeletedUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDeleteUser = async () => {
    console.log("Delete user:", userId);

    try {
      setOpen(false);
      setIsLoading(true);
      const res = await deleteUser(userId);

      if (res) {
        setIsSuccess(true);
        onDeleted(userId);
        console.log("Xóa tài khoản thành công");
      }
      return res;
    } catch (error) {
      console.log("Không thể xóa tài khoản: " + error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
            disabled={disabled}
          >
            <IoMdTrash />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa tài khoản</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              className="bg-red-700 hover:bg-red-950"
              type="button"
              onClick={handleDeleteUser}
              disabled={isLoading}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading && <SpinnerButton />}

      <CustomDialog
        isOpen={isSuccess}
        title="THÀNH CÔNG"
        description="Xóa tài khoản thành công"
        onOpenChange={setIsSuccess}
      />

      <CustomDialog
        isOpen={isError}
        title="Lỗi"
        description="Xóa tài khoản không thành công"
        onOpenChange={setIsError}
      />
    </div>
  );
}

export default ButtonDeleteUser;
