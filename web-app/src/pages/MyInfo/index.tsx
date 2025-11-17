import { useEffect } from "react";
import ButtonGroup from "./component/ButtonGroup";
import MyInfoCard from "./component/MyInfoCard";

// import { useAuth } from "@/hooks/useAuth";

import { useAuth } from "@/hooks/useAuth";

function MyInfoPage() {
  // const [userInfo, setUserInfor] = useState<UserResponse | null>(null);
  const { user, refreshUser } = useAuth();
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div className=" p-4">
      {user && <MyInfoCard user={user} />}
      <ButtonGroup />
    </div>
  );
}

export default MyInfoPage;
