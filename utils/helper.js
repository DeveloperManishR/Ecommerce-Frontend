import moment from "moment";
export const sortByBudget = [
  { label: "ALL", value: "all" },
  { label: "00.00-20.00", value: "00.00-20.00" },
  { label: "20.00-40.00", value: "20.00-40.00" },
  { label: "40.00-60.00", value: "40.00-60.00" },
];

export const sortByPrice = [
  { label: "Low to High", value: "low-to-high" },
  { label: "High to Low", value: "high-to-low" },
];

export const staticCategory = [
  { value: "Wall Painting", label: "Wall Painting" },

  { value: "Laundry", label: "Laundry" },
  { value: "Furniture Painting", label: "Furniture Painting" },
  { value: "Plumbing", label: "Plumbing" },
];

export const staticRatingFilter = [
  { value: "completedTasks", label: "Completed Tasks" },
  { value: "ratings", label: "Ratings" },
  { value: "alphabetsOfName", label: "A to Z" },
  { value: "availability", label: "Availablity" },
];

export const CancelReasons = [
  "Low Budget",
  "Availability Issue",
  "Already Have Another Task",
  "Other Issues",
];

export const staticDescription =
  " If you are looking for a trustworthy, professional organized, and diligent assistant to help you...";

export const extractTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};
// numberFormatter.js
export const displayBudget = (data) => {
  // console.log(data);
  if (data == 0) {
    return "";
  } else if (data.includes(".")) {
    const findIndex = data.indexOf(".");
    const firstnumber = findIndex + 1;
    const secondnumber = findIndex + 3;

    return `${data.slice(0, firstnumber)}${data.slice(
      firstnumber,
      secondnumber
    )}`;

    // return data;
  } else if (data.length > 0) {
    const numericValue = data?.replace(/[^\d]/g, ""); // Remove non-numeric characters
    return numericValue
      ? parseInt(numericValue, 10).toLocaleString("en-US")
      : "";
  } else {
    return "";
  }
};



export const payloadBudget=(data)=>{
  return data.replace(/,/g, '');

}

export const handleImage = (data) => {
  if (typeof data === "string" && data.includes("public")) {
    return `${import.meta.env.VITE_REACT_APP_BASEURL}/${data}`;
  } else {
    return data;
  }
};


export const handleDecimalNumber = (value) => {
  return value?.toFixed(1);
};
export const handleEmailandPhoneCheck = (value) => {
  return (
    value.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/) ||
    /*   value.match(/\b\d{8,}\b/) ||
    
    value.match(/^[^\s]+(\d{7,})/)
    */

    value.match(/\d{6,}/)
  );
};

export const formatCurrency = (value) => {
  const numericValue = parseInt(value.replace(/[^\d]/g, ""), 10);
  return numericValue.toLocaleString("en-US");
};

export const dateFormat=(value)=>{
  if (value) {
    let formattedDateTime = moment(value).format('ll');
    return formattedDateTime;
  } else {
    return "";
  }
}