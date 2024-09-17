import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { handleImage } from "../../../utils/helper";
import { AiOutlineClose } from "react-icons/ai";
const ProductModel = ({
  addProduct,
  setshowaddProduct,
  handleAddProduct,
  setmodel,
  model,
  handleEditProduct,
}) => {
  const [formData, setformData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    images: [],
    prevImages: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    handleAddProduct(formData);
  };

  const handleUploadFile = (e) => {
    //  console.log(e.target.files)
    const files = e.target.files;

    setformData((prev) => ({
      ...prev,
      images: [...formData?.images, ...Array.from(files)],
    }));
  };

  const handleRemoveCurrentImage = (newindex) => {
    const test = formData?.images.filter((item, index) => index !== newindex);
    setformData((prev) => ({
      ...prev,
      images: test,
    }));
  };

  const handleRemovePrevImage = (newindex) => {
    const test = formData?.prevImages.filter(
      (item, index) => index !== newindex
    );
    setformData((prev) => ({
      ...prev,
      prevImages: test,
    }));
  };

  useEffect(() => {
    if (model.data) {
      setformData((prev) => ({
        ...prev,
        title: model.data.title,
        category: model.data.category,
        description: model.data.description,
        price: model.data.price,
        stock: model.data.stock,
        images: [],
        prevImages: model.data.images,
      }));
    }
  }, []);

  const handleEditUpdate = (e) => {
    e.preventDefault();
    handleEditProduct(formData);
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
        <form
          onSubmit={model?.data?.title ? handleEditUpdate : handleSubmit}
          className="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 modal--popupservice">
              <div className="pophead flex justify-between items-center mb-[10px]">
                {model?.data?.title ? (
                  <h2 className="font-semibold text-[20px]">Update Product</h2>
                ) : (
                  <h2 className="font-semibold text-[20px]">Add Product</h2>
                )}

                <div
                  className="close cursor-pointer text-[20px]"
                  onClick={() =>
                    setmodel((prev) => ({ ...prev, show: false, data: [] }))
                  }
                >
                  <IoCloseSharp />
                </div>
              </div>

              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Name
                    </label>
                    <input
                      className="w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="name"
                      required
                      name="title"
                      onChange={handleChange}
                      value={formData.title}
                      type="text"
                      placeholder=""
                    />
                    <div></div>
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="category"
                    >
                      Category*
                    </label>
                    <input
                      className="w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="category"
                      required
                      type="text"
                      name="category"
                      onChange={handleChange}
                      value={formData.category}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Description*
                    </label>
                    <textarea
                      className="w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      // placeholder="http://...."
                    />
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Price*
                    </label>
                    <div>
                      <input
                        className="w-full bg-white border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                        required
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="job-type"
                    >
                      Stock*
                    </label>
                    <div>
                      <input
                        className="w-full bg-white border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="stock"
                        name="stock"
                        required
                        type="number"
                        onChange={handleChange}
                        value={formData.stock}
                      />
                    </div>
                  </div>
                </div>
                <div className=" mt-2">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      {/* Plus icon from react-icons */}
                      <FiPlus className="text-gray-500 text-2xl" />
                    </div>
                    <span className="mt-2 text-gray-600 text-sm">
                      Add files
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleUploadFile}
                  />

                  {formData && formData?.images.length > 0 && (
                    <div className="flex flex-wrap gap-4 p-4  rounded-md">
                      {formData?.images.map((item, index) => (
                        <div key={index} className="relative w-20 h-20">
                          <img
                            className="w-full h-full object-cover rounded"
                            src={URL.createObjectURL(item)}
                            alt={`Image ${index + 1}`}
                          />

                          <AiOutlineClose
                            className="absolute top-0 right-0 m-1 text-white bg-black rounded-full p-1 cursor-pointer"
                            size={16}
                            onClick={() => handleRemoveCurrentImage(index)} // Function to remove the image
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {formData && formData?.prevImages?.length > 0 && (
                    <div className="flex flex-wrap gap-4 p-4  rounded-md">
                      {formData?.prevImages.map((item, index) => (
                        <div key={index} className="relative w-20 h-20">
                          <img
                            key={index}
                            className="w-full h-full object-cover rounded"
                            src={handleImage(item)}
                            alt={`Image ${index + 1}`}
                          />

                          <AiOutlineClose
                            className="absolute top-0 right-0 m-1 text-white bg-black rounded-full p-1 cursor-pointer"
                            size={16}
                            onClick={() => handleRemovePrevImage(index)} // Function to remove the image
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-[10px] justify-end">
              {model.data.title ? (
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  // onClick={() => handleaddCategory(CategoryName)}
                >
                  Update Product
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  // onClick={() => handleaddCategory(CategoryName)}
                >
                  Add Product
                </button>
              )}

              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                // onClick={handleclose}
                onClick={() =>
                  setmodel((prev) => ({ ...prev, show: false, data: [] }))
                }

                // onClick={() => setshowAddCategory(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModel;
