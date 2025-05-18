import React from "react";
import { useAuction } from "../context/AuctionContext";
import { PlusCircle, Package } from "lucide-react";

const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useAuction();

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        <button
          onClick={() => setActiveTab("create")}
          className={`cursor-pointer inline-flex items-center py-4 px-6 text-sm font-medium transition-colors duration-200 ${
            activeTab === "create"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <PlusCircle size={18} className="mr-2" />
          Create Item
        </button>
        <button
          onClick={() => setActiveTab("browse")}
          className={`cursor-pointer inline-flex items-center py-4 px-6 text-sm font-medium transition-colors duration-200 ${
            activeTab === "browse"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <Package size={18} className="mr-2" />
          Browse Items
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;
