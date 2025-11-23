import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";

import { CustomDialog } from "@/components/ui/DialogCustom";
import { UpdateUser, type UserUpdate } from "@/api/authentication/editMyInfor";
import { useAuth } from "@/hooks/useAuth";
import { formatPhoneNumberVN } from "@/utils/formatPhoneNumber";

function DialogEditInfor() {
  const { userCurrent, setUserCurrent } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<UserUpdate>({
    defaultValues: {
      firstName: userCurrent?.firstName ?? "",
      lastName: userCurrent?.lastName ?? "",
      birthday: userCurrent?.birthday ?? "",
      email: userCurrent?.email ?? "",
      phoneNumber: userCurrent?.phoneNumber ?? "",
    },
  });
  const userInfo = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => {
    setUserCurrent(userInfo);
  }, []);

  const handleChangeInfo = async (values: UserUpdate) => {
    console.log("Update info request: ", values);
    try {
      setIsLoading(true);
      const formatPhone = formatPhoneNumberVN(values.phoneNumber);
      const res = await UpdateUser({ ...values, phoneNumber: formatPhone });
      if (res) {
        setIsSuccess(true);
        setOpen(false); // chỉ đóng dialog khi thành công
        console.log("Cập nhật thông tin thành công");
        localStorage.setItem("user", JSON.stringify(res));
      }
      return res;
    } catch (error) {
      console.log("Không thể chỉnh sửa thông tin: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full bg-blue-900 hover:bg-blue-950 text-white">
          Chỉnh sửa thông tin
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
            <DialogDescription>
              Thay đổi thông tin tài khoản của bạn
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChangeInfo)}
              className="space-y-4 pt-2"
            >
              {/* Họ */}
              <FormField
                control={form.control}
                name="firstName"
                rules={{ required: "Vui lòng nhập họ" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nhập họ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tên */}
              <FormField
                control={form.control}
                name="lastName"
                rules={{ required: "Vui lòng nhập tên" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nhập tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số điện thoại */}
              <FormField
                control={form.control}
                name="phoneNumber"
                rules={{
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    // 0xxxxxxxxx hoặc +84xxxxxxxxx
                    value: /^(0|\+84)(1|3|5|7|8|9)\d{8}$/,
                    message:
                      "Số điện thoại không đúng định dạng (0xxxxxxxxx hoặc +84xxxxxxxxx)",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ngày sinh */}
              <FormField
                control={form.control}
                name="birthday"
                rules={{
                  required: "Vui lòng chọn ngày sinh",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        // nếu backend trả về dạng "YYYY-MM-DD" thì dùng được luôn
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"} type="button">
                    Hủy
                  </Button>
                </DialogClose>
                <Button
                  className="bg-blue-900 hover:bg-blue-950"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang lưu..." : "Xác nhận"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {isLoading && <SpinnerButton />}

      {/* cập nhật thông tin thành công */}
      <CustomDialog
        isOpen={isSuccess}
        title="THÀNH CÔNG"
        description="Cập nhật thông tin tài khoản thành công"
        onOpenChange={setIsSuccess}
      />

      {/* cập nhật thông tin không thành công */}
      <CustomDialog
        isOpen={isError}
        title="Lỗi"
        description="Cập nhật thông tin tài khoản không thành công"
        onOpenChange={setIsError}
      />
    </div>
  );
}

export default DialogEditInfor;
