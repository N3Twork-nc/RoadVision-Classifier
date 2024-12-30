import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Form, Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import { technicianState } from "../../../atoms/admin/accountState";
import manageAlltechnicianService from "../../../services/manageAlltechnician.service";
import manageAlluserService from "../../../services/manageAlluser.service";


interface DataType {
  key: React.Key;
  avatar: string;
  username: string;
  fullname: string;
  joindate: string;
}

interface AllTechniciansProps {
  onViewTechnicianInfo: (user: DataType) => void;
}

export default function AllTechnicians({ onViewTechnicianInfo }: AllTechniciansProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setRecoilProfile] = useRecoilState<any>(technicianState);
  const [form] = Form.useForm();

  const fetchAllTechnicians = async () => {
    setLoading(true);
    try {
      const response = await manageAlltechnicianService.getAllTechnician({});
      const technician = response.data?.map((technician: any, index: number) => ({
        key: index,
        username: technician.username,
        fullname: technician.fullname,
        joindate: technician.created,
      }));
      setDataSource(technician);
      setRecoilProfile(technician);
    } catch (error) {
      console.log("Không thể lấy danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTechnicians();
  }, []);

  // ADD NEW USER
  const handleAddTechnicians = async (values: {
    username: string;
    fullname: string;
    email: string;
    password: string;
  }) => {
    const payload = { ...values, permission_id: "2" };
    try {
      await manageAlltechnicianService.addNewTechnician(payload);
      alert("Add technician successfully!");
      fetchAllTechnicians();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.log("Add technicians failed!");
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

      // DELETE TECHNICIAN
  const handleDeleteTechnician = async (username: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this technicians?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await manageAlluserService.deleteUser(username);
          alert("Delete user successfully!");
          fetchAllTechnicians();
        } catch (error) {
          console.log("Xóa tài khoản thất bại!");
        }
      },
      onCancel: () => {
        console.log("User deletion cancelled");
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold p-4">All Technicians</h1>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg"
          onClick={() => setIsModalVisible(true)}
        >
          Add new technicians
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
                Status
              </th>
              <th scope="col" className="px-6 py-5 w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((technician) => (
              <tr
                key={technician.key}
                className="cursor-pointer text-base py-3 text-[#0A0A0B] font-normal border-b border-gray-300"
                onClick={() => onViewTechnicianInfo(technician)}
              >
                <td className="py-3">{technician.username}</td>
                <td className="py-3">{technician.fullname}</td>
                <td className="py-3">{technician.joindate}</td>
                <td className="py-3">hehe</td>
                <td className="py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDeleteTechnician(technician.username);
                    }}
                    className="text-red-500"
                  >
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
        onCancel={handleCancelModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTechnicians}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Fullname"
            rules={[{ required: true, message: "Please input fullname!" }]}
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
            <Button onClick={handleCancelModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
