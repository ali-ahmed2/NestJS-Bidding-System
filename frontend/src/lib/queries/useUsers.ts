import { useQuery } from "react-query";
import { backendService } from "../config";
import { User } from "../../types";

export const useUsersList = () => {
  return useQuery(["UsersList"], async (): Promise<User[]> => {
    const res = await backendService.get(`/user`);
    return res.data;
  });
};
