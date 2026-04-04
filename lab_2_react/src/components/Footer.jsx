import { useEffect, useState } from 'react';

function Footer() {
  const [storageItems, setStorageItems] = useState([]);

  useEffect(() => {
    const systemInfo = {
      react_os_platform: navigator.platform || 'Невідомо',
      react_browser_userAgent: navigator.userAgent,
      react_browser_language: navigator.language,
    };

    Object.entries(systemInfo).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    setStorageItems(Object.entries(localStorage));
  }, []);

  return (
    <footer className="bg-slate-200 text-slate-800 py-5 px-6">
      <p className="text-center font-semibold mb-4">
        Email: viktoriaanovka532@gmail.com
      </p>

      <div>
        <h3 className="font-bold mb-2">Дані localStorage</h3>
        <ul className="list-disc pl-6 space-y-1">
          {storageItems.map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold">{key}:</span> {value}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;