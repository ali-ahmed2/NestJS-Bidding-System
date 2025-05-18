/* eslint-disable @typescript-eslint/no-explicit-any */

import { MessageInstance } from "antd/es/message/interface";
import { useMutation, useQueryClient } from "react-query";
import { Item } from "../../types";
import { backendService } from "../config";
import { AxiosError, AxiosResponse } from "axios";

export const useItemSubmit = (messageApi: MessageInstance) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Item) => {
      return backendService.post("/items", data);
    },
    onSuccess: async (data: AxiosResponse<any, any>) => {
      messageApi.open({
        key: "CreateItemResponse",
        type: "success",
        content: data.data.message,
      });
      await qc.invalidateQueries(["ItemsIDsList"]);
    },
    onMutate: () => {
      messageApi.open({
        key: "CreateItemResponse",
        type: "loading",
        content: "Creating item...",
      });
    },
    onError: (e: AxiosError<any, any>) => {
      messageApi.open({
        key: "CreateItemResponse",
        type: "error",
        content: e.response?.data.message || "Response Timeout",
      });
    },
  });
};
