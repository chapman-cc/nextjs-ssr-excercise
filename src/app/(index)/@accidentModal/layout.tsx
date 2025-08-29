import { Dialog } from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return <Dialog open>{children}</Dialog>;
}
