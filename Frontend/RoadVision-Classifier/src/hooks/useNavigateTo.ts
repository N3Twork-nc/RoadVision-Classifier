// useNavigateTo.ts use for define page navigate path
import { useNavigate, NavigateOptions } from "react-router-dom";
import { PageEnum } from "../defination/enums/page.enum";

const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateTo = (path: PageEnum, options: NavigateOptions = {}) => {
    navigate(path, options);
  };

  const navigateToSignUp = () => {
    navigateTo(PageEnum.SIGN_UP, { replace: true });
  };
  const navigateToLogin = () => {
    navigateTo(PageEnum.LOGIN, { replace: true });
  };
  const navigateForgotPassword = () => {
    navigateTo(PageEnum.FORGOT_PASSWORD, { replace: true });
  };
  const navigateHome = () => {
    navigateTo(PageEnum.HOME, { replace: true });
  };

  const navigateProfile = () => {
    navigateTo(PageEnum.PROFILE, { replace: true });
  };
  const navigateVerify = () => {
    navigateTo(PageEnum.VERIFY, { replace: true });
  };

  return {
    navigateTo,
    navigateToSignUp,
    navigateToLogin,
    navigateForgotPassword,
    navigateHome,
    navigateProfile,
    navigateVerify
  };
};

export default useNavigateTo;
