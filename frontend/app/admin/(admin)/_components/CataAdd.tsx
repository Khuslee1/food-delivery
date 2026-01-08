"use client";
import { Button } from "@/components/ui/button";
import { Image, Plus, X } from "lucide-react";
import { Cart } from "./Cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/axios";

const formSchema = z.object({
  foodName: z.string(),
  foodPrice: z.string(),
  dishCata: z.string(),
  ingre: z.string(),
  image: z.any(),
});
export type foodInfo = {
  foodName: string;
  price: number;
  foodId: string;
  overview: string;
  img: string;
};
export type foodArr = {
  name: string;
  state: boolean;
  id: string;
  food: foodInfo[];
};
export type propsType = {
  ell: foodInfo;
  mapData: foodArr[];
  ele: foodArr;
};
export type dataTypeMap = {
  mapData: foodArr[];
  setAllstate: Dispatch<SetStateAction<boolean>>;
  allState: boolean;
};

export const CataAdd = ({ mapData, setAllstate, allState }: dataTypeMap) => {
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const removeImg = () => {
    setPreview("");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      foodPrice: "",
      dishCata: "",
      ingre: "",
      // image: "",
    },
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.details || error.error}`);
        return;
      }

      const blob = await response.json();
      setPreview(blob.url);
      form.setValue("image", blob.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again");
    } finally {
      setUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await api.post("/foods/create", {
      name: values.foodName,
      price: values.foodPrice,
      ingredients: values.ingre,
      image: values.image,
      categoryId: values.dishCata,
    });
    form.reset();
    setPreview("");
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {mapData.map((ele) => {
        if (ele.state != false && !allState)
          return (
            <div
              key={ele.id}
              className="w-full flex flex-col gap-4 bg-white p-5"
            >
              <h1 className="text-[20px] font-semibold">
                {ele.name}({ele.food.length})
              </h1>
              <div className="w-full flex gap-4 flex-wrap">
                <div className="h-60.25 w-[19%] border border-[#EF4444] border-dashed flex items-center justify-center gap-6 flex-col rounded-xl">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" className="rounded-full bg-red-500">
                        {" "}
                        <Plus />
                      </Button>
                    </DialogTrigger>
                    <p>Add new Dish to {ele.name}</p>
                    <DialogContent showCloseButton={false} className="w-115">
                      <DialogTitle hidden></DialogTitle>
                      <DialogHeader className="font-semibold text-[18px]">
                        Add new Dish to Appetizers
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
                      <div>
                        {" "}
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <div className="w-full flex justify-between">
                              {" "}
                              <FormField
                                control={form.control}
                                name="foodName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Type food name"
                                        {...field}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="foodPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food price</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter price..."
                                        {...field}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name="dishCata"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col justify-between">
                                  <FormLabel>Dish category</FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue {...field} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mapData.map((ele) => {
                                          return (
                                            <SelectItem
                                              key={ele.id}
                                              value={`${ele.id}`}
                                            >
                                              <p className="rounded-full bg-[#F4F4F5] text-[12px] px-2.5 py-0.5 min-w-29 text-start">
                                                {ele.name}
                                              </p>
                                            </SelectItem>
                                          );
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="ingre"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ingredients</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="List ingredients..."
                                      className="h-22.5"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="image"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Food image</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      value={undefined}
                                      // onChange={(e) => {
                                      //   const file = e.target.files?.[0];
                                      //   if (!file) return;
                                      //   field.onChange(
                                      //     URL.createObjectURL(file)
                                      //   );
                                      //   if (file) {
                                      //     setPreview(URL.createObjectURL(file));
                                      //   }
                                      // }}
                                      onChange={handleUpload}
                                      className="h-22.5 z-1 opacity-0"
                                    />
                                  </FormControl>
                                  <FormMessage />

                                  <div className="mt-2 absolute w-[90%] rounded-md h-22.5 bottom-23 flex flex-col justify-center gap-2 items-center bg-[#d5dff5] border border-dashed border-[#2563EB] ">
                                    {preview ? (
                                      <>
                                        <img
                                          src={preview}
                                          alt="Preview"
                                          className="w-full h-22.5 object-cover rounded-md"
                                        />
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          className="rounded-full absolute right-2 top-2 z-2"
                                          onClick={() => removeImg()}
                                        >
                                          <X />
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                                          <Image className="h-4 w-4" />
                                        </div>
                                        <p>
                                          Choose a file or drag & drop it here
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </FormItem>
                              )}
                            />
                            <div className="flex w-full justify-end">
                              <Button type="submit">Submit</Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {ele.food.map((ell) => {
                  return (
                    <div key={ell.foodId + ele.id} className="h-60.25 w-[19%]">
                      <Cart ell={ell} mapData={mapData} ele={ele} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        if (allState)
          return (
            <div
              key={ele.id}
              className="w-full flex flex-col gap-4 bg-white p-5"
            >
              <h1 className="text-[20px] font-semibold">
                {ele.name}({ele.food.length})
              </h1>
              <div className="w-full flex gap-4 flex-wrap">
                <div className="h-60.25 w-[19%] border border-[#EF4444] border-dashed flex items-center justify-center gap-6 flex-col rounded-xl">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" className="rounded-full bg-red-500">
                        {" "}
                        <Plus />
                      </Button>
                    </DialogTrigger>
                    <p>Add new Dish to {ele.name}</p>
                    <DialogContent showCloseButton={false} className="w-115">
                      <DialogTitle hidden></DialogTitle>
                      <DialogHeader className="font-semibold text-[18px]">
                        Add new Dish to Appetizers
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
                      <div>
                        {" "}
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <div className="w-full flex justify-between">
                              {" "}
                              <FormField
                                control={form.control}
                                name="foodName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Type food name"
                                        {...field}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="foodPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food price</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter price..."
                                        {...field}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name="dishCata"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col justify-between">
                                  <FormLabel>Dish category</FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue {...field} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mapData.map((ele) => {
                                          return (
                                            <SelectItem
                                              key={ele.id}
                                              value={`${ele.id}`}
                                            >
                                              <p className="rounded-full bg-[#F4F4F5] text-[12px] px-2.5 py-0.5 min-w-29 text-start">
                                                {ele.name}
                                              </p>
                                            </SelectItem>
                                          );
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="ingre"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ingredients</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="List ingredients..."
                                      className="h-22.5"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="image"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Food image</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      value={undefined}
                                      // onChange={(e) => {
                                      //   const file = e.target.files?.[0];
                                      //   if (!file) return;
                                      //   field.onChange(
                                      //     URL.createObjectURL(file)
                                      //   );
                                      //   if (file) {
                                      //     setPreview(URL.createObjectURL(file));
                                      //   }
                                      // }}
                                      onChange={handleUpload}
                                      className="h-22.5 z-1 opacity-0"
                                    />
                                  </FormControl>
                                  <FormMessage />

                                  <div className="mt-2 absolute w-[90%] rounded-md h-22.5 bottom-23 flex flex-col justify-center gap-2 items-center bg-[#d5dff5] border border-dashed border-[#2563EB] ">
                                    {preview ? (
                                      <>
                                        <img
                                          src={preview}
                                          alt="Preview"
                                          className="w-full h-22.5 object-cover rounded-md"
                                        />
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          className="rounded-full absolute right-2 top-2 z-2"
                                          onClick={() => removeImg()}
                                        >
                                          <X />
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                                          <Image className="h-4 w-4" />
                                        </div>
                                        <p>
                                          Choose a file or drag & drop it here
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </FormItem>
                              )}
                            />
                            <div className="flex w-full justify-end">
                              <DialogClose asChild>
                                <Button type="submit">Submit</Button>
                              </DialogClose>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {ele.food.map((ell) => {
                  return (
                    <div key={ell.foodId + ele.id} className="h-60.25 w-[19%]">
                      <Cart ell={ell} mapData={mapData} ele={ele} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
      })}
    </div>
  );
};
