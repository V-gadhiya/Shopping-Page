import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRoll, setOpenUpdateRoll] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:"",
  });
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponce = await fetchData.json();
    if (dataResponce.success) {
      setAllUsers(dataResponce.data);
    }
    if (dataResponce.error) {
      toast.error(dataResponce.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="pb-4 bg-white">
      <table className="w-full usertable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUsers.map((el, i) => {
            return (
              <tr key={el._id}>
                <td className="text-center">{i + 1}</td>
                <td className="text-center">{el?.name}</td>
                <td className="text-center">{el?.email}</td>
                <td className="text-center">{el?.role}</td>
                <td className="text-center">
                  {moment(el?.createdAt).format("LL")}
                </td>
                <td className="text-center">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRoll(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRoll && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRoll(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
