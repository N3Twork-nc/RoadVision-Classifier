import { useState } from "react";
import AppLayout from "../../../components/Common/AppLayout";
import defaultAvatar from "../../../assets/img/defaultAvatar.png";
import mask from "../../../assets/img/mask.png";
import Account from "../../../components/Profile/Account";
import EditProfile from "../../../components/Profile/EditProfile";
import History from "../../../components/Profile/History";
import ChangePassword from "../../../components/Profile/ChangePassword";
import { useRecoilValue } from "recoil";
import { accountState } from "../../../atoms/authState";
import userprofileService from "../../../services/userprofile.service";
import { EditProfileDataType } from "../../../defination/types/profile.type";

export default function Profile() {
  const userRecoilStateValue = useRecoilValue(accountState);
  const [activeTab, setActiveTab] = useState(0);
  const [isAvatarMenuVisible, setIsAvatarMenuVisible] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    userRecoilStateValue.avatar || defaultAvatar
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file); // Cập nhật state imageFile
      setAvatarPreview(URL.createObjectURL(file)); // Hiển thị ảnh preview
    }
  };

  const handleUploadAvatar = async () => {
    if (imageFile) {
      try {
        // Chuyển đổi ảnh thành chuỗi base64
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
          const base64String = reader.result as string;

          // Tạo đối tượng formData
          const formData: EditProfileDataType = {
            avatar: base64String, // Gửi chuỗi base64 của ảnh
            username: "", // Thêm dữ liệu nếu cần thiết
            fullname: "",
            phonenumber: "",
            birthday: "",
            gender: "",
            location: "",
            state: "",
          };

          console.log("Uploading avatar...", formData);

          // Gọi API upload avatar
          const response = await userprofileService.uploadAvatar(formData);
          if (response.status.toString() === "Success") {
            // Cập nhật avatar sau khi upload thành công
            userRecoilStateValue.avatar = response.data.avatarUrl;
            alert("Avatar updated successfully!");
          } else {
            alert("Avatar upload failed");
          }
        };
      } catch (error) {
        console.error("Error uploading avatar:", error);
        alert("Something went wrong while updating avatar.");
      }
    } else {
      alert("Please select an image file first!");
    }
  };

  // All Tabs
  const tabs = [
    { label: "Account", component: <Account /> },
    { label: "Edit Profile", component: <EditProfile /> },
    { label: "Change Password", component: <ChangePassword /> },
    { label: "History", component: <History /> },
  ];

  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col gap-5 justify-start items-center overflow-y-auto">
        {/* Header */}
        <div className="flex flex-row w-[95%] h-32 rounded-2xl bg-[#2D82C6] justify-center items-center relative">
          <img
            src={mask}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          />
          <div
            className="absolute bg-white rounded-full top-[40%] w-36 h-36 flex justify-center items-center cursor-pointer"
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
            onClick={() => setIsAvatarMenuVisible(!isAvatarMenuVisible)}
          >
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-[95%] h-[95%] object-cover rounded-full"
            />
          </div>
          {/* Hover change avatar tooltip */}
          {isHoveringAvatar && (
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white py-1 px-2 text-sm rounded-md shadow-lg">
              Change Avatar
            </div>
          )}
        </div>

        {/* Avatar menu options */}
        {isAvatarMenuVisible && (
          <div className="absolute top-[120px] left-[50%] transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-48">
            <div
              className="text-center text-sm cursor-pointer py-2"
              onClick={() => window.open(avatarPreview, "_blank")}
            >
              View Image
            </div>
            <div
              className="text-center text-sm cursor-pointer py-2"
              onClick={() => {
                const avatarInput = document.getElementById("avatar-input") as HTMLInputElement;
                if (avatarInput) {
                  avatarInput.click();
                }
              }}
            >
              Change Avatar
            </div>
          </div>
        )}

        {/* File input for uploading avatar */}
        <input
          type="file"
          id="avatar-input"
          className="hidden"
          accept="image/*"
          onChange={handleAvatarChange}
        />

        {/* User Info */}
        <div className="flex flex-col mt-12">
          <h1 className="text-center text-lg font-semibold">
            {userRecoilStateValue.username}
          </h1>
          <h2 className="text-center text-gray-600 text-sm font-semibold">
            {userRecoilStateValue.email}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-row items-center px-5 justify-between h-12 w-[95%] rounded-lg shadow bg-white">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`text-center font-medium w-[23%] cursor-pointer py-2 ${
                activeTab === index
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Tab component */}
        <div className="w-[95%] bg-white rounded-lg p-5 shadow">
          {tabs[activeTab].component}
        </div>

        {/* Button to upload avatar */}
        <button
          onClick={handleUploadAvatar}
          className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg"
        >
          Upload Avatar
        </button>
      </div>
    </AppLayout>
  );
}
