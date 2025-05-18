import { useItemByID } from "../lib/queries/useItems";
import React from "react";
import { useAuction } from "../context/AuctionContext";

export const ItemCard: React.FC<{ id: string }> = ({ id }) => {
  const { selectedItemID } = useAuction();
  const { data: item } = useItemByID(id);
  return (
    <>
      {item && (
        <div
          className={`flex p-4 cursor-pointer transition-colors duration-300 hover:bg-gray-50  ${selectedItemID === id ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
        >
          <div className="flex-grow min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {item?.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {item?.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
