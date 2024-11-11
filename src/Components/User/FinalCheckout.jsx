import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import AddressModel from "./Model/AddressModel";

const FinalCheckout = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);

  const [allAddressList, setallAddressList] = useState([])
  const [currentDeliveryAddress, setcurrentDeliveryAddress] = useState([])

  const [allmodel, setallmodel] = useState({
    showAddressModel: false,
    data: []
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





  console.log("getAllAddress", allAddressList)
  useEffect(() => {
    getAllAddress()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="max-w-7xl w-full flex">
        {/* Left Side - Main Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mr-4">
          <h1 className="text-xl font-semibold mb-4">Checkout</h1>


          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-lg font-medium">1. DELIVERY ADDRESS</h2>
            {
              allAddressList && allAddressList.length > 0 && allAddressList.map((item) => (
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
                      currentDeliveryAddress && currentDeliveryAddress?._id == item?._id && <button className="bg-orange-500 text-white px-4 py-2 rounded mt-4">Deliver Here</button>

                    }
                  </div>
                </>

              ))
            }



            <button onClick={() => addAddressModel()} className="text-blue-500 mt-4 block">+ Add a new address</button>

          </div>



          {/* Order Summary Section */}
          <div className="border-b border-gray-300 pb-4 mb-4">
            <h2 className="text-lg font-medium">3. ORDER SUMMARY</h2>
          </div>

          {/* Payment Options Section */}
          <div>
            <h2 className="text-lg font-medium">4. PAYMENT OPTIONS</h2>
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
    </div>
  );
};

export default FinalCheckout;
