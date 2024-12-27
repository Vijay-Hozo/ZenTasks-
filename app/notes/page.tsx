'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('tasks').select("*")
      if (error) {
        setError(error.message)
      } else {
        setNotes(data)
      }
      setLoading(false)
    }
    getData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
