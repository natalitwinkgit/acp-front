"use client";

import { useRouter } from "next/navigation";

type Props = { className?: string; ariaLabel?: string };

export default function ModalCloseButton({ className, ariaLabel = "Close" }: Props) {
  const router = useRouter();

  const close = () => {
    const background = sessionStorage.getItem("auth:background");
    sessionStorage.removeItem("auth:background");
    router.replace(background || "/");
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        close();
      }}
    >
      <img src="/icons/close-light.svg" alt="" />
    </button>
  );
}
