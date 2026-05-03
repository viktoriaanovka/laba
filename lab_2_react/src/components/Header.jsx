function Header({ theme, onToggleTheme }) {
  return (
    <header className="bg-blue-700 text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-2">дЯновка Вікторія</h1>
      <p className="text-lg">
        Студентка Національного університету "Львівська політехніка"
      </p>
      <p className="text-md mt-2 opacity-90">Спеціальність: Кібербезпека</p>

      <button
        type="button"
        onClick={onToggleTheme}
        className="mt-5 bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition"
      >
        {theme === 'dark' ? 'Увімкнути денну тему' : 'Увімкнути нічну тему'}
      </button>
    </header>
  );
}

export default Header;
