import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  paginations: ReactNode;
};
export default function layout({ children, paginations }: Props) {
  return (
    <>
      {children}
      {paginations}
    </>
  );
}
