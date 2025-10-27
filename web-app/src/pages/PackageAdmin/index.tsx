import React, { useState } from "react";

// Định nghĩa kiểu dữ liệu cho gói thuê
interface EVPackage {
  id: number;
  type: string;
  quantity: number;
  description: string;
  price: number;
}

// Định nghĩa kiểu dữ liệu cho form
interface PackageForm {
  type: string;
  quantity: number | "";
  description: string;
  price: number | "";
}

const AdminPackage: React.FC = () => {
  const [packages, setPackages] = useState<EVPackage[]>([
    { id: 1, type: "Ngày", quantity: 2, description: "Gói thuê ngắn hạn", price: 50000 },
    { id: 2, type: "Tuần", quantity: 3, description: "Gói thuê trung hạn", price: 300000 },
    { id: 3, type: "Tháng", quantity: 4, description: "Gói thuê dài hạn", price: 1200000 },
  ]);

  const [formData, setFormData] = useState<PackageForm>({
    type: "Ngày",
    quantity: "",
    description: "",
    price: "",
  });

  const [filterType, setFilterType] = useState<string>("Tất cả");

  // ✅ fix: khai báo kiểu cho e
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // ✅ fix: khai báo kiểu cho e
  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const { type, quantity, description, price } = formData;

    const q = Number(quantity);
    const p = Number(price);

    if (!q || !p) return alert("Vui lòng nhập đủ thông tin!");
    if (q <= 0 || q > 10) return alert("Số lượng pin phải từ 1 đến 10!");
    if (p <= 0) return alert("Giá tiền phải lớn hơn 0!");

    setPackages((prev) => [
      ...prev,
      { id: Date.now(), type, quantity: q, description, price: p },
    ]);

    setFormData({ type: "Ngày", quantity: "", description: "", price: "" });
  };

  // ✅ fix: khai báo kiểu cho id
  const handleDeletePackage = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa gói thuê này không?")) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    }
  };

  const filteredPackages =
    filterType === "Tất cả"
      ? packages
      : packages.filter((pkg) => pkg.type === filterType);

  return (
    <div
      className="p-6 max-w-5xl mx-auto min-h-screen"
      style={{
        background: "linear-gradient(135deg, #FFF9E6 0%, #E8F8F5 100%)",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600 flex justify-center items-center gap-2">
        ⚡ Quản lý gói thuê pin EV
      </h1>

      {/* Form thêm gói */}
      <form
        onSubmit={handleAddPackage}
        className="rounded-xl shadow-md p-6 mb-6 border border-green-200 bg-white/90"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Thêm gói thuê mới
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-green-700">
              Phân loại
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Ngày</option>
              <option>Tuần</option>
              <option>Tháng</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-green-700">
              Số lượng pin
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="VD: 2"
              min={1}
              max={10}
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1 text-green-700">
              Mô tả chi tiết
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Nhập mô tả gói thuê..."
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-green-700">
              Đơn giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="VD: 150000"
              min={1}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 text-white px-6 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
        >
          ➕ Thêm gói thuê
        </button>
      </form>

      {/* Bộ lọc */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-blue-700">
          Danh sách gói thuê
        </h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option>Tất cả</option>
          <option>Ngày</option>
          <option>Tuần</option>
          <option>Tháng</option>
        </select>
      </div>

      {/* Bảng danh sách */}
      <div
        className="border border-green-300 rounded-xl bg-white shadow-md"
        style={{ minHeight: "350px", overflowY: "auto" }}
      >
        <table
          className="w-full border-collapse text-gray-700"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="border p-2 w-[10%]">Phân loại</th>
              <th className="border p-2 w-[10%]">Số lượng</th>
              <th className="border p-2 w-[50%]">Mô tả</th>
              <th className="border p-2 w-[20%]">Đơn giá (VNĐ)</th>
              <th className="border p-2 w-[10%]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr
                key={pkg.id}
                className="hover:bg-green-50 transition-colors duration-200"
              >
                <td className="border p-2 text-center">{pkg.type}</td>
                <td className="border p-2 text-center">{pkg.quantity}</td>
                <td className="border p-2 truncate" title={pkg.description}>
                  {pkg.description}
                </td>
                <td className="border p-2 text-right text-green-700 font-medium">
                  {pkg.price.toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredPackages.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-10 text-gray-400">
                  Không có gói thuê nào trong danh mục này ⚡
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPackage;
