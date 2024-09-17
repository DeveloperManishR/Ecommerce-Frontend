import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { authAxios } from "../../config/config";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userDetail, setuserDetail] = useState([]);
  const userId = useSelector((state) => state.auth.user.id);

  const fetchUserDetail = async () => {
    await authAxios()
      .get(`/auth/getUserById/${userId}`)
      .then((response) => {
        const resData = response.data;
        console.log("res", resData);
        setuserDetail(resData.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleUploadImage = async (e) => {
    console.log("userId", e.target.files[0]);

    const formdata = new FormData();
    formdata.append("photos", e.target.files[0]);

    await authAxios()
      .put(`/auth/update-profile-pic/${userId}`, formdata)
      .then((response) => {
        fetchUserDetail();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Personal Details
        </h3>
        
        <div className="relative inline-block mt-5">
          <img
            src={`${import.meta.env.VITE_REACT_APP_BASEURL}/public/user-images/${userDetail.profilePic}`}
            className="size-[62px] rounded-full cursor-pointer"
            alt="Profile"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            accept="png jpg"
            id="fileInput"
            className="hidden"
            onChange={handleUploadImage}
          />
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userDetail?.fname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userDetail?.lname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userDetail?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userDetail?.phoneno}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
