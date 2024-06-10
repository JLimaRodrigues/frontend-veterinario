import { useState, useEffect } from 'react'

function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={theme === 'dark'} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  )
}

export default ThemeSwitcher
