import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccidentStat } from "@/types/accident-stat";
import { createHrefQueryHoc } from "@/utils/create-href-query";
import Link from "next/link";
import { notFound } from "next/navigation";
import SearchBar from "./_components/search-bar";
import SortIcon from "./_components/sort-icon";
import { getSortQuery as sortQ } from "./_utils/get-sort-queries";
import { PageParams } from "./types";

// json-server doesn't add a pagination decorator for you, so here you go
const TOTAL_LENGTH = 50626;
const LIMIT = 15;

const pageNumbers = Array.from(
  { length: TOTAL_LENGTH / LIMIT },
  (_, i) => i + 1
);

interface Props {
  searchParams: Promise<PageParams>;
}

export default async function Home({ searchParams }: Props) {
  const queries = await searchParams;
  const _page = queries._page || 1;
  const _limit = queries._limit || LIMIT;
  const _sort = queries._sort;
  const _order = queries._order;
  const _location = queries._loc ? decodeURI(queries._loc) : undefined;

  const search = new URLSearchParams({
    _page: String(_page),
    _limit: String(_limit),
  });
  if (_sort) {
    search.set("_sort", _sort);
    search.set("_order", _order || "asc");
  }
  if (_location) {
    search.set("location_like", _location);
    search.set("borough_like", _location);
  }

  const response = await fetch(
    `http://localhost:3030/accidents-stat?${search.toString()}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error("Unknown error");
  }

  const accidents = (await response.json()) as AccidentStat[];

  const q = createHrefQueryHoc(queries);

  return (
    <main className="space-y-5 mt-4 mx-8">
      <SearchBar />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Link href={{ query: q(sortQ("id", _order)) }}>
                ID {_sort === "id" && <SortIcon order={_order} />}
              </Link>
            </TableHead>
            <TableHead>
              <Link href={{ query: q(sortQ("location", _order)) }}>
                Location (Borough){" "}
                {_sort === "location" && <SortIcon order={_order} />}
              </Link>
            </TableHead>
            <TableHead>
              <Link href={{ query: q(sortQ("date", _order)) }}>
                Date {_sort === "date" && <SortIcon order={_order} />}
              </Link>
            </TableHead>
            <TableHead>
              <Link href={{ query: q(sortQ("serverity", _order)) }}>
                Serverity {_sort === "severity" && <SortIcon order={_order} />}
              </Link>
            </TableHead>
            <TableHead>
              <Link
                href={{
                  query: q(sortQ("casualties.length", _order)),
                }}
              >
                Casualties Count{" "}
                {_sort === "casualties.length" && <SortIcon order={_order} />}
              </Link>
            </TableHead>
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
        Page {_page} of {_location ? "?" : pageNumbers.length}
      </p>
    </main>
  );
}
