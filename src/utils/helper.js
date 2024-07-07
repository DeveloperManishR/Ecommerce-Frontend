export const handleImage = (data) => {
    if (typeof data === "string" && data.includes("public")) {
      return `${import.meta.env.VITE_REACT_APP_BASEURL}/${data}`;
    } else {
      return data;
    }
  };