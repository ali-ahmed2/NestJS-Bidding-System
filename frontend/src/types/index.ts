export interface Item {
  id: string;
  name: string;
  description: string;
  startingAmount: number;
  auctionDurationInMinutes: number;
  createdAt: Date;
}

export interface Bid {
  id: string;
  userID: string;
  itemID: string;
  time: number;
  amount: number;
}

export interface User {
  id: string;
  name: string;
}
