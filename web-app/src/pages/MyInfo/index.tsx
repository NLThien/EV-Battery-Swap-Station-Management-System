import { useEffect, useState } from "react";
import ButtonGroup from "./component/ButtonGroup";
import MyInfoCard from "./component/MyInfoCard";
import type { UserResponse } from "@/api/authentication/register";
import { MyInfo } from "@/api/authentication/myInfo";

function MyInfoPage() {
  const [userInfo, setUserInfor] = useState<UserResponse | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await MyInfo();
        if (user) {
          setUserInfor(user);
        }
      } catch (error) {
        console.log("lỗi: " + error);
        throw error;
      }
    };
    getUser();
  }, []);

  return (
    <div className="p-4">
      {userInfo && <MyInfoCard user={userInfo} />}
      <ButtonGroup />
    </div>
  );
}

export default MyInfoPage;
