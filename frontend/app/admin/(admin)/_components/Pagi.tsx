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
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Pagi = () => {
  const [now, setNow] = useState<number>(1);
  const arr = [2, 3, 4, 5];
  const max = 10;

  const isPrevDisabled = now === 1;
  const isNextDisabled = now === max;
  const next = () => {
    setNow(now + 1);
  };
  const previ = () => {
    if (now == 1) return;
    return setNow(now - 1);
  };
  const nowFunc = (ele: number) => {
    setNow(ele);
  };
  const pathName = usePathname();
  return (
    <Pagination className="justify-end w-full mr-10 ">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`#${now}`}
            onClick={isPrevDisabled ? undefined : previ}
            className={`rounded-full bg-white ${
              isPrevDisabled ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#1"
            isActive={now == 1}
            onClick={() => nowFunc(1)}
            className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
          >
            1
          </PaginationLink>
        </PaginationItem>
        {now >= 8 && (
          <PaginationItem>
            <PaginationEllipsis className={"rounded-full bg-white"} />
          </PaginationItem>
        )}
        {now <= 4 ? (
          arr.map((ele) => {
            return (
              <PaginationItem key={ele}>
                <PaginationLink
                  href={`#${ele}`}
                  isActive={now == ele}
                  onClick={() => nowFunc(ele)}
                  className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
                >
                  {ele}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : now <= 7 ? (
          <>
            <PaginationItem>
              <PaginationEllipsis className={"rounded-full bg-white"} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#10"
                onClick={() => nowFunc(now - 1)}
                className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
              >
                {now - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#10"
                isActive
                onClick={() => nowFunc(now)}
                className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
              >
                {now}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#10"
                onClick={() => nowFunc(now + 1)}
                className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
              >
                {now + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className={"rounded-full bg-white"} />
            </PaginationItem>
          </>
        ) : (
          arr.map((ele) => {
            return (
              <PaginationItem key={ele + 4}>
                <PaginationLink
                  href={`#${ele + 4}`}
                  isActive={now == ele + 4}
                  onClick={() => nowFunc(ele + 4)}
                  className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
                >
                  {ele + 4}
                </PaginationLink>
              </PaginationItem>
            );
          })
        )}
        {now >= 1 && now <= 4 && (
          <PaginationItem>
            <PaginationEllipsis className={"rounded-full bg-white"} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href="#10"
            isActive={now == 10}
            onClick={() => nowFunc(10)}
            className="
    rounded-full
    bg-white
    aria-[current=page]:bg-black
    aria-[current=page]:text-white
    aria-[current=page]:border-black
  "
          >
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`#${now}`}
            onClick={isNextDisabled ? undefined : next}
            className={`rounded-full bg-white ${
              isNextDisabled ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
