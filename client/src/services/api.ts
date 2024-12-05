import axios from "axios";

// Define the type for API data
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  role: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5001/api/user",
  withCredentials: true,
});

// Login API
export const loginUser = async (data: LoginData): Promise<{ message: string }> => {
  const response = await api.post("/login", data);
  return response.data;
};

// Register API
export const registerUser = async (data: RegisterData): Promise<{ message: string }> => {
  const response = await api.post("/register", data);
  return response.data;
};

// Logout API
export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await api.get("/logout");
  return response.data;
};
