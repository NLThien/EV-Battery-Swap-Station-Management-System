import type { UserResponse } from "@/api/authentication/register";
import Header from "./component/header";
import ItemUser from "./component/itemUser";
import { useEffect, useState } from "react";
import { getUsers } from "@/api/authentication/getAllUser";

function ManageUser() {
  const [users, setUsers] = useState<UserResponse[]>([]);

  // callback để thêm user mới vào state
  const handleUserAdded = (newUser: UserResponse) => {
    setUsers((prev) => [...prev, newUser]); // cập nhật ngay lập tức
  };
  const handleUserDeleted = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };
  const handleUserUpdated = (updatedUser: UserResponse) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };
  const handleUserUpdateRole = (role: string, userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, roles: [role] } : u))
    );
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await getUsers();
        if (res) {
          setUsers(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white border rounded-xl shadow-sm p-6 mt-10">
      {/* Header */}
      <Header onUserAdded={handleUserAdded} />

      {/* Line */}
      <div className="border-t my-6" />

      {/* Bảng tiêu đề */}
      <div className="grid grid-cols-5 font-semibold text-gray-600 text-sm py-2 px-2">
        <div>Tên</div>
        <div>Số điện thoại</div>
        <div>Email</div>
        <div>Quyền</div>
        <div className="">Thao tác</div>
      </div>
      <div className="border-t my-6" />

      {/* Content — bạn sẽ render danh sách user ở đây */}
      <div className="mt-3">
        {users.map((user) => (
          <ItemUser
            key={user.id}
            user={user}
            onDeleted={handleUserDeleted}
            onUpdate={handleUserUpdated}
            onChangeRole={handleUserUpdateRole}
          />
        ))}
      </div>
    </div>
  );
}

export default ManageUser;
