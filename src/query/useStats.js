import { useQuery } from "react-query";
import axios from './axios';

export const useStats = () => {
  return useQuery(
    ["stats"], 
    () => axios.get(`api/patient/stats`).then((res) => res.data.stats),
  );
}