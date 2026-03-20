"use client";

import { useRouter } from "next/navigation";
import { closeAuthRoute } from "@/src/shared/auth-flow";

type Props = {
  className?: string;
  ariaLabel?: string;
  onClose?: () => void;
};

export default function ModalCloseButton({ className, ariaLabel = "Close", onClose }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClose) {
          onClose();
          return;
        }

        closeAuthRoute(router);
      }}
    >
      <img src="/icons/close-light.svg" alt="" />
    </button>
  );
}
