import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import AddressModel from "./Model/AddressModel";
// import { TrashIcon, MinusIcon, PlusIcon, ArrowLeftIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline"
import { handleImage } from "../../utils/helper";
import toast, { Toaster } from "react-hot-toast";
import AllProductModel from "./Model/AllProductModel";
import { ShoppingCartIcon, CheckIcon, ArrowRightIcon, PlusIcon, TrashIcon, PencilIcon, CreditCardIcon, GiftIcon, ArrowDownIcon, CheckCircleIcon ,UserCircleIcon,InboxIcon} from '@heroicons/react/24/outline';

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
    showAllproductsModel: false
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
        console.log("resDataresDataresData", resData);

        let totalAmount = 0;
        resData.data.map((item) => {
          totalAmount = totalAmount + item.quantity * item.product.price;
        });


        if (resData.data.length == 0) {
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
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <ol className="flex items-center w-full">
      <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
        <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
          <CheckCircleIcon className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" />
        </span>
      </li>
      <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
        <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
          <UserCircleIcon className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
        </span>
      </li>
      <li className="flex items-center w-full">
        <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
          <InboxIcon className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
        </span>
      </li>
    </ol>
      </form>
    </section>
  );
};

export default FinalCheckout;
