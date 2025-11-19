import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { IoMdPerson } from "react-icons/io";

import type { UserResponse } from "@/api/authentication/register";
import ButtonAddUser from "./ButtonAddUser";

function Header({ onUserAdded }: { onUserAdded: (u: UserResponse) => void }) {
  return (
    <div className="max-w-7xl flex items-center justify-between">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <IoMdPerson className="" />
        <span>Người dùng</span>
      </div>

      {/* Ô tìm kiếm */}
      <div className="flex items-center gap-2 border px-3 py-1 rounded-lg w-xs">
        <Search className="text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm kiếm..."
          className="border-none shadow-none focus-visible:ring-0 p-0"
        />
      </div>

      {/* Nút tạo tài khoản */}
      <ButtonAddUser onUserAdded={onUserAdded} />
    </div>
  );
}

export default Header;
