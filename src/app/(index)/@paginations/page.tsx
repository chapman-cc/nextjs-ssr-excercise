import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { createHrefQueryHoc } from "@/utils/create-href-query";
import Link from "next/link";
import { PageParams } from "../types";
import { paginateByCurrentPage } from "./_utils/paginate-by-current-page";

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

  const currentPage = parseInt(queries._page || "1");

  const { isFirstPage, isLastPage, paginationSliced } = paginateByCurrentPage(
    currentPage,
    pageNumbers
  );

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  const q = createHrefQueryHoc(queries);

  return (
    <Pagination>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <Link href={{ query: q({ _page: currentPage - 1 }) }}>
              <Button variant="outline">Prev</Button>
            </Link>
          </PaginationItem>
        )}

        {paginationSliced[0] !== firstPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {paginationSliced.map((_page) => (
          <PaginationItem
            key={_page}
            className={_page === currentPage ? "font-extrabold" : undefined}
          >
            <Link href={{ query: q({ _page }) }}>
              <Button variant={_page === currentPage ? "default" : "outline"}>
                {_page}
              </Button>
            </Link>
          </PaginationItem>
        ))}
        {paginationSliced[paginationSliced.length - 1] !== lastPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!isLastPage && (
          <PaginationItem>
            <Link href={{ query: q({ _page: currentPage + 1 }) }}>
              <Button variant="outline">Next</Button>
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
