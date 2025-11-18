import type { UserResponse } from "@/api/authentication/register";
import Header from "./component/header";
import ItemUser from "./component/itemUser";

const user: UserResponse = {
  id: "fe6628f7-7a61-44fd-b77d-42a03e58fc33",
  firstName: "Nguyen",
  lastName: "Son Hoang",
  birthday: "2004-07-03",

  email: "sonhoangdz72@gmail.com",
  phoneNumber: "0977744603",

  roles: ["ADMIN"],

  createdAt: "2025-01-01T10:00:00Z",
  updatedAt: "2025-01-05T15:30:00Z",
};

function ManageUser() {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white border rounded-xl shadow-sm p-6 mt-10">
      {/* Header */}
      <Header />

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
        <ItemUser user={user} />
        <ItemUser user={user} />
        <ItemUser user={user} />
        <ItemUser user={user} />
      </div>
    </div>
  );
}

export default ManageUser;
