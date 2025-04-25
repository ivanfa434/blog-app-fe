"use client";

import { FC, PropsWithChildren, Suspense } from "react";

const NuqsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsProvider>
      <Suspense>{children}Í</Suspense>
    </NuqsProvider>
  );
};

export default NuqsProvider;
