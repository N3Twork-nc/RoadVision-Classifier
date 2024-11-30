export default function ChangePassword() {
  return (
    <div className="w-full flex flex-col gap-5 p-3 items-center justify-center px-5">
      <div className="Username w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">
          Current password
        </label>
        <input
          type="password"
          name="current-password"
          placeholder="Enter your current password"
          className="w-full h-11 p-4 mt-2 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          required
        />
      </div>
      <div className="Username w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">
          New password
        </label>
        <input
          type="password"
          name="new-password"
          placeholder="Enter your new password"
          className="w-full h-11 p-4 mt-2 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          required
        />
      </div>
      <div className="Re-enter w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">
          Re-enter new password
        </label>
        <input
          type="password"
          name="re-enter-password"
          placeholder="Re-enter your new password"
          className="w-full h-11 p-4 mt-2 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          required
        />
      </div>
      <div>
        <button className="w-fit bg-[#3749A6] text-white font-semibold mt-2 p-2 px-5 rounded-full hover:ring-4 hover:ring-blue-300">
          Save Password
        </button>
      </div>
    </div>
  );
}
