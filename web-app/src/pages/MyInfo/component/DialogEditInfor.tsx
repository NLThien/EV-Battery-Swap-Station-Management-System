// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SpinnerButton } from "@/components/ui/SpinerButton";
// import { useState } from "react";
// import {
//   changePasswordMyInfo,
//   type ChangePasswordProps,
// } from "@/api/authentication/changePasswordMyInfo";
// import { CustomDialog } from "@/components/ui/DialogCustom";
// import type { UserUpdate } from "@/api/authentication/editMyInfor";
// import type { UserResponse } from "@/api/authentication/register";

// function DialogEditInfor({
//   firstName,
//   lastName,
//   birthday,
//   email,
//   phoneNumber,
// }: UserResponse) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const form = useForm<UserUpdate>({
//     defaultValues: {
//       firstName: firstName,
//       lastName: lastName,
//       birthday: birthday,
//       email: email,
//       phoneNumber: phoneNumber,
//     },
//   });

//   const handleChangePassword = async (
//     inputChangePassword: ChangePasswordProps
//   ) => {
//     console.log(inputChangePassword);
//     try {
//       setOpen(false);
//       setIsLoading(true);
//       const res = await changePasswordMyInfo(inputChangePassword);
//       if (res) {
//         setIsSuccess(true);
//         console.log("đổi thành công");
//       }
//       return res;
//     } catch (error) {
//       console.log("không thể đổi mật khẩu: " + error);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger className="w-full bg-blue-900 hover:bg-blue-950 text-white">
//           Chỉnh sửa thông tin
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Đổi mật khẩu</DialogTitle>
//             <DialogDescription>
//               Vui lòng nhập mật khẩu cũ và xác nhận mật khẩu mới
//             </DialogDescription>
//           </DialogHeader>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleChangePassword)}
//               className="space-y-4 pt-2"
//             >
//               <FormField
//                 control={form.control}
//                 name="currentPassword"
//                 rules={{ required: "Vui lòng nhập mật khẩu hiện tại" }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Mật khẩu hiện tại</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Vui lòng nhập mật khẩu hiện tại"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Mật khẩu mới */}
//               <FormField
//                 control={form.control}
//                 name="newPassword"
//                 rules={{
//                   required: "Vui lòng nhập mật khẩu mới",
//                   minLength: {
//                     value: 8,
//                     message: "Mật khẩu phải ít nhất 8 ký tự",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Mật khẩu mới</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Mật khẩu mới"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Xác nhận mật khẩu mới */}
//               <FormField
//                 control={form.control}
//                 name="confirmNewPassword"
//                 rules={{
//                   required: "Vui lòng xác nhận mật khẩu mới",
//                   validate: (value) =>
//                     value === form.getValues("newPassword") ||
//                     "Mật khẩu xác nhận không khớp",
//                 }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Xác nhận mật khẩu mới</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Xác nhận nhập mật khẩu mới"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button variant={"outline"}>Hủy</Button>
//                 </DialogClose>
//                 <Button className="bg-blue-900 hover:bg-blue-950" type="submit">
//                   Xác nhận
//                 </Button>
//               </DialogFooter>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//       {isLoading && <SpinnerButton />}
//       {/* đổi mật khẩu thành công */}
//       <CustomDialog
//         isOpen={isSuccess}
//         title="THÀNH CÔNG"
//         description="Đổi mật khẩu thành công"
//         onOpenChange={setIsSuccess}
//       />
//       {/*  đổi mật khẩu không thành công*/}
//       <CustomDialog
//         isOpen={isError}
//         title="Lỗi"
//         description="Đổi mật khẩu không thành công"
//         onOpenChange={setIsError}
//       />
//     </div>
//   );
// }

// export default DialogEditInfor;
