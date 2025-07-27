import React, { useState, useEffect } from 'react';

function HabitTracker() {
  const [habit, setHabit] = useState('');
  const [habitList, setHabitList] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Load habits from localStorage on initial render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('habits'));
    if (stored) setHabitList(stored);
  }, []);

  // Save to localStorage whenever habit list changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habitList));
  }, [habitList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = habit.trim();
    if (!trimmed) return;

    if (habitList.includes(trimmed)) {
      setSuccessMsg('Habit already exists!');
      return;
    }

    // Add locally
    const updatedList = [...habitList, trimmed];
    setHabitList(updatedList);
    setHabit('');
    setSuccessMsg('Habit added!');
    setTimeout(() => setSuccessMsg(''), 2000);
    setCurrentPage(Math.ceil(updatedList.length / itemsPerPage)); // move to last page

    // Send to backend
    try {
      const res = await fetch('http://localhost:5000/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });

      if (!res.ok) {
        console.error('Backend rejected habit');
      }
    } catch (err) {
      console.error('Error connecting to backend:', err);
    }
  };

  const handleDelete = (index) => {
    const updated = [...habitList];
    updated.splice(index, 1);
    setHabitList(updated);
    if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= updated.length) {
      setCurrentPage(currentPage - 1);
    }
  };

  const start = (currentPage - 1) * itemsPerPage;
  const visibleHabits = habitList.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(habitList.length / itemsPerPage);

  return (
    <section>
      <h2>Track a Habit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Journal at night"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
        <button type="submit">Add Habit</button>
      </form>
      {successMsg && <p>{successMsg}</p>}

      <ul>
        {visibleHabits.map((h, i) => (
          <li key={start + i}>
            {h} <button onClick={() => handleDelete(start + i)}>❌</button>
          </li>
        ))}
      </ul>

      <div style={{ margin: '1em 0' }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 1em' }}>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {habitList.length > 0 && (
        <button onClick={() => { setHabitList([]); setCurrentPage(1); }}>
          Clear All Habits
        </button>
      )}
    </section>
  );
}

export default HabitTracker;
