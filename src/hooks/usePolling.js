import { useEffect, useRef } from 'react'

// callback should return a promise
export default function usePolling(callback, interval = 5000, enabled = true) {
  const saved = useRef()
  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) return
    let mounted = true
    let timer = null
    const run = async () => {
      if (!mounted) return
      try {
        await saved.current()
      } catch (e) {
        // ignore errors at hook level
      }
      timer = setTimeout(run, interval)
    }
    run()
    return () => {
      mounted = false
      if (timer) clearTimeout(timer)
    }
  }, [interval, enabled])
}
