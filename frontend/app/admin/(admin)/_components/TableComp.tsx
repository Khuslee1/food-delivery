"use client";
import * as React from "react";
import { type DateRange } from "react-day-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, ChevronDown, ChevronsUpDown, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmallCart } from "./SmallCart";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { api } from "@/lib/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { addDays } from "date-fns";
export type foodType = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  categoryId: string;
  quantity: number;
  foodId: { name: string; image: string };
};
type userType = {
  address: string;
  createdAt: string;
  email: string;
  role: string;
  updatedAt: string;
  _id: string;
};

export type orderType = {
  address: string;
  createdAt: string;
  orderItems: foodType[] & { quantity: number; price: number };
  quantity: number;
  _id: string;
  status: string;
  updatedAt: string;
  userId: userType;
};
export type orderWithCheckType = orderType & {
  checked: boolean;
};

type propsType = {
  information: orderWithCheckType[];
  setInfo: Dispatch<SetStateAction<orderWithCheckType[]>>;
  setFilter: Dispatch<
    SetStateAction<{
      gt: string | undefined;
      lt: string | undefined;
    }>
  >;
};

export const TableComp = ({ information, setInfo, setFilter }: propsType) => {
  const [stateMe, setState] = useState<string>("pending");
  const toggleCheck = (index: string, checked: boolean) => {
    setInfo((prev) =>
      prev.map((item, i) =>
        item._id === index ? { ...item, checked: checked } : item,
      ),
    );
    console.log(information);
  };
  const changeState = async (checkedArr: orderWithCheckType[]) => {
    checkedArr.map((ele) => {
      setInfo((prev) =>
        prev.map((item, i) =>
          item._id === ele._id
            ? { ...item, status: stateMe, checked: false }
            : item,
        ),
      );
    });
    const orderIds = checkedArr.map((order) => order._id);
    await api.patch("/order/status", {
      orderIds: orderIds,
      status: stateMe,
    });
  };
  const updateState = async (index: string, value: string) => {
    setInfo((prev) =>
      prev.map((item) =>
        item._id === index ? { ...item, status: value } : item,
      ),
    );
    await api.patch("/order/status", {
      orderIds: [index],
      status: value,
    });
  };
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  return (
    <div className="w-full rounded-lg">
      <div className="w-full h-19 bg-white rounded-t-lg p-4 flex justify-between">
        <h1 className="text-[20px] font-bold flex flex-col">
          Orders
          <span className="text-[#71717A] text-[12px] font-normal">
            {information.length} items
          </span>
        </h1>
        <div className="flex gap-3">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" variant={"outline"}>
                <CalendarDays />
                {String(dateRange?.from).split("00")[0]} -
                {String(dateRange?.to).split("00")[0]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-2 bg-gray-300 rounded-xl border border-gray-300 ">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date: any) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                className="rounded-xl"
              />
              <DropdownMenuItem onClick={() => setOpen(false)}>
                <Button
                  className="m-3"
                  onClick={() => {
                    setFilter({
                      gt: dateRange?.from?.toISOString(),
                      lt: dateRange?.to?.toISOString(),
                    });
                  }}
                >
                  Filter
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                Change delivery state{" "}
                <p className="rounded-full bg-white text-black px-2">
                  {information.filter((el) => el.checked).length}
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-fit gap-6" showCloseButton={false}>
              <DialogHeader>
                <div className="flex justify-between items-center pb-4">
                  <DialogTitle>Change delivery state</DialogTitle>
                  <DialogClose asChild>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      <X />
                    </Button>
                  </DialogClose>
                </div>

                <div className="flex w-full gap-4">
                  <Button
                    variant={"secondary"}
                    className={`rounded-full text-[12px] ${
                      stateMe == "delivered"
                        ? "text-red-500 border border-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      setState("delivered");
                    }}
                  >
                    Delivered{" "}
                  </Button>
                  <Button
                    variant={"secondary"}
                    className={`rounded-full  text-[12px] ${
                      stateMe == "pending"
                        ? "text-red-500 border border-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      setState("pending");
                    }}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={"secondary"}
                    className={`rounded-full  text-[12px] ${
                      stateMe == "cancelled"
                        ? "text-red-500 border border-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      setState("cancelled");
                    }}
                  >
                    Cancelled
                  </Button>
                </div>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-full rounded-full"
                    onClick={() => {
                      changeState(information.filter((ele) => ele.checked));
                    }}
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>{" "}
      <Table className="w-full bg-white text-[#71717A] rounded-lg">
        <TableHeader className="w-full bg-[#E4E4E7]">
          <TableRow>
            <TableHead className="w-12">
              <div>
                <Checkbox className="border-[#18181B]" />
              </div>
            </TableHead>
            <TableHead className="w-14 text-[#18181B]">№</TableHead>
            <TableHead className="w-60 text-[#71717A]">Customer</TableHead>
            <TableHead className="w-50 text-[#71717A]">Food</TableHead>
            <TableHead className="w-50 text-[#71717A] flex justify-between items-center">
              Date <ChevronsUpDown className="w-4 h-4" />
            </TableHead>
            <TableHead className="w-50 text-[#71717A]">Total</TableHead>
            <TableHead className="w-200 whitespace-normal text-[#71717A]">
              Delivery Address
            </TableHead>
            <TableHead className="w-50 flex gap-2 items-center">
              Delivery state <ChevronsUpDown className="w-4 h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {information.map((ele, i) => (
            <TableRow
              key={ele._id}
              className={`${!ele.checked ? "" : "bg-[#E4E4E7]"}`}
            >
              <TableCell className="w-12">
                <div>
                  {" "}
                  <Checkbox
                    className="border-[#18181B]"
                    checked={ele.checked}
                    onCheckedChange={(val) =>
                      toggleCheck(ele._id, val === true)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="w-14 text-[#18181B]">{i + 1}</TableCell>
              <TableCell className="w-50">{ele.userId.email}</TableCell>
              <TableCell className="w-50   ">
                <Popover>
                  <PopoverTrigger className="w-full">
                    <div className="justify-between items-center flex ">
                      {ele.orderItems.length} foods
                      <span>
                        <ChevronDown className="w-4 h-4" />{" "}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-0.5">
                    {ele.orderItems.map((el) => {
                      return <SmallCart el={el} />;
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="w-50">
                {ele.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="w-50">
                {ele.orderItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                )}
                $
              </TableCell>

              <TableCell className="w-220 whitespace-normal line-clamp-2">
                {ele.address}
              </TableCell>
              <TableCell className="w-50">
                <Select
                  value={ele.status}
                  onValueChange={(val) => updateState(ele._id, val)}
                >
                  <SelectTrigger
                    className={`min-w-23.5 h-8 rounded-full text-black ${
                      ele.status === "pending"
                        ? "border border-red-500"
                        : ele.status === "delivered"
                          ? "border border-green-500"
                          : ele.status === "cancelled"
                            ? "border border-gray-400"
                            : ""
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
