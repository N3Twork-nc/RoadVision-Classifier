import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/authState";
import { getStoredUserInfo } from "../utils/local-storage.util";

const useInitializeUser = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  useEffect(() => {
    const storedUserInfo = getStoredUserInfo(); //get data from local storage
    if (storedUserInfo && !userInfo.id) {
      setUserInfo(storedUserInfo);
    }
  }, [setUserInfo, userInfo]);
};

export default useInitializeUser;
