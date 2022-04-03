import { useQuery } from "react-query";
import axios from './axios';

export const useDataList = ({page, length}) => {

  return useQuery(
    ["listData",{page,length}], 
    () => axios.get(`api/patient/list`,{ params: {page,length}}).then((res) => res.data),
  );
}