"use client";

import { useAuthStore } from "@/stores/auth";
import { FC, PropsWithChildren, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fromUnixTime, isAfter } from "date-fns";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkTokenValidity = () => {
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const tokenExpiry = fromUnixTime(decodedToken.exp!);

          if (isAfter(new Date(), tokenExpiry)) {
            clearAuth();
          }
        } catch (error) {
          clearAuth();
        }
      }
    };
    const interval = setInterval(checkTokenValidity, 15000); // 15 second

    return () => clearInterval(interval);
  }, [accessToken, clearAuth]);
  return <>{children}</>;
};
export default TokenProvider;
