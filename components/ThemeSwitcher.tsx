// app/components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { BiSolidMoon, BiSolidSun } from "react-icons/bi";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "dark"}
      color="primary"
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      startContent={<BiSolidMoon />}
      endContent={<BiSolidSun />}
    />
  );
}
