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
import { useState } from "react";
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

type infoType = {
  check: boolean;
  idNumber: number;
  customer: string;
  food: string[];
  date: string;
  total: string;
  address: string;
  state: string;
};

export const TableComp = () => {
  const [information, setInfo] = useState<infoType[]>([
    {
      check: false,
      idNumber: 0,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 1,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 2,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 3,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 4,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 5,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 6,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 7,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 8,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },

    {
      check: false,
      idNumber: 9,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 10,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 11,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 12,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
    {
      check: false,
      idNumber: 13,
      customer: "test@gmail.com",
      food: ["lalar", "jinga"],
      date: "2024/13/13",
      total: "123$",
      address:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
      state: "pending",
    },
  ]);
  const [stateMe, setState] = useState<string>("pending");
  const toggleCheck = (index: number, checked: boolean) => {
    setInfo((prev) =>
      prev.map((item, i) => (i === index ? { ...item, check: checked } : item))
    );
    console.log(information);
  };
  const changeState = (checkedArr: infoType[]) => {
    checkedArr.map((ele) => {
      setInfo((prev) =>
        prev.map((item, i) =>
          i === ele.idNumber ? { ...item, state: stateMe, check: false } : item
        )
      );
    });
  };
  const updateState = (index: number, value: string) => {
    setInfo((prev) =>
      prev.map((item, i) => (i === index ? { ...item, state: value } : item))
    );
  };

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
                  {information.filter((el) => el.check).length}
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
                      changeState(information.filter((ele) => ele.check));
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
              key={ele.idNumber}
              className={`${!ele.check ? "" : "bg-[#E4E4E7]"}`}
            >
              <TableCell className="w-12">
                <div>
                  {" "}
                  <Checkbox
                    className="border-[#18181B]"
                    checked={ele.check}
                    onCheckedChange={(val) =>
                      toggleCheck(ele.idNumber, val === true)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="w-14 text-[#18181B]">
                {ele.idNumber}
              </TableCell>
              <TableCell className="w-50">{ele.customer}</TableCell>
              <TableCell className="w-50   ">
                <Popover>
                  <PopoverTrigger className="w-full">
                    <div className="justify-between items-center flex ">
                      {ele.food.length} foods
                      <span>
                        <ChevronDown className="w-4 h-4" />{" "}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <SmallCart />
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="w-50">{ele.date}</TableCell>
              <TableCell className="w-50">{ele.total}</TableCell>

              <TableCell className="w-220 whitespace-normal line-clamp-2">
                {ele.address}
              </TableCell>
              <TableCell className="w-50">
                <Select
                  value={ele.state}
                  onValueChange={(val) => updateState(i, val)}
                >
                  <SelectTrigger
                    className={`min-w-23.5 h-8 rounded-full text-black ${
                      ele.state === "pending"
                        ? "border border-red-500"
                        : ele.state === "delivered"
                        ? "border border-green-500"
                        : ele.state === "cancelled"
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
