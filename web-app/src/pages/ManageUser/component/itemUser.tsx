import type { UserResponse } from "@/api/authentication/register";

import ButtonChangePasswordUser from "./ButtonChangePasswordUser";
import ButtonDeleteUser from "./ButtonDeleteUser";
import ButtonEditUserByAdmin from "./ButtonEditUser";
import ButtonChangeRole from "./ButtonChangeRole";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { formatDateTime } from "@/utils/formatDate";

interface UserProps {
  user: UserResponse;
  onDeleted: (userId: string) => void;
  onUpdate: (userUpdate: UserResponse) => void;
  onChangeRole: (updateRole: string, userId: string) => void;
}

function ItemUser({ user, onDeleted, onUpdate, onChangeRole }: UserProps) {
  const { userCurrent, setUserCurrent } = useAuth();
  const userInfo = JSON.parse(localStorage.getItem("user") || "null");
  // Lấy chữ cái đầu cho avatar
  const avatarLetter = user.firstName?.charAt(0).toUpperCase() || "?";
  const role = user.roles?.[0] || "USER";

  const disabled = userCurrent?.id === user.id;
  useEffect(() => {
    setUserCurrent(userInfo);
  }, []);

  return (
    <div className="grid grid-cols-5 items-center  gap-4 px-4 py-3 border-t text-sm">
      {/* Tên */}
      <div className="flex relative items-center gap-3 font-medium  text-gray-900 group cursor-pointer">
        <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-lg font-semibold text-blue-600">
          {avatarLetter}
        </div>
        <span>
          {user.firstName} {user.lastName}
        </span>
        {/* tooltip  */}
        <div className="absolute w-60 md:w-72 flex-col bg-white border border-gray-100 rounded-lg shadow-2xl p-4 space-y-3 top-12 left-0 z-20 hidden group-hover:flex animate-slide-down-scale">
          {/* Tiêu đề Phân cách */}
          <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider border-b pb-1 border-gray-100">
            Thông tin cơ bản
          </div>

          {/* Nội dung đã được cải thiện Typography và Spacing */}
          <div className="space-y-2">
            <div className="text-sm text-gray-700">
              <span className="font-medium text-gray-600 mr-2">Ngày sinh:</span>
              {user.birthday}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium text-gray-600 mr-2">Ngày tạo:</span>
              {formatDateTime(user.createAt)}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium text-gray-600 mr-2">Cập nhật:</span>
              {formatDateTime(user.updateAt)}
            </div>
          </div>
        </div>
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
             text-gray-700 text-sm font-semibold hidden translate-y-2 group-hover:flex animate-drop"
          >
            Đổi mật khẩu
          </div>

          <ButtonChangePasswordUser userId={user.id} disabled={disabled} />
        </div>

        {/* chỉnh sủa thông tin người dùng */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold hidden translate-y-2 group-hover:flex animate-drop"
          >
            Sửa thông tin
          </div>
          <ButtonEditUserByAdmin
            user={user}
            onUpdate={onUpdate}
            disabled={disabled}
          />
        </div>
        {/* đổi quyền */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold hidden translate-y-2 group-hover:flex animate-drop"
          >
            Đổi quyền
          </div>
          <ButtonChangeRole
            userId={user.id}
            role={user.roles[0] as "ADMIN" | "STAFF" | "USER"}
            onChangeRole={onChangeRole}
            disabled={disabled}
          />
        </div>
        {/* xóa người dùng */}
        <div className="relative group">
          <div
            className="absolute bottom-10 right-0.5 w-max px-2 py-1 bg-gray-100 border rounded-md shadow-lg 
             text-gray-700 text-sm font-semibold hidden translate-y-2 group-hover:flex animate-drop"
          >
            Xóa tài khoản
          </div>
          <ButtonDeleteUser
            userId={user.id}
            onDeleted={onDeleted}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemUser;
