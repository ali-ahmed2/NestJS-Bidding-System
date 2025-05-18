import React, { useEffect, useRef, useState } from "react";
import { useAuction } from "../context/AuctionContext";
import { formatCurrency } from "../utils";
import BidForm from "./BidForm";
import { Clock, ArrowUp } from "lucide-react";
import { useItemByID } from "../lib/queries/useItems";
import { useLatestBid } from "../lib/hooks/useBid";

const ItemDetails: React.FC = () => {
  const { selectedItemID } = useAuction();
  const { data: selectedItem } = useItemByID(selectedItemID);

  const intervalRef = useRef<NodeJS.Timeout>();
  const [timeLeft, setTimeLeft] = useState<number | null>();

  const auctionEndsAt = selectedItem
    ? new Date(selectedItem.createdAt).getTime() +
      selectedItem.auctionDurationInMinutes * 60 * 1000
    : 0;

  const hasAuctionEnded = Date.now() >= auctionEndsAt;

  const latestBidAmount = useLatestBid(selectedItemID, hasAuctionEnded);
  const bidThresholdAmount =
    latestBidAmount ?? selectedItem?.startingAmount ?? 0;

  useEffect(() => {
    if (!selectedItem) return;

    intervalRef.current = setInterval(
      () =>
        setTimeLeft(
          Math.max(0, Math.floor((auctionEndsAt - Date.now()) / 1000)),
        ),
      1000,
    );

    return () => intervalRef.current && clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  if (!selectedItemID || !selectedItem) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 flex-col p-8">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <ArrowUp size={32} className="text-gray-400" />
        </div>
        <p className="text-lg font-medium">Select an item</p>
        <p className="text-sm text-center max-w-xs mt-2">
          Choose an item from the list to view its details and place bids
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedItem.name}
          </h2>
          <p className="mt-2 text-gray-600">{selectedItem.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-lg text-gray-500 mt-1">
              {latestBidAmount ? "Current bid at" : "Starting at"}{" "}
              {formatCurrency(bidThresholdAmount)}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock size={16} className="mr-1" />
              <span className="text-lg">Time Left (seconds)</span>
            </div>
            <div
              className={`text-xl font-bold ${hasAuctionEnded ? "text-red-600" : "text-green-600"}`}
            >
              {timeLeft}
            </div>
          </div>
        </div>

        {!hasAuctionEnded && (
          <BidForm
            itemID={selectedItem.id}
            minimumBid={bidThresholdAmount + 1}
          />
        )}
        {hasAuctionEnded && (
          <span className="text-xl font-bold text-red-600">
            Auction has ended!
          </span>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
