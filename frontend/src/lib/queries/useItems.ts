import { useQuery } from "react-query";
import { backendService } from "../config";
import { Item } from "../../types";

export const useItemsIDsList = () => {
  return useQuery(["ItemsIDsList"], async (): Promise<Pick<Item, "id">[]> => {
    const res = await backendService.get(`/items`);
    return res.data;
  });
};

export const useItemByID = (id?: string | null) => {
  return useQuery(
    ["Item", id],
    async (): Promise<Item> => {
      const res = await backendService.get(`/items/${id}`);
      return res.data;
    },
    { enabled: !!id },
  );
};
