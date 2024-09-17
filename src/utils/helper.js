import moment from "moment";


export const handleImage = (data) => {
    if(data.includes("https")){
     return data
    }else{
    return  `${import.meta.env.VITE_REACT_APP_BASEURL}/public/product-images/${data}`
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

  export const handleViewPrice=(value)=>{
    if(value){
      return Math.round(value * 100) / 100;
    }
  }
  export const handleViewRating = value => {
    return value?.toFixed(1);
  };
