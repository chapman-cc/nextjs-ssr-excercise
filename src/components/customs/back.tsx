"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function Back({ children }: PropsWithChildren) {
  const { back } = useRouter();
  return <div onClick={back}>{children}</div>;
}
