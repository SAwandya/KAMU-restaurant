// services/authService.ts
import api, { setAccessToken, clearAccessToken } from "./api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterCustomerData {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterRiderData extends RegisterCustomerData {
  vehicleREG: string;
}

export const registerCustomer = async (
  data: RegisterCustomerData
): Promise<User> => {
  const response = await api.post("/auth/register/customer", data);
  return response.data.user;
};

export const registerRider = async (data: RegisterRiderData): Promise<User> => {
  const response = await api.post("/auth/register/rider", data);
  return response.data.user;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.accessToken) {
    setAccessToken(response.data.accessToken);
  }
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  clearAccessToken();
};

export const validateToken = async (): Promise<boolean> => {
  try {
    await api.get("/auth/validate-token");
    return true;
  } catch {
    return false;
  }
};
