import { useQuery } from "react-query";
import axios from './axios';

export const useEthnicityList = () => {
  return useQuery(
    ["ethnicityData"], 
    () => axios.get(`api/ethnicity/list`).then((res) => res.data.ethnicityList),
  );
}