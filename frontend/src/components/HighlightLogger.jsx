import React, { useState, useEffect } from 'react';

function HighlightLogger() {
  const [highlight, setHighlight] = useState('');
  const [highlightList, setHighlightList] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const today = new Date().toLocaleDateString();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(highlightList.length / itemsPerPage);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('highlights'));
    if (stored) setHighlightList(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('highlights', JSON.stringify(highlightList));
  }, [highlightList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = highlight.trim();
    if (!trimmed) return;
    if (highlightList.includes(trimmed)) {
      setSuccessMsg('Highlight already exists!');
      return;
    }
    setHighlightList([...highlightList, trimmed]);
    setHighlight('');
    setSuccessMsg('Highlight saved!');
    setTimeout(() => setSuccessMsg(''), 2000);
    setCurrentPage(totalPages + 1); // Move to last page to see new item
  };

  const handleDelete = (index) => {
    const updated = [...highlightList];
    updated.splice(index, 1);
    setHighlightList(updated);
    if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= updated.length) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleHighlights = highlightList.slice(start, end);

  return (
    <section>
      <h2>Highlight of the Day</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What made today special?"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
        />
        <button type="submit">Save Highlight</button>
      </form>
      {successMsg && <p>{successMsg}</p>}

      <ul>
        {visibleHighlights.map((hl, index) => (
          <li key={start + index}>
            {today}: {hl} <button onClick={() => handleDelete(start + index)}>❌</button>
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

      {highlightList.length > 0 && (
        <button onClick={() => { setHighlightList([]); setCurrentPage(1); }}>Clear All Highlights</button>
      )}
    </section>
  );
}

export default HighlightLogger;