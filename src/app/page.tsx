import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { Suspense } from "react";

// json-server doesn't add a pagination decorator for you, so here you go
const TOTAL_LENGTH = 50626;
const LIMIT = 15;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Separate component for the table data that will be streamed
async function AccidentsTable({ currentPage }: { currentPage: number }) {
  // Fetch paginated data from json-server
  const response = await fetch(
    `http://localhost:3030/accidents-stat?_page=${currentPage}&_limit=${LIMIT}`,
    {
      // Add cache configuration for optimal SSR performance
      cache: 'no-store', // Use 'force-cache' for static data or set revalidate
    }
  );

  // Handle errors
  if (!response.ok) {
    throw new Error(`Failed to fetch accidents: ${response.status} ${response.statusText}`);
  }

  const accidents: AccidentStat[] = await response.json();

  return (
    <TableBody>
      {accidents.map((accident) => (
        <TableRow key={accident.id} className="relative cursor-pointer hover:bg-muted/50">
          <TableCell>
            <Link href={`/${accident.id}`} prefetch={true} className="hover:underline">
              {accident.id}
            </Link>
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
  );
}

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;

  const pageNumbers = Array.from(
    { length: TOTAL_LENGTH / LIMIT },
    (_, i) => i + 1
  );
  
  const { isFirstPage, isLastPage, paginationNumbers } = paginateByCurrentPage(
    currentPage,
    pageNumbers
  );

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <main className="container mx-auto py-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Location (Borough)</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Casualties Count</TableHead>
          </TableRow>
        </TableHeader>
        <Suspense fallback={
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <span className="ml-2">Loading accidents...</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        }>
          <AccidentsTable currentPage={currentPage} />
        </Suspense>
      </Table>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            {/* Previous button */}
            <PaginationItem>
              {isFirstPage ? (
                <PaginationPrevious 
                  className="pointer-events-none opacity-50" 
                  href="#"
                />
              ) : (
                <PaginationPrevious href={`?page=${currentPage - 1}`} />
              )}
            </PaginationItem>

            {/* First page */}
            {!isFirstPage && firstPage < paginationNumbers[0] && (
              <>
                <PaginationItem>
                  <PaginationLink href={`?page=${firstPage}`} prefetch={true}>
                    {firstPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* Page numbers */}
            {paginationNumbers.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?page=${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Last page */}
            {!isLastPage && lastPage > paginationNumbers[paginationNumbers.length - 1] && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`?page=${lastPage}`}>
                    {lastPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Next button */}
            <PaginationItem>
              {isLastPage ? (
                <PaginationNext 
                  className="pointer-events-none opacity-50" 
                  href="#"
                />
              ) : (
                <PaginationNext href={`?page=${currentPage + 1}`} />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <p className="text-center text-sm text-muted-foreground mt-2">
          Page {currentPage} of {Math.ceil(TOTAL_LENGTH / LIMIT)}
        </p>
      </div>
    </main>
  );
}
