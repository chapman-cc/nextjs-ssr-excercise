import Back from "@/components/customs/back";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <div className="space-y-2">
        <Back>
          <Button>Back</Button>
        </Back>
        <div>{children}</div>
      </div>
    </div>
  );
}
