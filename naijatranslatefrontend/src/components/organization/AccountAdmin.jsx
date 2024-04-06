import { useAdminDataStore } from "../../Stores/AdminStore";
const AccountAdmin = () => {
  const { adminProfile } = useAdminDataStore();
  return (
    <div className=" w-full p-[10px] mt-[10px] ml-[10px] flex flex-col flex-wrap rounded-[10px] bg-white">
      <h1 className="font-bold text-[16px]">Admin Profile</h1>
      <hr className="bg-dark opacity-30 h-[1px] w-full" />
      <div className="flex flex-col">
        <div>{adminProfile.first_name}</div>
        <div>{adminProfile.last_name}</div>
        <div>{adminProfile.email_address}</div>
      </div>
    </div>
  );
};

export default AccountAdmin;
