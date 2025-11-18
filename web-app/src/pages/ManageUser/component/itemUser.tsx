import type { UserResponse } from "@/api/authentication/register";
import { Button } from "@/components/ui/button";
import { IoMdTrash } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdOutlinePassword } from "react-icons/md";
interface UserProps {
  user: UserResponse;
}

function ItemUser({ user }: UserProps) {
  // Lấy chữ cái đầu cho avatar
  const avatarLetter = user.firstName?.charAt(0).toUpperCase() || "?";
  const role = user.roles?.[0] || "USER";

  return (
    <div className="grid grid-cols-5 items-center  gap-4 px-4 py-3 border-t text-sm">
      {/* Tên */}
      <div className="flex items-center gap-3 font-medium  text-gray-900">
        <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-lg font-semibold text-blue-600">
          {avatarLetter}
        </div>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>

      {/* Số điện thoại */}
      <div className="text-gray-700">{user.phoneNumber}</div>

      {/* Email */}
      <div className="text-gray-700 truncate">{user.email}</div>

      {/* Role */}
      <div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {role}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-row gap-2">
        {/* đổi mật khẩu */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            Đổi mật khẩu
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-blue-700 text-blue-700 hover:bg-blue-50"
          >
            <MdOutlinePassword />
          </Button>
        </div>

        {/* chỉnh sủa thông tin người dùng */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            Sửa thông tin
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-blue-700 text-blue-700 hover:bg-blue-50"
          >
            <FaUserEdit />
          </Button>
        </div>
        {/* đổi quyền */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            Đổi quyền
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
          >
            <RiUserSettingsFill />
          </Button>
        </div>
        {/* xóa người dùng */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            Xóa tài khoản
          </div>
          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
          >
            <IoMdTrash />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemUser;
