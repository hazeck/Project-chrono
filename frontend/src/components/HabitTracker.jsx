import React, { useState, useEffect } from 'react';

function HabitTracker() {
  const [habit, setHabit] = useState('');
  const [habitList, setHabitList] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(habitList.length / itemsPerPage);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits'));
    if (storedHabits) setHabitList(storedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habitList));
  }, [habitList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = habit.trim();
    if (!trimmed) return;
    if (habitList.includes(trimmed)) {
      setSuccessMsg('Habit already exists!');
      return;
    }
    setHabitList([...habitList, trimmed]);
    setHabit('');
    setSuccessMsg('Habit added!');
    setTimeout(() => setSuccessMsg(''), 2000);
    setCurrentPage(totalPages + 1); // Move to last page to see new item
  };

  const handleDelete = (index) => {
    const updated = [...habitList];
    updated.splice(index, 1);
    setHabitList(updated);
    if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= updated.length) {
      setCurrentPage(currentPage - 1); // Move back if last item on page is deleted
    }
  };

  // Pagination logic
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleHabits = habitList.slice(start, end);

  return (
    <section>
      <h2>Track a Habit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Drink Water"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
        <button type="submit">Add Habit</button>
      </form>
      {successMsg && <p>{successMsg}</p>}

      <ul>
        {visibleHabits.map((h, index) => (
          <li key={start + index}>
            {h} <button onClick={() => handleDelete(start + index)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ margin: "1em 0" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 1em" }}>
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
        <button onClick={() => { setHabitList([]); setCurrentPage(1); }}>Clear All Habits</button>
      )}
    </section>
  );
}

export default HabitTracker;
