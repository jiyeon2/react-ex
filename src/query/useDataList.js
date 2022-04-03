import { useQuery } from "react-query";
import axios from './axios';

export const useDataList = (params) => {

  return useQuery(
    ["listData",params], 
    () => axios.get(`api/patient/list`,{ params}).then((res) => res.data.patient),
  );
}