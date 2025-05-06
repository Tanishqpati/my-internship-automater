import axios from "axios";

const API_URL = "http://localhost:3000";

export interface TokenResponse {
  token: string;
  name: string;
  expiryDate: string;
  expiryTime: string;
  status: "active" | "expired";
}

export const getTokenDetails = async (
  userId: string
): Promise<TokenResponse> => {
  const response = await axios.get(`${API_URL}/tokens/${userId}`);
  return response.data;
};
