import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  onPageChange: (page: number) => void;
}

export default function PaginationLayout({
  pageIndex,
  pageSize,
  totalRow,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRow / pageSize);

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => pageIndex > 1 && onPageChange(pageIndex - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              isActive={i + 1 === pageIndex}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              pageIndex < totalPages && onPageChange(pageIndex + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
