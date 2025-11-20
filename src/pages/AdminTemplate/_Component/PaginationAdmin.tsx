import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Ellipsis } from "lucide-react";

type PaginationAdmin = {
  infoPagi: {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
  };
  handlePagi: (data: number) => void;
};

export function PaginationAdmin({ infoPagi, handlePagi }: PaginationAdmin) {
  const { pageIndex, pageSize, totalRow } = infoPagi;
  const totalPagi = Math.ceil(totalRow / pageSize);
  const nextPagi = pageIndex + 1;
  const prevPagi = pageIndex - 1;

  return (
    <Pagination>
      <PaginationContent>
        {pageIndex > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="px-[10px]!"
                onClick={() => handlePagi(prevPagi)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => handlePagi(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {pageIndex > 2 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePagi(prevPagi)}>
              {prevPagi}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Active current */}
        {pageIndex && (
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {pageIndex}
            </PaginationLink>
          </PaginationItem>
        )}

        {pageIndex < totalPagi && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePagi(nextPagi)}>
              {nextPagi}
            </PaginationLink>
          </PaginationItem>
        )}

        {totalPagi >= 4 && pageIndex < totalPagi - 2 && (
          <PaginationItem className="mr-1">
            <Ellipsis className="size-4" />
          </PaginationItem>
        )}

        {pageIndex < totalPagi - 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePagi(totalPagi)}>
              {totalPagi}
            </PaginationLink>
          </PaginationItem>
        )}

        {pageIndex < totalPagi && (
          <PaginationItem>
            <PaginationNext
              href="#"
              className="px-[10px]!"
              onClick={() => handlePagi(nextPagi)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
