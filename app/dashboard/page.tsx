"use client";

import React, { useEffect, useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("in-progress");
  const [task, setTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [taskCounts, setTaskCounts] = useState<any>({
    "in-progress": 0,
    "not-started": 0,
    "completed": 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setTask((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks`);
      const result = await response.json();

      console.log("Tasks:", result.data);
      if (response.ok) {
        setTasks(result.data || []);

        const counts = result.data.reduce(
          (acc: Record<string, number>, task: Task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
          },
          { "in-progress": 0, "not-started": 0, completed: 0 }
        );
        setTaskCounts(counts);
      } else {
        console.error("Error fetching tasks:", result.error);
        setTasks([]);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [activeTab]);

  const handleEditTask = async () => {
    if (!task) return;
    if (!task.title || !task.status) {
      alert("Title and Status are required");
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Task updated:", result.message);
        alert("Task updated successfully.");
        fetchTasks();
      } else {
        console.log("Error updating task:", result.error);
        alert("Error in updating task.");
      }
    } catch (error) {
      console.log("Error updating task:", error);
    } finally {
      setEditDialogOpen(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        fetchTasks();
        alert("Task deleted successfully.");
      } else {
        console.log("Error deleting task:", result.error);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full flex gap-4 my-2 justify-center">
        {["in-progress", "not-started", "completed"].map((status, index) => (
          <div
            key={index}
            className="w-[250px] h-[150px] bg-black/40 rounded-xl relative"
          >
            <p className="text-center text-sm font-light text-text tracking-widest">
              {status.replace("-", " ").toUpperCase()}
            </p>
            <p className="text-9xl leading-[100px] font-bold absolute bottom-0 right-1 font-bricolage">
              {taskCounts[status] || 0}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Tabs
          defaultValue="in-progress"
          className="w-max flex flex-col justify-center my-4"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList>
            {["in-progress", "not-started", "completed"].map((value) => (
              <TabsTrigger key={value} value={value} className="w-[200px]">
                {value
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            {loading ? (
              <p>Loading...</p>
            ) : tasks.filter((task) => task.status === activeTab).length > 0 ? (
              tasks
                .filter((task) => task.status === activeTab)
                .map((task) => (
                  <div
                    key={task.id}
                    className="w-full bg-black/60 min-h-[100px] my-2 relative rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center"
                  >
                    <div className="self-start py-2">
                      <h1>{task.title}</h1>
                      <p>{task.description}</p>
                    </div>
                    <IconEdit
                      className="absolute right-1 top-1 h-4 w-4 cursor-pointer"
                      onClick={() => {
                        setTask(task);
                        setEditDialogOpen(true);
                      }}
                    />
                    <IconTrash
                      onClick={() => deleteTask(task.id)}
                      className="absolute right-6 top-1 h-4 w-4 cursor-pointer text-red-500"
                    />
                  </div>
                ))
            ) : (
              <p>No tasks found.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {editDialogOpen && task && (
        <div>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block font-medium text-sm">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={task.title}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block font-medium text-sm"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={task.description}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block font-medium text-sm">
                    Status
                  </label>
                  <div className="grid grid-cols-4 items-center gap-4">
              <select
                id="status"
                value={task.status}
                onChange={(e) => handleChange(e as any)}
                className="col-span-3 rounded-md p-2"
              >
                <option value="">Select status</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleEditTask}>Save</Button>
                <Button
                  variant="secondary"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
};

export default Page;