//use to store Map data state, similar to redux  
import { atom } from "recoil";


// Define sẵn mà chưa dùng đến
export const mapState = atom({
    key: "mapState", // unique ID for this atom
    default: {
      
    }, // default value
  });
  