import { useAdminDataStore } from "../../Stores/AdminStore";


const AdminDetails = () => {
  const { adminProfile } = useAdminDataStore();
  return (
    <div className="flex flex-col w-full gap-[5px]">
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

export default AdminDetails;
