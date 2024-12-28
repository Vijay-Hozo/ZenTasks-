import { createClient } from '@/utils/supabase/server';
import React from 'react'
import AddTask from './add-task';

const DashHeader = async () => {

    const supabase = await createClient();

    const {
        data: { user },
      } = await supabase.auth.getUser();

  return (
    <div className='w-full flex justify-between mb-12'>
        <p className='text-xl'>Hey, {user?.email}!</p>
        <AddTask />
    </div>
  )
}

export default DashHeader