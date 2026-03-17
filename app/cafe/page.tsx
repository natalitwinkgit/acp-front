import type { Metadata } from "next";
import CafePageContent from "./CafePageContent";

export const metadata: Metadata = {
  title: "Кафе | Автолюкс Черкаси-Плюс",
  description: "Сторінка кафе Автолюкс Черкаси-Плюс.",
};

export default function CafePage() {
  return <CafePageContent />;
}
