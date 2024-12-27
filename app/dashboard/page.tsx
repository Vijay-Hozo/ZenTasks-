"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
const page = () => {
  return (
    <section className="min-h-dvh w-full">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Add Task</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Create a new task to track its progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-sm font-medium text-gray-500">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  className="col-span-3  rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter task description"
                  className="col-span-3  rounded-md "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-sm font-medium text-gray-700">
                  Status
                </Label>
                <select id="status" className="col-span-3 rounded-md p-2 ">
                  <option value="">Select status</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <DialogFooter className="flex justify-end mt-4">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => console.log("Cancel")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-background text-foreground">
                Save Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex gap-4 my-2 justify-center">
        <div className="w-[250px] h-[150px] bg-black/40 rounded-xl relative">
          <p className="text-center text-sm font-light text-text tracking-widest">
            IN PROGRESS
          </p>
          <p className="text-9xl leading-[100px] font-bold absolute bottom-0 right-1  font-bricolage">
            {/* {totalMails > 9 ? totalMails : `0${totalMails}`} */}9
          </p>
        </div>
        <div className="w-[250px] h-[150px] bg-black/40 rounded-xl relative">
          <p className="text-center text-sm font-light text-text tracking-widest">
            PENDING
          </p>
          <p className="text-9xl leading-[100px] font-bold absolute bottom-0 right-1  font-bricolage">
            {/* {totalMails > 9 ? totalMails : `0${totalMails}`} */}9
          </p>
        </div>
        <div className="w-[250px] h-[150px] bg-black/40 rounded-xl relative">
          <p className="text-center text-sm font-light text-text tracking-widest">
            COMPLETED
          </p>
          <p className="text-9xl leading-[100px] font-bold absolute bottom-0 right-1  font-bricolage">
            {/* {totalMails > 9 ? totalMails : `0${totalMails}`} */}9
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Tabs
          defaultValue="inprogress"
          className="w-max flex flex-col justify-center my-4"
        >
          <TabsList>
            <TabsTrigger value="inprogress" className="w-[200px]">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="pending" className="w-[200px]">
              Pending
            </TabsTrigger>
            <TabsTrigger value="completed" className="w-[200px]">
              Completed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inprogress" className="w-full ">
            <div className="w-full bg-black/60 min-h-[100px] my-2 rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center ">
              <div className="self-start py-2">
                <h1>Title</h1>
                <p>Description</p>
              </div>
              <div>
                <input type="checkbox" name="" id="" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <div className="w-full bg-black/60 min-h-[100px] my-2 rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center ">
              <div className="self-start py-2">
                <h1>Title</h1>
                <p>Description</p>
              </div>
              <div>
                <input type="checkbox" name="" id="" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="w-full bg-black/60 min-h-[100px] my-2 rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center ">
              <div className="self-start py-2">
                <h1>Title</h1>
                <p>Description</p>
              </div>
              <div>
                <input type="checkbox" name="" id="" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
