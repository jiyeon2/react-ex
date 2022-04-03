import { useQuery } from "react-query";
import axios from './axios';

export const useGenderList = () => {
  return useQuery(
    ["genderData"], 
    () => axios.get(`api/gender/list`).then((res) => res.data.genderList),
  );
}