import { useEffect } from "react";
import ButtonGroup from "./component/ButtonGroup";
import MyInfoCard from "./component/MyInfoCard";

// import { useAuth } from "@/hooks/useAuth";

import { useAuth } from "@/hooks/useAuth";

function MyInfoPage() {
  // const [userInfo, setUserInfor] = useState<UserResponse | null>(null);
  const { userCurrent, setUserCurrent } = useAuth();

  const userInfo = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => {
    setUserCurrent(userInfo);
  }, []);
  return (
    <div className=" p-4">
      {userCurrent && <MyInfoCard user={userCurrent} />}
      <ButtonGroup />
    </div>
  );
}

export default MyInfoPage;
