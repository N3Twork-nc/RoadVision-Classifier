import { useState } from "react";
import { Dropdown, Menu, Select } from "antd";
import { countryList } from "./country";
import { DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { Option } = Select;
const dateFormatList = ["DD/MM/YYYY"];

const defaultCountry = "Select Country";

export default function EditProfile() {
  const [gender, setGender] = useState("Select gender");

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const [selectedCountry, setSelectedCountry] =
    useState<string>("Select Country");

  const handleMenuClick = (e: any) => {
    if (countryList) {
      const country = countryList.find((item) => item?.key === e.key)?.label;
      if (country) {
        setSelectedCountry(country);
      }
    }
  };
  const menu = <Menu onClick={handleMenuClick} items={countryList} />;

  return (
    <div className="flex flex-col items-center w-full h-72 text-center py-5 gap-10">
      <div className="flex flex-rol px-5 justify-between items-center w-[95%] gap-2">
        {/* Name */}
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Name
          </div>
          <div className="flex items-center space-x-4 mt-1 px-2 py-2 bg-white border rounded-md">
            <input
              type="text"
              placeholder="Nguyễn Trà Bảo Ngân"
              className="flex-1 bg-white text-base outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Phone number
          </div>
          <div className="flex items-center space-x-4 mt-1 px-2 py-2 bg-white border rounded-md">
            <input
              type="text"
              placeholder="+84 123456789"
              className="flex-1 bg-white text-base outline-none"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Date of birth
          </div>
          <DatePicker
            className="w-full py-2 mt-1 text-base"
            defaultValue={dayjs("01/01/2015", dateFormatList[0])}
            format={dateFormatList}
          />
        </div>
      </div>

      <div className="flex flex-rol px-5 justify-between items-center w-[95%] gap-2">
        {/* Gender */}
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Gender
          </div>
          <Select
            value={gender}
            onChange={handleGenderChange}
            className={`w-full text-left text-base mt-1 h-10 font-base ${
              gender === "Select gender" ? "text-gray-400" : "text-black"
            }`}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </div>

        {/* Address */}
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Address
          </div>
          <div className="flex items-center space-x-4 mt-1 px-2 py-2 bg-white border rounded-md">
            <input
              type="text"
              placeholder="An Binh, Di An, Binh Duong"
              className="flex-1 bg-white text-base outline-none"
            />
          </div>
        </div>

        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Country
          </div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <button
              className={`w-full bg-white border rounded-md px-3 py-2 mt-1 text-left flex justify-between items-center ${
                selectedCountry === defaultCountry
                  ? "text-gray-400"
                  : "text-black"
              }`}
            >
              {selectedCountry} <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Delete Account Button */}
      <div>
        <button className="w-fit bg-[#3749A6] text-white font-semibold mt-2 p-2 px-5 rounded-full hover:ring-4 hover:ring-blue-300">
          Save Information
        </button>
      </div>
    </div>
  );
}
