import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function HomeLayout() {
  return (
    <div className="flex flex-col">
      <Header onAuthClick={() => {}} />
      {/* day la noi dung cua trang */}
      <div className="mt-14">
        <Outlet />
      </div>
      {/* dday la footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
