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
const useForgotPassword = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Pick<User, "email">) => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("Send email success, please check your email");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useForgotPassword;
