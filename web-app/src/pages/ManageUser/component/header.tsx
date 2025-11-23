import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { IoMdPerson } from "react-icons/io";
import ButtonAddUser from "./ButtonAddUser";
import type { UserResponse } from "@/api/authentication/register";

interface HeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onUserAdded: (u: UserResponse) => void;
  onSearch: () => void;
}

function Header({
  searchValue,
  setSearchValue,
  onUserAdded,
  onSearch,
}: HeaderProps) {
  return (
    <div className="max-w-7xl min-w-5xl flex items-center justify-between">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <IoMdPerson />
        <span>Người dùng</span>
      </div>

      {/* Ô tìm kiếm */}
      <div className="flex items-center gap-2 border px-3 py-1 rounded-lg w-xs">
        <Search className="text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm kiếm..."
          className="border-none shadow-none focus-visible:ring-0 p-0"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(); // Enter để tìm
          }}
        />
      </div>

      {/* Nút tạo tài khoản */}
      <ButtonAddUser onUserAdded={onUserAdded} />
    </div>
  );
}

export default Header;
