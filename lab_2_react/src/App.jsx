import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Languages from './components/Languages';
import Qualities from './components/Qualities';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';

function App() {
  const [theme, setTheme] = useState('light');
  const variant = 1; // заміни 1 на свій номер у журналі

  useEffect(() => {
    const savedTheme = localStorage.getItem('react_theme');
    const hour = new Date().getHours();
    const autoTheme = hour >= 7 && hour < 21 ? 'light' : 'dark';

    setTheme(savedTheme || autoTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('react_theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  const isDark = theme === 'dark';

  return (
    <div
      className={
        isDark
          ? 'min-h-screen bg-slate-900 text-slate-100 py-8 px-4 transition'
          : 'min-h-screen bg-slate-100 text-slate-900 py-8 px-4 transition'
      }
    >
      <div
        className={
          isDark
            ? 'max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-xl overflow-hidden'
            : 'max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'
        }
      >
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main className="p-6 space-y-6">
          <About />
          <Experience />
          <Skills />
          <Languages />
          <Qualities />
          <Reviews variant={variant} />
        </main>

        <Footer />
      </div>

      <ContactForm endpoint="https://formspree.io/f/ВАШ_ЕНДПОЙНТ" />
    </div>
  );
}

export default App;