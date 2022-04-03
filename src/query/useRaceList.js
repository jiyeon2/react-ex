import { useQuery } from "react-query";
import axios from './axios';

export const useRaceList = () => {
  return useQuery(
    ["raceData"], 
    () => axios.get(`api/race/list`).then((res) => res.data.raceList),
  );
}