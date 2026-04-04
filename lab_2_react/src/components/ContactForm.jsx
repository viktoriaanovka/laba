import { useEffect, useState } from 'react';

function ContactForm({
  endpoint = 'https://formspree.io/f/ВАШ_ЕНДПОЙНТ',
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('reactFeedbackClosed') === 'true') {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  function closeModal() {
    setIsOpen(false);
    sessionStorage.setItem('reactFeedbackClosed', 'true');
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Закрити
        </button>

        <h2 className="text-2xl font-bold mb-4">Форма зворотного зв'язку</h2>

        <form action={endpoint} method="POST" className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефону"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
          <textarea
            name="message"
            placeholder="Ваше повідомлення"
            rows="5"
            required
            className="w-full border rounded-lg px-4 py-3"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Відправити
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;