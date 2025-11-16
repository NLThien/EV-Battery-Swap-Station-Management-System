import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [editingPackageId, setEditingPackageId] = useState<number | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

 const fetchPackages = async () => {
    try {
      const res = await axios.get(API_GATEWAY);
      setPackages(res.data);
    } catch (err) {
      toast.error("❌ Lỗi khi lấy dữ liệu gói!");
      console.error(err);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, quantity, description, price } = formData;
    const q = Number(quantity);
    const p = Number(price);
    const cleanedDescription = description.trim()

    if (isNaN(q) || isNaN(p) || cleanedDescription === "") return toast.warn("⚠️ Vui lòng nhập đủ thông tin!");
    if (q <= 0 || q > 10)
      return toast.warn("⚠️ Số lượng pin phải từ 1 đến 10!");
    if (p <= 0) return toast.warn("⚠️ Giá tiền phải lớn hơn 0!");
  

    try {
      if (editingPackageId !== null) {
        const res = await axios.put(`${API_GATEWAY}/${editingPackageId}`, {
          type,
          quantity: q,
          description,
          price: p,
        });
        setPackages((prev) =>
          prev.map((pkg) => (pkg.id === editingPackageId ? res.data : pkg))
        );
        toast.success("💾 Đã cập nhật gói thuê!");
        setEditingPackageId(null);
      } else {
        const res = await axios.post(API_GATEWAY, {
          type,
          quantity: q,
          description,
          price: p,
        });
        setPackages((prev) => [...prev, res.data]);
        toast.success("✅ Thêm gói thuê mới thành công!");
      }
      setFormData({ type: "Ngày", quantity: "", description: "", price: "" });
    } catch (err) {
      toast.error("❌ Lỗi khi lưu gói!");
      console.error(err);
    }
  };

  const handleDeletePackage = async (id: number) => {
  try {
    await axios.delete(`${API_GATEWAY}/${id}`);
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    toast.info("🗑️ Đã xóa gói thuê!");
  } catch (err) {
    toast.error("❌ Lỗi khi xóa gói!");
    console.error(err);
  }
};

  const handleEditPackage = (pkg: EVPackage) => {
    setFormData({
      type: pkg.type,
      quantity: pkg.quantity,
      description: pkg.description,
      price: pkg.price,
    });
    setEditingPackageId(pkg.id);
  };

  const filteredPackages =
    filterType === "Tất cả"
      ? packages
      : packages.filter((pkg) => pkg.type === filterType);

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen" style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-family)" }}>
      <h1 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2" style={{ color: "var(--matching-color)" }}>
        ⚡ Quản lý gói thuê pin EV
      </h1>

      {/* Form thêm/sửa gói */}
      <form onSubmit={handleSubmit} noValidate className="rounded-xl shadow-md p-6 mb-6 border" style={{ backgroundColor: "var(--surface)", boxShadow: "var(--shadow-md)" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--info-color)" }}>
          {editingPackageId ? "Cập nhật gói thuê" : "Thêm gói thuê mới"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" style={{ color: "var(--matching-color)" }}>Phân loại</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none"
              style={{ boxShadow: "0 0 0 2px var(--success-light)" }}
            >
              <option>Ngày</option>
              <option>Tuần</option>
              <option>Tháng</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1" style={{ color: "var(--matching-color)" }}>Số lượng pin</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none"
              placeholder="VD: 2"
              min={1}
              max={10}
              style={{ boxShadow: "0 0 0 2px var(--success-light)" }}
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1" style={{ color: "var(--matching-color)" }}>Mô tả chi tiết</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none"
              placeholder="Nhập mô tả gói thuê..."
              style={{  boxShadow: "0 0 0 2px var(--success-light)" }}
            />
          </div>

          <div >
            <label className="block font-medium mb-1" style={{ color: "var(--matching-color)" }}>Đơn giá (VNĐ)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none "
              placeholder="VD: 150000"
              min={1}
              style={{ boxShadow: "0 0 0 2px var(--success-light) " }}
            />
          </div>
        </div>

        <button type="submit" className="mt-5 text-white px-6 py-2 rounded-lg font-semibold shadow transition hover:brightness-110" style={{ background: "var(--success-gradient)" }}>
          {editingPackageId ? "💾 Cập nhật gói thuê" : "➕ Thêm gói thuê"}
        </button>
      </form>

      {/* Bộ lọc */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold" style={{ color: "var(--info-color)" }}>Danh sách gói thuê</h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-lg p-2 focus:outline-none bg-white"
          style={{ borderColor: "var(--matching-color-light)" }}
        >
          <option>Tất cả</option>
          <option>Ngày</option>
          <option>Tuần</option>
          <option>Tháng</option>
        </select>
      </div>

      {/* Bảng danh sách */}
      <div className="border rounded-xl bg-white shadow-md" style={{ minHeight: "350px", overflowY: "auto", borderColor: "var(--border)" }}>
        <table className="w-full border-collapse text-gray-700" style={{ tableLayout: "fixed" }}>
          <thead style={{ backgroundColor: "var(--success-light)", color: "var(--matching-color-dark)" }}>
            <tr>
              <th className="border p-2 w-[15%]">Phân loại</th>
              <th className="border p-2 w-[10%]">Số lượng</th>
              <th className="border p-2 w-[40%]">Mô tả</th>
              <th className="border p-2 w-[18%]">Đơn giá (VNĐ)</th>
              <th className="border p-2 w-[17%]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
  {filteredPackages.map((pkg) => (
    <tr key={pkg.id} className="hover:bg-green-50 transition-colors duration-200">
      <td className="border p-2 text-center">{pkg.type}</td>
      <td className="border p-2 text-center">{pkg.quantity}</td>
      <td className="border p-2 truncate text-center" title={pkg.description}>{pkg.description}</td>
      <td className="border p-2 text-center font-medium" style={{ color: "var(--matching-color)" }}>
        {pkg.price.toLocaleString()}
      </td>
      <td className="border p-2 text-center font-medium" style={{ color: "var(--matching-color)" }}>
  <div className="flex justify-center items-center gap-2">
    <button
      onClick={() => handleEditPackage(pkg)}
      className="flex-1 px-2 py-1 rounded text-white transition text-sm hover:opacity-80"
      style={{ backgroundColor: "var(--info-color)" }}
    >
      Sửa
    </button>
    <button
      onClick={() => handleDeletePackage(pkg.id)}
      className="flex-1 px-2 py-1 rounded text-white transition text-sm hover:opacity-80"
      style={{ backgroundColor: "var(--matching-color)" }}
    >
      Xóa
    </button>
  </div>
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
      {/* Toast Container */}
<ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
    </div>
  
    
  );
};

export default AdminPackage;