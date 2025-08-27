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
import { notFound } from "next/navigation";
import { paginateByCurrentPage } from "../utils/paginate-by-current-page";
import SearchBar from "./components/search-bar";

// json-server doesn't add a pagination decorator for you, so here you go
const TOTAL_LENGTH = 50626;
const LIMIT = 15;

const pageNumbers = Array.from(
  { length: TOTAL_LENGTH / LIMIT },
  (_, i) => i + 1
);

export type PageParams = {
  _page?: string;
  _limit?: string;
  _loc?: string;
};

interface Props {
  searchParams: Promise<PageParams>;
}

export default async function Home({ searchParams }: Props) {
  const queries = await searchParams;
  const _page = queries._page || "1";
  const _limit = (queries._limit = "" + LIMIT);
  const _location = queries._loc ? decodeURI(queries._loc) : undefined;

  const search = new URLSearchParams({ _page, _limit });
  if (_location) {
    search.set("location_like", _location);
    search.set("borough_like", _location);
  }

  const response = await fetch(
    `http://localhost:3030/accidents-stat?${search.toString()}`
  );

  const currentPage = parseInt(_page);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error("Unknown error");
  }

  const accidents = (await response.json()) as AccidentStat[];

  const { isFirstPage, isLastPage, paginationNumbers } = paginateByCurrentPage(
    currentPage,
    pageNumbers
  );

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <main className="space-y-5 mt-4 mx-8">
      <SearchBar />

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
                <Link href={`/${accident.id}`}>
                  {accident.location} ({accident.borough})
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/${accident.id}`}>{accident.date}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/${accident.id}`}>{accident.severity}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/${accident.id}`}>
                  {accident.casualties.length}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p>
        Page {currentPage} of {_location ? "?" : pageNumbers.length}
      </p>
      <Pagination>
        <PaginationContent>
          {!isFirstPage && (
            <PaginationItem>
              <Link href={{ query: { ...queries, _page: currentPage - 1 } }}>
                <Button variant="outline">Prev</Button>
              </Link>
            </PaginationItem>
          )}

          {paginationNumbers[0] !== firstPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {paginationNumbers.map((_page) => (
            <PaginationItem
              key={_page}
              className={currentPage === _page ? "font-extrabold" : undefined}
            >
              <Link href={{ query: { ...queries, _page } }}>
                <Button variant={_page === currentPage ? "default" : "outline"}>
                  {_page}
                </Button>
              </Link>
            </PaginationItem>
          ))}
          {paginationNumbers[paginationNumbers.length - 1] !== lastPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {!isLastPage && (
            <PaginationItem>
              <Link href={{ query: { ...queries, _page: currentPage + 1 } }}>
                <Button variant="outline">Next</Button>
              </Link>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
}
