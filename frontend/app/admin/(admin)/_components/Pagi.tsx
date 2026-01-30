"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction, useState } from "react";
import { orderWithCheckType } from "./TableComp";

type Props = {
  information: orderWithCheckType[];
  setPageNumber: Dispatch<SetStateAction<number>>;
};

export const Pagi = ({ information, setPageNumber }: Props) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(information.length / pageSize);
  const getPageNumbers = (
    current: number,
    total: number,
    delta = 1,
  ): (number | "ellipsis")[] => {
    const range: (number | "ellipsis")[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) {
      range.push("ellipsis");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push("ellipsis");
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  const pages = getPageNumbers(page, totalPages);

  return (
    <Pagination className="justify-end w-full mr-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              setPageNumber((p) => Math.max(1, p - 1));
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === p}
                onClick={() => {
                  setPage(p);
                  setPageNumber(p);
                }}
                className="
                  rounded-full bg-white
                  aria-[current=page]:bg-black
                  aria-[current=page]:text-white
                "
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1));
              setPageNumber((p) => Math.min(totalPages, p + 1));
            }}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
