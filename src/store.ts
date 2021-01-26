import create, { State } from "zustand";
import produce from "immer";

import { Receipt } from "./types";

let id = 0;

interface Store extends State {
  currency: string;
  setCurrency: (currency: string) => void;
  receipts: Record<string, Receipt>;
  addReceipt: () => void;
  updateReceipt: (id: string, receipt: Partial<Receipt>) => void;
}

export const useStore = create<Store>((set) => ({
  currency: "CAD",
  setCurrency: (currency: string) => set(() => ({ currency })),
  receipts: {} as Record<string, Receipt>,
  addReceipt: () =>
    set(
      produce((draft) => {
        let receiptId = `${id++}`;
        draft.receipts[receiptId] = {
          currency: draft.currency,
          amount: 0,
          amountCAD: 0,
          id: receiptId,
        };
      })
    ),
  updateReceipt: (id: string | number, receipt: Partial<Receipt>) =>
    set(
      produce((draft) => {
        draft.receipts[id] = {
          ...draft.receipts[id],
          ...receipt,
        };
      })
    ),
}));
