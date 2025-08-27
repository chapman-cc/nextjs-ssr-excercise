import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { ReactNode } from "react";

const SortIcon = ({ order }: { order?: string }): ReactNode => {
  if (order === "asc") {
    return <ChevronUpCircle className="inline float-right" />;
  }
  if (order === "desc") {
    return <ChevronDownCircle className="inline float-right" />;
  }

  return null;
};
export default SortIcon;
