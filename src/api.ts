import { useQuery } from "react-query";
import { ExchangesData } from "./types";

function getExchanges(): Promise<ExchangesData> {
  return fetch("https://api.exchangeratesapi.io/latest?base=CAD").then((res) =>
    res.json()
  );
}

export function useExchanges() {
  return useQuery("exchanges", getExchanges, {
    cacheTime: 1000 * 10, // this will requery the API every 10 seconds
  });
}
