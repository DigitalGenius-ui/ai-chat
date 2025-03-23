"use client";

import AuthWrapper from "@/Wrappers/AuthWrapper";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <ConvexProvider client={convex}>
        <AuthWrapper>{children}</AuthWrapper>
      </ConvexProvider>
    </Suspense>
  );
}
