import { ConfigProvider, Spin } from "antd";
import { useEffect, useState } from "react";
import TokenDetails from "./components/TokenDetails";
import { getTokenDetails, TokenResponse } from "./services/api";

function App() {
  const [tokenDetails, setTokenDetails] = useState<TokenResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const data = await getTokenDetails("user123"); // Replace with actual userId
        setTokenDetails(data);
      } catch (err) {
        setError("Failed to fetch token details");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
      <div style={{ padding: "20px" }}>
        {tokenDetails && (
          <TokenDetails
            token={tokenDetails.token}
            expiryDate={tokenDetails.expiryDate}
            expiryTime={tokenDetails.expiryTime}
            status={tokenDetails.status}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
