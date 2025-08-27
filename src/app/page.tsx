import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccidentStat } from "@/types/accident-stat";
import Link from "next/link";
// json-server doesn't add a pagination decorator for you, so here you go
const TOTAL_LENGTH = 50626;
const LIMIT = 20;

const pageNumbers = Array.from(
  { length: TOTAL_LENGTH / LIMIT },
  (_, i) => i + 1
);
export default function Home() {
  return (
    <main>
      <div>Hello world!</div>
    </main>
  );
}
