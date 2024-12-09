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
const userAPI = axios.create({
  baseURL: "http://localhost:5000/api/user",
  withCredentials: true,
});

const productAPI = axios.create({
  baseURL: "http://localhost:5000/api/product",
  withCredentials: true,
});

// Login API
export const loginUser = async (
  data: LoginData
): Promise<{ message: string }> => {
  const response = await userAPI.post("/login", data);
  return response.data;
};

// Register API
export const registerUser = async (
  data: RegisterData
): Promise<{ message: string }> => {
  const response = await userAPI.post("/register", data);
  return response.data;
};

// Logout API
export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await userAPI.get("/logout");
  return response.data;
};

export const addProduct = async (data: any): Promise<{ message: string }> => {
  const response = await productAPI.post("/createProduct", data);
  return response.data;
};

export const getProducts = async (): Promise<any> => {
  const response = await productAPI.get("/");
  return response.data;
};

export const getProfileDetails = async (userId): Promise<any> => {
  const response = await userAPI.get(`/${userId}`);
  return response?.data?.user;
};

export const getPreSignedURL = async (
  fileName: string,
  fileType: string
): Promise<{ url: string }> => {
  const response = await productAPI.get(
    `/get-presigned-url?fileName=${encodeURIComponent(
      fileName
    )}&fileType=${fileType}`
  );
  return response.data;
};

export const uploadFile = async (url: string, file: File): Promise<void> => {
  console.log(url, file);
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file to S3");
  }
};

export const updateProfile = async (
  userId: string,
  data: any
): Promise<{ message: string }> => {
  const response = await userAPI.put(`/update-profile/${userId}`, data);
  console.log(response);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await productAPI.delete(`/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProductsBySeller = async (userId: string): Promise<any> => {
  const response = await userAPI.post("/products-created", { userId });
  return response.data;
};

export const getProductById = async (productId: string): Promise<any> => {
  const response = await productAPI.get(`/${productId}`);
  return response.data;
};

export const updateProduct = async (
  productId: string,
  data: any
): Promise<any> => {
  const response = await productAPI.put(`/${productId}`, data);
  return response.data;
};

export const buyProduct = async (productId: string): Promise<any> => {
  const response = await productAPI.post("/buy-product", { productId });
  return response.data;
};

export const getUserOrders = async (userId: string): Promise<any> => {
  const response = await userAPI.post("/products-bought", { userId });
  return response.data;
}