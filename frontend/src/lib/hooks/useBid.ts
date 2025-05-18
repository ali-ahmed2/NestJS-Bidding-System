import { useEffect, useRef, useState } from "react";

export const useLatestBid = (
  itemID: string | null,
  hasAuctionEnded: boolean,
) => {
  const [bidAmount, setBidAmount] = useState<number | null>(null);
  const eventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!itemID) return;

    eventSource.current = new EventSource(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}/bid/${itemID}/latest-bid`,
    );

    eventSource.current.onmessage = (e) => {
      const newBid = JSON.parse(e.data);
      setBidAmount(newBid.amount);
      if (hasAuctionEnded) eventSource.current?.close();
    };

    return () => eventSource.current?.close();
  }, [itemID, hasAuctionEnded]);

  return bidAmount;
};
