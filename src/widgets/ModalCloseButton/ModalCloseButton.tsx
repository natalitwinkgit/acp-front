"use client";

import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  ariaLabel?: string;
  onClose?: () => void;
};

export default function ModalCloseButton({ className, ariaLabel = "Close", onClose }: Props) {
  const router = useRouter();

  const fallbackClose = () => {
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
        if (onClose) {
          onClose();
          return;
        }

        fallbackClose();
      }}
    >
      <img src="/icons/close-light.svg" alt="" />
    </button>
  );
}
