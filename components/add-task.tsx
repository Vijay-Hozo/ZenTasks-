'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { createClient } from '../utils/supabase/client';

const AddTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
  });

  const handleChange = (e:any) => {
    const { id, value } = e.target;
    setTask((prev) => ({ ...prev, [id]: value }));
  };

  const saveTask = async () => {

    if (!task.title || !task.status) {
      alert('Title and Status are required');
      return;
    }

    const supabase = createClient();
    try {
      const { data, error } = await supabase.from('tasks').insert([task]);
      if (error) throw error;
      alert('Task added successfully');
      setTask({ title: '', description: '', status: '' }); 
    } catch (error:any) {
      console.error('Error adding task:', error.message);
      alert('Failed to add task');
    }
  };

  return (
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
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="col-span-3 rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm font-medium text-gray-700">
                Description
              </Label>
              <Input
                id="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="col-span-3 rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm font-medium text-gray-700">
                Status
              </Label>
              <select
                id="status"
                value={task.status}
                onChange={handleChange}
                className="col-span-3 rounded-md p-2"
              >
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
              onClick={() => setTask({ title: '', description: '', status: '' })}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={saveTask} 
            >
              Save Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
