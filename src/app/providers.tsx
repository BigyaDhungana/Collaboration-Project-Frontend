// app/providers.tsx
"use client";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}
