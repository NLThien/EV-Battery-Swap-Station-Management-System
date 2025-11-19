import {
  changePasswordUser,
  type ChangePasswordUserProps,
} from "@/api/authentication/changePasswordUser";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SpinnerButton } from "@/components/ui/SpinnerButton";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { MdOutlinePassword } from "react-icons/md";

type ButtonChangePasswordUserProps = {
  userId: string;
  disabled: boolean;
};

function ButtonChangePasswordUser({
  userId,
  disabled,
}: ButtonChangePasswordUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const form = useForm<ChangePasswordUserProps>({
    defaultValues: {
      password: "",
    },
  });

  const handleChangePassword = async (
    inputChangePassword: ChangePasswordUserProps
  ) => {
    console.log(inputChangePassword);
    console.log(userId);
    console.log(inputChangePassword);
    try {
      setOpen(false);
      setIsLoading(true);
      const res = await changePasswordUser(userId, inputChangePassword);
      if (res) {
        setIsSuccess(true);
        console.log("đổi thành công");
      }
      return res;
    } catch (error) {
      console.log("không thể đổi mật khẩu: " + error);
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
            className=" border-blue-700 text-blue-700 hover:bg-blue-50"
            disabled={disabled}
          >
            <MdOutlinePassword />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogDescription>
              Vui lòng nhập mật khẩu cũ và xác nhận mật khẩu mới
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChangePassword)}
              className="space-y-4 pt-2"
            >
              {/* Mật khẩu mới */}
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Vui lòng nhập mật khẩu mới",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải ít nhất 8 ký tự",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mật khẩu mới"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"}>Hủy</Button>
                </DialogClose>
                <Button className="bg-blue-900 hover:bg-blue-950" type="submit">
                  Xác nhận
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {isLoading && <SpinnerButton />}
      {/* đổi mật khẩu thành công */}
      <CustomDialog
        isOpen={isSuccess}
        title="THÀNH CÔNG"
        description="Đổi mật khẩu thành công"
        onOpenChange={setIsSuccess}
      />
      {/*  đổi mật khẩu không thành công*/}
      <CustomDialog
        isOpen={isError}
        title="Lỗi"
        description="Đổi mật khẩu không thành công"
        onOpenChange={setIsError}
      />
    </div>
  );
}

export default ButtonChangePasswordUser;
