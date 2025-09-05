import axios from "axios";
const API_URL = "http://localhost:8000/api";

export const getSymbolData = async (symbol: string) => {
  const response = await axios(`${API_URL}/stocks/symbols/${symbol}`);
  if (!response) {
    throw new Error("Failed to fetch stock data");
  }
  return response.data;
};
