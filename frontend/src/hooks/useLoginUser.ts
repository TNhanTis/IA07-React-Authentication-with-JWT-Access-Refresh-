import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await api.post("/user/login", credentials);
      return response.data;
    },
  });
};
