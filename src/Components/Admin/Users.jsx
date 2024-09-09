import React, { useEffect, useState } from "react";
import { withoutAuthAxios } from "../../config/config";

const Users = () => {
  const [users, setusers] = useState([]);

  const fetchAllusers = async () => {
    await withoutAuthAxios()
      .get(`/auth/get-all-users`)
      .then((response) => {
        const resData = response.data;

        setusers(resData.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  console.log(users);

  useEffect(() => {
    fetchAllusers();
  }, []);

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6">Users</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone No
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users &&
              users.map((item, index) => (
                <tr key={item?.users?.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.user?.fname} {item?.user?.lname}{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.user?.phone}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {item?.users?.total}
                  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {item?.users?.status}
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
