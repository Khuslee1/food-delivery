"use client";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
type orderWithCheckType = orderType & {
  checked: boolean;
};

type infoType = {
  check: boolean;
  idNumber: number;
  customer: string;
  food: string[];
  date: string;
  total: string;
  address: string;
  state: string;
  // createdAt: string;
  // orderItems: orderType[];
};

export const TableComp = () => {
  const [information, setInfo] = useState<orderWithCheckType[]>([]);
  const [stateMe, setState] = useState<string>("pending");
  const toggleCheck = (index: string, checked: boolean) => {
    setInfo((prev) =>
      prev.map((item, i) =>
        item._id === index ? { ...item, checked: checked } : item,
      ),
    );
    console.log(information);
  };
  const changeState = (checkedArr: orderWithCheckType[]) => {
    checkedArr.map((ele) => {
      setInfo((prev) =>
        prev.map((item, i) =>
          item._id === ele._id
            ? { ...item, status: stateMe, checked: false }
            : item,
        ),
      );
    });
  };
  const updateState = (index: string, value: string) => {
    setInfo((prev) =>
      prev.map((item) =>
        item._id === index ? { ...item, status: value } : item,
      ),
    );
  };

  const getOrders = async () => {
    const { data } = await api.get("/order/all");
    console.log(data);

    const ordersWithCheck = data.map((prev: orderType) => ({
      ...prev,
      checked: false,
    }));

    setInfo(ordersWithCheck);
  };

  useEffect(() => {
    getOrders();
  }, []);

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
          <Button className="rounded-full" variant={"outline"}>
            <CalendarDays />
            13 June 2023 - 14 July 2023
          </Button>
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
                {ele.orderItems.reduce((acc, item) => acc + item.price, 0)}$
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
