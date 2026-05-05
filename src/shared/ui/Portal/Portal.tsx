"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Portal({ children }: Props) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
