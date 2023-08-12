'use client';

import { useEffect, useState } from 'react';
import { MdAdd as AddTaskIcon } from 'react-icons/md';

import BottomSheet from '@/common/components/BottomSheet';
import { useTaskStore } from '@/common/store/task';

import AddEditTask from './AddEditTask';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useTaskStore();

  const [isOpen, setOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  const renderLoading = () => null;

  useEffect(() => {
    setMounted(true);
  }, [tasks]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 65 || event.keyCode === 97) {
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='pt-6 px-6 pb-28 space-y-5'>
      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-lg text-neutral-700 dark:text-neutral-300'>
          Today's Task
        </h2>
        <button
          onClick={() => setOpen(true)}
          className='py-2 px-3 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center gap-1 hover:shadow-sm'
        >
          <AddTaskIcon size={18} />
          <span className='text-sm'>New Task</span>
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        {isMounted
          ? tasks?.map((task, index) => <TaskItem key={index} {...task} />)
          : renderLoading()}
      </div>

      <BottomSheet title='Add New Task' isOpen={isOpen} onClose={setOpen}>
        <AddEditTask action='add' onSave={() => setOpen(false)} />
      </BottomSheet>
    </div>
  );
};

export default TaskList;
