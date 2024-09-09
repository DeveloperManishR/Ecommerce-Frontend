import moment from "moment";


export const handleImage = (data) => {
    if (typeof data === "string" && data.includes("public")) {
      return `${import.meta.env.VITE_REACT_APP_BASEURL}/${data}`;
    } else {
      return data;
    }
  };
  export const dateFormat = (value) => {
    if (value) {
      let formattedDateTime = moment(value).format("ll");
      return formattedDateTime;
    } else {
      return "";
    }
  };
