"use client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { foodArr } from "./CataAdd";
import { api } from "@/lib/axios";
const formSchema = z.object({
  name: z.string(),
});
export type dataTypeMapToggle = {
  mapData: foodArr[];
  setMap: Dispatch<SetStateAction<foodArr[]>>;
  setAllstate: Dispatch<SetStateAction<boolean>>;
  allState: boolean;
};
export const ToggleCata = ({
  mapData,
  setMap,
  setAllstate,
  allState,
}: dataTypeMapToggle) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await api.post("/categories/create", {
      name: values.name,
    });
    form.reset();
  }
  return (
    <div className="flex flex-col gap-4 w-full  rounded-xl p-6 bg-white">
      <h1 className="text-[20px] font-semibold">Dishes category</h1>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className={`rounded-full ${allState ? "border-red-500" : ""}`}
          onClick={() => {
            setAllstate(!allState);
            setMap((prev) => prev.map((item) => ({ ...item, state: false })));
          }}
        >
          All Dishes
          <p className="flex items-center bg-black text-white rounded-full px-2  ">
            {mapData.reduce((sum, ele) => sum + ele.food.length, 0)}
          </p>
        </Button>
        {mapData.map((ele, i) => {
          return (
            <div className="flex items-center gap-2 bg-gray-200 p-1 rounded-2xl">
              <Button
                key={ele.id}
                variant="outline"
                className={`rounded-full ${ele.state ? "border-red-500" : ""}`}
                onClick={() => {
                  setMap((prev) =>
                    prev.map((item, idx) =>
                      idx === i ? { ...item, state: !item.state } : item
                    )
                  );
                  setAllstate(false);
                }}
              >
                {ele.name}
                <p className="flex items-center bg-black text-white rounded-full px-2  ">
                  {ele.food.length}
                </p>
              </Button>
              {ele.name != "Orphan" && (
                <Button
                  size={"icon"}
                  className="rounded-full border-red-500 w-8 h-8"
                  variant={"outline"}
                  onClick={async () =>
                    await api.delete("/categories/delete", {
                      data: { name: ele.name },
                    })
                  }
                >
                  <Trash2 className="text-red-500" />
                </Button>
              )}
            </div>
          );
        })}

        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="bg-red-500 rounded-full">
              <Plus className="text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md gap-10" showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
              <Button
                size="icon"
                variant={"outline"}
                className="absolute rounded-full right-4 top-4"
              >
                <X />
              </Button>
            </DialogClose>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category name</FormLabel>
                      <FormControl>
                        <Input placeholder="Type category name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  <DialogClose asChild>
                    <Button type="submit">Add category</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
