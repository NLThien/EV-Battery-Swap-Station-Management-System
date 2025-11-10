import React, { useState, useEffect } from "react";
import axios from "axios";

interface EVPackage {
  id: number;
  type: string;
  quantity: number;
  description: string;
  price: number;
}

interface PackageForm {
  type: string;
  quantity: number | "";
  description: string;
  price: number | "";
}

const API_GATEWAY = "http://localhost:8081/api/packages";

const AdminPackage: React.FC = () => {
  const [packages, setPackages] = useState<EVPackage[]>([]);
  const [formData, setFormData] = useState<PackageForm>({
    type: "Ngày",
    quantity: "",
    description: "",
    price: "",
  });
  const [filterType, setFilterType] = useState<string>("Tất cả");

  // ✅ Lấy danh sách gói từ API Gateway
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
  try {
    const res = await axios.get(API_GATEWAY);
    console.log("Dữ liệu từ API Gateway:", res.data);
    setPackages(res.data);
  } catch (err) {
    console.error("❌ Lỗi khi lấy dữ liệu gói:", err);
  }
};

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

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, quantity, description, price } = formData;

    const q = Number(quantity);
    const p = Number(price);

    if (!q || !p) return alert("Vui lòng nhập đủ thông tin!");
    if (q <= 0 || q > 10) return alert("Số lượng pin phải từ 1 đến 10!");
    if (p <= 0) return alert("Giá tiền phải lớn hơn 0!");

    try {
      const res = await axios.post(API_GATEWAY, {
        type,
        quantity: q,
        description,
        price: p,
      });
      setPackages((prev) => [...prev, res.data]);
      setFormData({ type: "Ngày", quantity: "", description: "", price: "" });
    } catch (err) {
      console.error("❌ Lỗi khi thêm gói:", err);
    }
  };

  const handleDeletePackage = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa gói thuê này không?")) return;

    try {
      await axios.delete(`${API_GATEWAY}/${id}`);
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    } catch (err) {
      console.error("❌ Lỗi khi xóa gói:", err);
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
                    className="!bg-green-500 !text-white px-3 py-1 rounded-lg shadow-sm hover:!bg-green-600 active:!bg-green-700 transition"
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
