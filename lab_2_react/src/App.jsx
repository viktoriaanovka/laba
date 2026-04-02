import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Languages from './components/Languages';
import Qualities from './components/Qualities';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <Header />
        <main className="p-6 space-y-6">
          <About />
          <Experience />
          <Skills />
          <Languages />
          <Qualities />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;