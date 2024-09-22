export const formatNumber = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const convertSecondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return { minutes, remainingSeconds };
};
export const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.NEXT_APP_SPOTIFY_CLIENT_ID}:${process.env.RNEXT_APP_SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  return await response.json();
};


export const fetchTracks = async (token, searchQuery) => {
  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
};