import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/api";

export const useRegisterUser = () => {
  return useMutation(
    ({ email, password }: { email: string; password: string }) =>
      userService.register(email, password)
  );
};
