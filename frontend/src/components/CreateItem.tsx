import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, InputNumber, Select, Button, Form, message } from "antd";
import { Item } from "../types";
import { useItemSubmit } from "../lib/mutations/useItemSubmit";

const CreateItem: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Item>({
    defaultValues: {
      auctionDurationInMinutes: 5,
    },
  });

  const [messageApi, contextHolder] = message.useMessage();

  const submit = useItemSubmit(messageApi);

  const durationOptions = [
    { value: 1, label: "1 minute" },
    { value: 2, label: "2 minutes" },
    { value: 3, label: "3 minutes" },
    { value: 4, label: "4 minutes" },
    { value: 5, label: "5 minutes" },
    { value: 10, label: "10 minutes" },
    { value: 15, label: "15 minutes" },
  ];

  const onSubmit = handleSubmit(async (data) => {
    await submit.mutateAsync(data);
    reset();
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {contextHolder}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create New Item
      </h2>

      <Form layout="vertical" onFinish={onSubmit}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Form.Item
              label="Item Name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Input
                {...field}
                placeholder="e.g. Vintage Watch Collection"
                size="large"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Form.Item
              label="Description"
              validateStatus={errors.description ? "error" : ""}
              help={errors.description?.message}
            >
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Provide a detailed description of your item..."
                size="large"
              />
            </Form.Item>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="startingAmount"
            control={control}
            rules={{
              required: "Starting price is required",
              min: { value: 1, message: "Price must be greater than 0" },
            }}
            render={({ field }) => (
              <Form.Item
                label="Starting Price"
                validateStatus={errors.startingAmount ? "error" : ""}
                help={errors.startingAmount?.message}
              >
                <InputNumber
                  {...field}
                  prefix="$"
                  min={1}
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="100"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="auctionDurationInMinutes"
            control={control}
            render={({ field }) => (
              <Form.Item label="Auction Duration">
                <Select {...field} size="large" options={durationOptions} />
              </Form.Item>
            )}
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          className="mt-6 bg-blue-600 hover:bg-blue-700"
        >
          Create Item
        </Button>
      </Form>
    </div>
  );
};

export default CreateItem;
