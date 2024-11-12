import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import AddressModel from "./Model/AddressModel";
import { TrashIcon, MinusIcon, PlusIcon, ArrowLeftIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline"
import { handleImage } from "../../utils/helper";
import toast, { Toaster } from "react-hot-toast";
import AllProductModel from "./Model/AllProductModel";

const FinalCheckout = () => {


  const [step, setstep] = useState(0)

  const [allAddressList, setallAddressList] = useState([])
  const [currentDeliveryAddress, setcurrentDeliveryAddress] = useState([])
  const [paymentMethod, setpaymentMethod] = useState('')
  const [productDetails, setproductDetails] = useState({
    product: [],
    totalAmount: "",
  });

  const [allmodel, setallmodel] = useState({
    showAddressModel: false,
    data: [],
    showAllproductsModel:false
  })


  

  const getAllAddress = async () => {
    await authAxios()
      .get(`/address/get-all-address`)
      .then((response) => {
        setallAddressList(response.data.data)
      }).catch((error) => {
        console.log("fsfdadffd", error)
      })
  }

  const addAddressModel = async (data) => {
    if (allmodel?.showAddressModel == true) {
      console.log("data", data)
      await authAxios()
        .post('/address/add-address', data)
        .then((response) => {

          setallmodel((prev) => ({
            ...prev,
            showAddressModel: false,
            data: []
          }))
          getAllAddress()
          setcurrentDeliveryAddress([])

        }).catch((error) => {
          console.log("erssdfsd", error)
        })
    } else {
      setallmodel((prev) => ({
        ...prev,
        showAddressModel: true,
        data: []
      }))
    }
  }

  const getAllcartsProducts = async () => {
    await authAxios()
      .get(`/cart/get-cart-products`)
      .then((response) => {
        const resData = response.data;
        console.log("resDataresDataresData",resData);

        let totalAmount = 0;
        resData.data.map((item) => {
          totalAmount = totalAmount + item.quantity * item.product.price;
        });


    if(resData.data.length==0){
      setallmodel((prev) => ({
        ...prev,
        showAllproductsModel: true,
        data: []
      }))
    }
        

        setproductDetails((prev) => ({
          ...prev,
          product: resData.data,
          totalAmount: Math.round(totalAmount),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNext = () => {
    setstep(step + 1)

    if (step + 1 == 1) {
      getAllcartsProducts()
    }
  }

  const removeProductfromCart = async (id) => {
    console.log("sds", id);

    await authAxios()
      .delete(`/cart/remove-from-cart/${id}`)
      .then((response) => {
        getAllcartsProducts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increaseProductquantity = async (item) => {
    await authAxios()
      .post(`/cart/add-to-cart/${item?.product?._id}`)
      .then((response) => {
        getAllcartsProducts();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const decreaseProductquantity = async (item) => {
    await authAxios()
      .put(`/cart/decrease-product-quantity/${item?.product?._id}`)
      .then((response) => {
        getAllcartsProducts();
         toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };






  console.log("getAllAddress", productDetails)
  useEffect(() => {
    getAllcartsProducts()
    getAllAddress()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="max-w-7xl w-full flex">
        {/* Left Side - Main Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mr-4">
          <h1 className="text-xl font-semibold mb-4">Checkout</h1>


          <div className="border-b border-gray-300 pb-4 mb-4">


            <h2 className="text-lg font-medium bg-[#665e5e] text-white p-1 rounded-[5px]">1. DELIVERY ADDRESS</h2>
            {
              step == 0 && allAddressList && allAddressList.length > 0 && allAddressList.map((item) => (
                <>
                  <div className="mt-4 space-y-4">
                    {/* Address 1 */}
                    <div onClick={() => setcurrentDeliveryAddress(item)} className="flex items-start space-x-2">
                      <input type="radio" name="address" />
                      <div>
                        <p className="font-semibold">{item?.name} </p>
                        <p className="font-light">{item?.address}</p>
                      </div>
                    </div>

                    {
                      currentDeliveryAddress && currentDeliveryAddress?._id == item?._id && <button
                        onClick={() => setstep(step + 1)}
                        className="bg-orange-700 text-white px-4 py-2 rounded mt-4">Deliver Here</button>

                    }
                  </div>
                </>

              ))
            }
            {
              step == 0 && <button onClick={() => addAddressModel()} className="text-blue-500 mt-4 block">+ Add a new address</button>
            }

          </div>



          {/* Order Summary Section */}
          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-lg font-medium">2. ORDER SUMMARY</h2>

            {
              step == 1 && <div>
                <section className="py-8 relative">
                  <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    {
                      productDetails && productDetails.product.map((item) => (
                        <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
                          <div className="col-span-12 lg:col-span-2 img box">
                            <img
                              src={handleImage(item?.product?.images[0])}
                              alt="speaker image"
                              className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
                            />
                          </div>
                          <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                            <div className="flex items-center justify-between w-full mb-4">
                              <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                                {item?.product?.title}
                              </h5>
                              <button onClick={()=>removeProductfromCart(item?._id)} className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                <TrashIcon className="h-6 w-6 text-red-500 transition-all duration-500 group-hover:text-white" />
                              </button>
                            </div>
                            <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                              {item?.product?.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <button
                                 onClick={()=>decreaseProductquantity(item)}
                                  className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                                >
                                  <MinusIcon className="h-5 w-5 text-gray-900 transition-all duration-500 group-hover:text-black" />
                                </button>
                                <input
                                  type="text"
                                  className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                                  readOnly
                                  value={item?.quantity}
                                />
                                <button
                                onClick={()=>increaseProductquantity(item)}
                                  className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                                >
                                  <PlusIcon className="h-5 w-5 text-gray-900 transition-all duration-500 group-hover:text-black" />
                                </button>
                              </div>
                              <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right"> ${item?.product?.price}</h6>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                  </div>


                </section>
                {
                  productDetails.product.length>0&&  <button
                  onClick={() => handleNext()}
                  class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                  to Payment
                  <ArrowRightCircleIcon className="w-8 h-8 ml-5" />
                </button>
                }
               
              </div>
            }
          </div>

          <div>
            <h2 className="text-lg font-medium">3. PAYMENT OPTIONS</h2>

            {step === 2 && (
              <>
                <ul>
                  <li onClick={() => setpaymentMethod('card')} className="flex items-center">
                    <input type="radio" id="card" name="payment" />
                    <label htmlFor="card" className="ml-2">Card</label>
                  </li>
                  <li onClick={() => setpaymentMethod('cash')} className="flex items-center">
                    <input type="radio" id="cash" name="payment" />
                    <label htmlFor="cash" className="ml-2">Cash On Delivery</label>
                  </li>
                </ul>

                {
                  paymentMethod && paymentMethod.length > 0 && <button
                    // onClick={() => setstep(step + 1)}
                    className="bg-orange-700 text-white px-4 py-2 rounded mt-4">Confirm</button>
                }
              </>
            )}



          </div>
        </div>

        {/* Right Side - Price Details */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">PRICE DETAILS</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price (1 item)</span>
              <span>₹1,298</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600 line-through">₹140</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹3</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Payable</span>
              <span>₹1,301</span>
            </div>
            <div className="text-green-600 font-medium mt-2">
              Your Total Savings on this order ₹697
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      </div>

      {
        allmodel.showAddressModel && <AddressModel
          addAddressModel={addAddressModel}
          setallmodel={setallmodel}
          allmodel={allmodel}
        />
      }

      {
        allmodel?.showAllproductsModel&&<AllProductModel
         
        />
      }
    </div>
  );
};

export default FinalCheckout;
