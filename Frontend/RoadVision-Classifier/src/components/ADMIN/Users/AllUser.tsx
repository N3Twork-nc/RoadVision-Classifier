import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import manageAlluserService from "../../../services/manageAlluser.service";
import { Button, Form, Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/admin/userState";

interface DataType {
  key: React.Key;
  username: string;
  fullname: string;
  joindate: string;
  contribution: number;
}
interface AllUserProps {
    onViewUserInfo: (user: DataType) => void; // Hàm chuyển đổi view
  }

export default function AllUser({ onViewUserInfo }: AllUserProps)  {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setRecoilProfile] = useRecoilState<any>(userState);

  // Get all user
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await manageAlluserService.getAllUser({});
      const users = response.data?.map((user: any, index: number) => ({
        key: index,
        username: user.username,
        fullname: user.fullname,
        joindate: user.created,
        contribution: user.contribution,
      }));
      setDataSource(users);
      setRecoilProfile(users);
    } catch (error) {
      console.log("Không thể lấy danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Add new user
  const handleAddUser = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const payload = { ...values, permission_id: "3" };
    try {
      await manageAlluserService.addNewUser(payload);

      setIsModalVisible(false);
      console.log("Tài khoản đã được thêm thành công!");

      fetchAllUsers();
    } catch (error) {
      console.log("Thêm tài khoản thất bại!");
    }
  };


  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold p-4">All Users</h1>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg"
          onClick={() => setIsModalVisible(true)}
        >
          Add new user
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-2 rounded-xl border-gray overflow-y-auto min-w-[1000px] text-center bg-white">
          <thead>
            <tr className="border-b rounded-sm text-base text-black">
              <th scope="col" className="px-6 py-5 w-[20%]">
                Username
              </th>
              <th scope="col" className="px-6 py-5 w-[35%]">
                Fullname
              </th>
              <th scope="col" className="px-6 py-5 w-[20%]">
                Join date
              </th>
              <th scope="col" className="px-6 py-5 w-[10%]">
                Contribution
              </th>
              <th scope="col" className="px-6 py-5 w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((user) => (
              <tr
                key={user.key}
                className="cursor-pointer text-base py-3 text-[#0A0A0B] font-normal border-b border-gray-300"
                onClick={() => onViewUserInfo(user)}
              >
                <td className="py-3">{user.username}</td>
                <td className="py-3">{user.fullname}</td>
                <td className="py-3">{user.joindate}</td>
                <td className="py-3">{user.contribution}</td>
                <td className="py-3">
                  <button className="text-red-500">
                    <AiOutlineDelete className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        title="Add New User"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddUser}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: false, message: "Please input email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]} 
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
