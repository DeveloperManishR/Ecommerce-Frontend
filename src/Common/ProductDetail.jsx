import { IoCloseSharp } from "react-icons/io5";
import React from "react";

const ProductDetail = ({ allmodel, setallmodel }) => {
  console.log("allmodel", allmodel);

  // Function to handle closing the modal
  const closeModal = () => {
    setallmodel((prev) => ({
      ...prev,
      showProductDetail: false,
    }));
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
            <div className="flex bg-white shadow-md rounded-xl w-full">
              {/* Image Section */}
              <div className="w-2/5 overflow-hidden rounded-l-xl">
                <img
                  src={allmodel.data.images[0]}
                  alt="Product"
                  className=""
                />
              </div>

             
              <div className="p-6 relative w-3/5">
                <button className="absolute top-4 right-4" onClick={closeModal}>
                  <IoCloseSharp className="h-8 w-8 text-gray-700" />
                </button>
                <h6 className="mb-4 text-base font-semibold uppercase text-gray-700">
                  {allmodel?.data?.category}
                </h6>
                <h4 className="mb-2 text-2xl font-semibold text-blue-gray-900">
                  {allmodel?.data?.title}
                </h4>
                <p className="mb-8 text-base text-gray-700">
                  {allmodel?.data?.description}
                </p>

                
                {/* Uncomment if Learn More button is needed */}
                {/* <a href="#" className="inline-block">
                  <button
                    className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase text-gray-900 transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20"
                    type="button"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
