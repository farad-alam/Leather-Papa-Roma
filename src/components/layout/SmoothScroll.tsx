"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, /* Smaller lerp means smoother/slower */
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1,
    }}>
      {children}
    </ReactLenis>
  );
}
