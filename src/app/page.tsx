import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
import { paginateByCurrentPage } from "../utils/paginate-by-current-page";
// json-server doesn't add a pagination decorator for you, so here you go
const TOTAL_LENGTH = 50626;
const LIMIT = 15;

const pageNumbers = Array.from(
  { length: TOTAL_LENGTH / LIMIT },
  (_, i) => i + 1
);

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const accidents = (await fetch(
    `http://localhost:3030/accidents-stat?_page=${currentPage}&_limit=${LIMIT}`
  ).then((res) => res.json())) as AccidentStat[];
  const { isFirstPage, isLastPage, paginationNumbers } = paginateByCurrentPage(
    currentPage,
    pageNumbers
  );

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
              <TableCell>
                <Link href={`/${accident.id}`}>{accident.id}</Link>
              </TableCell>
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

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            {!isFirstPage && (
              <PaginationPrevious
                href={`?page=${currentPage - 1}`}
              ></PaginationPrevious>
            )}

            {paginationNumbers.map((pageNum) => (
              <PaginationLink
                key={pageNum}
                href={`?page=${pageNum}`}
                isActive={pageNum === currentPage}
              >
                {pageNum}
              </PaginationLink>
            ))}

            {!isLastPage && (
              <PaginationNext
                href={`?page=${currentPage + 1}`}
              ></PaginationNext>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      <p className="text-center mt-2">
        Page {currentPage} of {Math.ceil(TOTAL_LENGTH / LIMIT)}
      </p>
    </main>
  );
}
