import { updateRole, type UpdateRole } from "@/api/authentication/updateRole";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpinnerButton } from "@/components/ui/SpinnerButton";
import { useState } from "react";
import { RiUserSettingsFill } from "react-icons/ri";

type ButtonUpdateRoleProps = {
  userId: string;
  // role hiện tại của user (ADMIN | STAFF | USER)
  role: UpdateRole["role"];
  onChangeRole: (updateRole: string, userId: string) => void;
  disabled: boolean;
};

function ButtonChangeRole({
  role,
  userId,
  onChangeRole,
  disabled,
}: ButtonUpdateRoleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [roleUpdate, setRoleUpdate] = useState<UpdateRole["role"]>(role);

  const handleUpdateRoleUser = async () => {
    console.log("Change role for user:", userId, "->", roleUpdate);

    if (!roleUpdate) {
      setIsError(true);
      return;
    }

    try {
      setIsLoading(true);

      const body: UpdateRole = { role: roleUpdate };
      const res = await updateRole(body, userId);
      onChangeRole(body.role, userId);
      if (res) {
        setIsSuccess(true);
        setOpen(false); // chỉ đóng dialog khi thành công
        console.log("Đổi quyền tài khoản thành công");
      }

      return res;
    } catch (error) {
      console.log("Không thể đổi quyền tài khoản: " + error);
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
            className="border-amber-500 text-amber-600 hover:bg-amber-50 w-12 h-10"
            disabled={disabled}
          >
            <RiUserSettingsFill />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi quyền</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn thay đổi quyền tài khoản này? Hành động này
              có thể ảnh hưởng đến quyền truy cập hệ thống.
            </DialogDescription>
          </DialogHeader>

          <Select
            value={roleUpdate}
            onValueChange={(value) =>
              setRoleUpdate(value as UpdateRole["role"])
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn quyền" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Quyền</SelectLabel>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              className="bg-red-700 hover:bg-red-950"
              type="button"
              onClick={handleUpdateRoleUser}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Xác nhận"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading && <SpinnerButton />}

      <CustomDialog
        isOpen={isSuccess}
        title="THÀNH CÔNG"
        description="Thay đổi quyền thành công."
        onOpenChange={setIsSuccess}
      />

      <CustomDialog
        isOpen={isError}
        title="LỖI"
        description="Thay đổi quyền không thành công."
        onOpenChange={setIsError}
      />
    </div>
  );
}

export default ButtonChangeRole;
