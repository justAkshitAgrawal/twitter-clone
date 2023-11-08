"use client";

import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";

const FeedAnimateProvider = ({ children }: { children: React.ReactNode }) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="mt-10 grid grid-cols-1 gap-10" ref={parent}>
      {children}
    </div>
  );
};

export default FeedAnimateProvider;
