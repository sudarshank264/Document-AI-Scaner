const API_URL = "http://localhost:3000";

export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const loginUser = async (user) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const uploadDocument = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/scan`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};
export const getGeminiResponse = async (prompt) => {
  try {
    const response = await fetch("http://localhost:3000/gemini/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error fetching response.";
  }
};
