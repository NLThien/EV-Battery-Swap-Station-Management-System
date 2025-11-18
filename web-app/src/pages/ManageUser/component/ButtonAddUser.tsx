import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Register,
  type RegisterRequest,
  type UserResponse,
} from "@/api/authentication/register";
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
import { FaPlus } from "react-icons/fa";
import { formatPhoneNumberVN } from "@/utils/formatPhoneNumber";

// Form dùng thêm confirmPassword ở FE, còn khi gọi API chỉ lấy đúng RegisterRequest
type FormValues = RegisterRequest & {
  confirmPassword: string;
};

function ButtonAddUser({
  onUserAdded,
}: {
  onUserAdded: (u: UserResponse) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleCreateUser = async (values: FormValues) => {
    console.log("Form create user:", values);
    try {
      setIsLoading(true);
      const phoneNumberFormat = formatPhoneNumberVN(values.phoneNumber);

      // Lấy đúng payload cho API Register
      const payload: RegisterRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: values.birthday,
        phoneNumber: phoneNumberFormat,
        email: values.email,
        password: values.password,
      };

      const res = await Register(payload);
      if (res) {
        setIsSuccess(true);
        console.log("Thêm tài khoản thành công");
        setOpen(false);
        form.reset();
        onUserAdded(res);
      }
      return res;
    } catch (error) {
      console.log("Không thể tạo tài khoản: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-800 text-white flex items-center gap-2">
            <FaPlus className="h-4 w-4" />
            Tạo tài khoản
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo tài khoản mới</DialogTitle>
            <DialogDescription>
              Vui lòng nhập thông tin người dùng để tạo tài khoản.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateUser)}
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
                      <Input placeholder="Nhập họ" {...field} />
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
                      <Input placeholder="Nhập tên" {...field} />
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
                    value: /^(0|\+84)(1|3|5|7|8|9)\d{8}$/,
                    message:
                      "Số điện thoại không đúng định dạng (0xxxxxxxxx hoặc +84xxxxxxxxx)",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
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
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mật khẩu */}
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải ít nhất 8 ký tự",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Xác nhận mật khẩu */}
              <FormField
                control={form.control}
                name="confirmPassword"
                rules={{
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (value) =>
                    value === form.getValues("password") ||
                    "Mật khẩu xác nhận không khớp",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"} disabled={isLoading}>
                    Hủy
                  </Button>
                </DialogClose>
                <Button
                  className="bg-blue-900 hover:bg-blue-950"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {isLoading && <SpinnerButton />}

      {/* Thêm tài khoản thành công */}
      <CustomDialog
        isOpen={isSuccess}
        title="THÀNH CÔNG"
        description="Tạo tài khoản thành công"
        onOpenChange={setIsSuccess}
      />

      {/* Thêm tài khoản không thành công */}
      <CustomDialog
        isOpen={isError}
        title="Lỗi"
        description="Không thể tạo tài khoản. Vui lòng thử lại."
        onOpenChange={setIsError}
      />
    </div>
  );
}

export default ButtonAddUser;
