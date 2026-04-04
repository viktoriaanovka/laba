import { useEffect, useState } from 'react';

function Reviews({ variant = 1 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${variant}/comments`
        );

        if (!response.ok) {
          throw new Error('Не вдалося отримати відгуки');
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [variant]);

  return (
    <section className="bg-slate-50 p-5 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Відгуки попередніх роботодавців
      </h2>

      {loading && <p>Завантаження відгуків...</p>}
      {error && <p className="text-red-600">Помилка: {error}</p>}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border-l-4 border-blue-600 p-4 rounded-lg shadow-sm"
          >
            <h3 className="font-bold">{review.name}</h3>
            <p className="text-sm text-slate-500 mb-2">{review.email}</p>
            <p>{review.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;