import { Timestamp } from "firebase/firestore";

export interface UsersData {
  data: GasEntry[];
}

export interface GasEntry {
  paid: number;
  consumption: number;
  price: number;
  distance: number;
  date: Timestamp;
}
