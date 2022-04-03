import { useQuery } from "react-query";
import axios from './axios';

export const useDetailData = (personId) => {
  return useQuery(
    ["detail", personId], 
    () => axios.get(`api/patient/brief/${personId}`).then((res) => res.data),
    {enabled: !!personId}
  );
}