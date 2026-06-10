import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Read persisted preference; default = false (light mode)
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('jcs_dark_mode') === 'true'
    } catch {
      return false
    }
  })

  // Apply / remove 'dark' class on <html> whenever state changes
  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('jcs_dark_mode', String(dark))
    } catch { /* ignore */ }
  }, [dark])

  const toggleDark = useCallback(() => setDark(d => !d), [])

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
