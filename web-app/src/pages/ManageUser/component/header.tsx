import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { IoMdPerson } from "react-icons/io";

function Header() {
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
      <Button className="bg-blue-800 text-white flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Tạo tài khoản
      </Button>
    </div>
  );
}

export default Header;
