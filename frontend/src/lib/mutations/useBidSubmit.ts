/* eslint-disable @typescript-eslint/no-explicit-any */

import { MessageInstance } from "antd/es/message/interface";
import { useMutation } from "react-query";
import { Bid } from "../../types";
import { backendService } from "../config";
import { AxiosError, AxiosResponse } from "axios";

export const useBidSubmit = (messageApi: MessageInstance) => {
  return useMutation({
    mutationFn: (data: Bid) => {
      return backendService.post("/bid", data);
    },
    onSuccess: (data: AxiosResponse<any, any>) => {
      messageApi.open({
        key: "PlaceBidResponse",
        type: "success",
        content: data.data.message,
      });
    },
    onMutate: () => {
      messageApi.open({
        key: "PlaceBidResponse",
        type: "loading",
        content: "Creating item...",
      });
    },
    onError: (e: AxiosError<any, any>) => {
      messageApi.open({
        key: "PlaceBidResponse",
        type: "error",
        content: e.response?.data.message || "Response Timeout",
      });
    },
  });
};
