import { useTheme } from '../context/ThemeContext';

function ThemeSwitcher() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <label className="switch">
        <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
        />
        <span className="slider"></span>
        </label>
    )
}

export default ThemeSwitcher
