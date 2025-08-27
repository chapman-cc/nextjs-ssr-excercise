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
const LIMIT = 15;

const pageNumbers = Array.from(
  { length: TOTAL_LENGTH / LIMIT },
  (_, i) => i + 1
);
export default function Home() {
  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Location (Borough)</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Serverity</TableHead>
            <TableHead>Casualties Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accidents.map((accident) => (
            <TableRow key={accident.id}>
              <TableCell>{accident.id}</TableCell>
              <TableCell>
                {accident.location} ({accident.borough})
              </TableCell>
              <TableCell>{accident.date}</TableCell>
              <TableCell>{accident.severity}</TableCell>
              <TableCell>{accident.casualties.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p>
        Page 1 of 3375
      </p>
      {/* <Pagination></Pagination */}
    </main>
  );
}
