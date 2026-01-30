"use client";
import { useEffect, useState } from "react";
import { Pagi } from "./_components/Pagi";
import { Profile } from "./_components/Profile";
import {
  orderType,
  orderWithCheckType,
  TableComp,
} from "./_components/TableComp";
import { api } from "@/lib/axios";

export default function Home() {
  const [information, setInfo] = useState<orderWithCheckType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filter, setFilter] = useState<{
    gt: string | undefined;
    lt: string | undefined;
  }>({
    gt: "",
    lt: "",
  });
  const pageSize = 10;
  const getOrders = async () => {
    const { data } = await api.get("/order/all", {
      params: {
        ...(filter.gt && { gt: filter.gt }),
        ...(filter.lt && { lt: filter.lt }),
      },
    });

    const ordersWithCheck = data.map((prev: orderType) => ({
      ...prev,
      checked: false,
    }));

    setInfo(ordersWithCheck);
  };

  useEffect(() => {
    getOrders();
  }, [filter]);
  return (
    <div className="w-full flex flex-col gap-10 bg-[#E4E4E7] px-7">
      <Profile />
      <TableComp
        information={information.slice(
          (pageNumber - 1) * pageSize,
          pageNumber * pageSize,
        )}
        setInfo={setInfo}
        setFilter={setFilter}
      />
      <Pagi information={information} setPageNumber={setPageNumber} />
    </div>
  );
}
