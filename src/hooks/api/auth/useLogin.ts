"use client";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "../../../lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

interface Response extends User {
  accessToken: string;
}
const useLogin = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();
  
  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login success");
      onAuthSuccess({ user: data, accessToken: data.accessToken });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useLogin;
