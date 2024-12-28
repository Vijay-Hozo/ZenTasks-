'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('in-progress'); // Track current tab

  const fetchTasksByStatus = async (status: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks?status=${status}`);
      const result = await response.json();

      if (response.ok) {
        setTasks(result.data || []);
      } else {
        console.error('Error fetching tasks:', result.error);
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksByStatus(activeTab); // Fetch tasks when the tab changes
  }, [activeTab]);

  return (
    <section className="min-h-dvh w-full">
      <div className="w-full flex justify-center">
        <Tabs
          defaultValue="inprogress"
          className="w-max flex flex-col justify-center my-4"
          onValueChange={(value) => setActiveTab(value)} // Track tab change
        >
          <TabsList>
            <TabsTrigger value="in-progress" className="w-[200px]">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="not-started" className="w-[200px]">
              Pending
            </TabsTrigger>
            <TabsTrigger value="completed" className="w-[200px]">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress">
            {loading ? (
              <p>Loading...</p>
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="w-full bg-black/60 min-h-[100px] my-2 rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center"
                >
                  <div className="self-start py-2">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                  </div>
                  <div>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </TabsContent>

          {/* Add content for other statuses */}
          <TabsContent value="not-started">
            {loading ? (
              <p>Loading...</p>
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="w-full bg-black/60 min-h-[100px] my-2 rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center"
                >
                  <div className="self-start py-2">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                  </div>
                  <div>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {loading ? (
              <p>Loading...</p>
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="w-full bg-black/60 min-h-[100px] my-2 rounded-md border-[1px] border-black/80 flex justify-between px-4 items-center"
                >
                  <div className="self-start py-2">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                  </div>
                  <div>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
