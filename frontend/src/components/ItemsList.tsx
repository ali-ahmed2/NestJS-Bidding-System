import React from "react";
import { useAuction } from "../context/AuctionContext";
import { Search } from "lucide-react";
import { useItemsIDsList } from "../lib/queries/useItems";
import { ItemCard } from "./ItemCard";

const ItemsList: React.FC = () => {
  const { selectItem } = useAuction();
  const { data: items } = useItemsIDsList();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto max-h-[calc(100vh)]">
        {items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
            <Search size={48} className="mb-2 opacity-30" />
            <p>No items found</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items?.map((item) => (
              <li key={item.id} onClick={() => selectItem(item.id)}>
                <ItemCard id={item.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemsList;
