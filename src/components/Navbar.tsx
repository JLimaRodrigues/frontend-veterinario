import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'

function Navbar() {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl">
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <ThemeSwitcher />
    </nav>
  )
}

export default Navbar