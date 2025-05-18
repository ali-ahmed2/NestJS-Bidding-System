import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuctionContextType {
  selectedItemID: string | null;
  activeTab: "create" | "browse";
  setActiveTab: (tab: "create" | "browse") => void;
  selectItem: (id: string) => void;
}

const AuctionContext = createContext<AuctionContextType | null>(null);

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error("useAuction must be used within an AuctionProvider");
  }
  return context;
};

interface AuctionProviderProps {
  children: ReactNode;
}

export const AuctionProvider: React.FC<AuctionProviderProps> = ({
  children,
}) => {
  const [selectedItemID, setSelectedItemID] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "browse">("create");

  const selectItem = (id: string) => {
    setSelectedItemID(id);
  };

  return (
    <AuctionContext.Provider
      value={{
        selectedItemID,
        activeTab,
        setActiveTab,
        selectItem,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
