export default function Account() {
  return (
    <div className="flex flex-col items-center w-full h-80 text-center py-5 gap-10">
      <div className="flex flex-rol px-5 justify-between items-center w-[95%] gap-2">
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Name
          </div>
          <div className="text-left text-black font-medium text-base">
            Nguyễn Trà Bảo Ngân
          </div>
        </div>
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Phone number
          </div>
          <div className="text-left text-black font-medium text-base">
            +84 123456789
          </div>
        </div>
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Email
          </div>
          <div className="text-left text-black font-medium text-base">
            nguyentrabaongan@gmail.com
          </div>
        </div>
      </div>

      <div className="flex flex-rol px-5 justify-between items-center w-[95%] gap-2">
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Date of birth
          </div>
          <div className="text-left text-black font-medium text-base">
            06/07/2003
          </div>
        </div>
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Gender
          </div>
          <div className="text-left text-black font-medium text-base">
            Female
          </div>
        </div>
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Address
          </div>
          <div className="text-left text-black font-medium text-base">
            An Binh, Di An, Binh Duong
          </div>
        </div>
      </div>

      <div className="flex flex-rol px-5 justify-between items-center w-[95%] gap-2">
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Join date
          </div>
          <div className="text-left text-black font-medium text-base">
            20/10/2023
          </div>
        </div>
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Address
          </div>
          <div className="text-left text-black font-medium text-base">
            An Binh, Di An, Binh Duong
          </div>
        </div>
        <div className="w-[30%]">
          <div className="text-left font-normal font-sm text-gray-700 text-sm">
            Country
          </div>
          <div className="text-left text-black font-medium text-base">
            Vietnam
          </div>
        </div>
      </div>
      <div>
        <button className="w-fit bg-[#3749A6] text-white font-semibold p-2 px-5 rounded-full hover:ring-4 hover:ring-blue-300">
          Delete Account
        </button>
      </div>
    </div>
  );
}
