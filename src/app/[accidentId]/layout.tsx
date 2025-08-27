"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <div className="space-y-2">
        <Button onClick={router.back}>Back</Button>
        <div>{children}</div>
      </div>
    </div>
  );
}
