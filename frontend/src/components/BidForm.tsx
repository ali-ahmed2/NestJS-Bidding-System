import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, InputNumber, Button, Form, message } from "antd";
import { formatCurrency } from "../utils";
import { Bid } from "../types";
import { useUsersList } from "../lib/queries/useUsers";
import { useBidSubmit } from "../lib/mutations/useBidSubmit";

interface BidFormProps {
  itemID: string;
  minimumBid: number;
}

const BidForm: React.FC<BidFormProps> = ({ itemID, minimumBid }) => {
  const { data: users } = useUsersList();

  const [messageApi, contextHolder] = message.useMessage();
  const submit = useBidSubmit(messageApi);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Bid>();

  const onSubmit = handleSubmit(async (data) => {
    if (data.amount < minimumBid) {
      message.error(`Bid must be at least ${formatCurrency(minimumBid)}`);
      return;
    }
    await submit.mutateAsync({ ...data, itemID, time: Date.now() });
  });

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      {contextHolder}
      <h3 className="text-lg font-medium text-gray-800 mb-4">Place a Bid</h3>

      <Form layout="vertical" onFinish={onSubmit}>
        <Controller
          name="userID"
          control={control}
          rules={{ required: "Please select a user" }}
          render={({ field }) => (
            <Form.Item
              label="Bidding as"
              validateStatus={errors.userID ? "error" : ""}
              help={errors.userID?.message}
            >
              <Select
                {...field}
                placeholder="Select a user"
                size="large"
                options={users?.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Bid amount is required",
            min: {
              value: minimumBid,
              message: `Minimum bid is ${formatCurrency(minimumBid)}`,
            },
          }}
          render={({ field }) => (
            <Form.Item
              label={`Bid amount (min: ${formatCurrency(minimumBid)})`}
              validateStatus={errors.amount ? "error" : ""}
              help={errors.amount?.message}
            >
              <InputNumber
                {...field}
                prefix="$"
                // min={minimumBid}
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
        />

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          className="bg-blue-600 hover:bg-blue-700"
        >
          Place Bid
        </Button>
      </Form>
    </div>
  );
};

export default BidForm;
