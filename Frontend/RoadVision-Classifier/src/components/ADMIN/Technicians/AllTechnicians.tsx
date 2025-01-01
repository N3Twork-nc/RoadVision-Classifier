import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Form, Input, Modal, Table } from "antd";
import { useRecoilState } from "recoil";
import { technicianState } from "../../../atoms/admin/accountState";
import manageAlltechnicianService from "../../../services/manageAlltechnician.service";
import manageAlluserService from "../../../services/manageAlluser.service";
import { MdEngineering } from "react-icons/md";
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

export default function AllTechnicians({
  onViewTechnicianInfo,
}: AllTechniciansProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setRecoilProfile] = useRecoilState<any>(technicianState);
  const [form] = Form.useForm();

  const fetchAllTechnicians = async () => {
    setLoading(true);
    try {
      const response = await manageAlltechnicianService.getAllTechnician({});
      const technician = response.data?.map(
        (technician: any, index: number) => ({
          key: index,
          user_id: technician.user_id,
          username: technician.username,
          fullname: technician.fullname,
          joindate: technician.created,
        })
      );
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

  // ADD NEW TECHNICIAN
  const handleAddTechnicians = async (values: {
    user_id: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
  }) => {
    const payload = { ...values, permission_id: "2" };
    try {
      const response = await manageAlltechnicianService.addNewTechnician(
        payload
      );
      if (response.status.toString() === "Success") {
        alert("Add technician successfully!");
        fetchAllTechnicians();
        form.resetFields();
        setIsModalVisible(false);
      } else {
        alert("Add technicians failed!");
      }
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

  const columns = [
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      align: "center" as "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center" as "center",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      align: "center" as "center",
    },
    {
      title: "Join Date",
      dataIndex: "joindate",
      key: "joindate",
      align: "center" as "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center" as "center",
      render: (_: any, record: DataType) => (
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTechnician(record.username);
            }}
            className="text-red-500"
          >
            <AiOutlineDelete className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-start items-center overflow-y-auto">
      <div className="w-full p-5 bg-white rounded-lg shadow-md">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-2">
            <MdEngineering color="#3B82F6"  size={30} />
            <h1 className="text-2xl text-blue-500 font-bold">All Technicians</h1>
          </div>
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
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            rowClassName="cursor-pointer"
            onRow={(record) => ({
              onClick: () => onViewTechnicianInfo(record),
            })}
            pagination={{ pageSize: 10 }}
          />
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
            {/* <Form.Item
            name="fullname"
            label="Fullname"
            rules={[{ required: true, message: "Please input fullname!" }]}
          >
            <Input />
          </Form.Item> */}
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
    </div>
  );
}
