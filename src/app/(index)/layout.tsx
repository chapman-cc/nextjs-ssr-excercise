import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  paginations: ReactNode;
  accidentModal: ReactNode;
};
export default function layout({
  children,
  paginations,
  accidentModal,
}: Props) {
  return (
    <>
      {children}
      {paginations}
      {accidentModal}
    </>
  );
}
