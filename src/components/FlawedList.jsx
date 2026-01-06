import React, { useEffect, useMemo, useState } from "react";
import { makeId } from "../utils/makeId.js";

function ListItem({ label, onChange }) {
  const [value, setValue] = useState(label);

  useEffect(() => {
    setValue(label);
  }, []);

  return (
    <li>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </li>
  );
}

const FlawedList = () => {
  const [items, setItems] = useState([
    { id: makeId(), label: "Alpha" },
    { id: makeId(), label: "Beta" },
    { id: makeId(), label: "Alpha" },
  ]);

  const [query, setQuery] = useState("");
  const [alphaSort, setAlphaSort] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((it) => it.label.toLowerCase().includes(q)) : items;
  }, [query]);

  const visibleItems = alphaSort
    ? [...filtered].sort((a, b) => a.label.localeCompare(b.label))
    : filtered;

  function addAt(index) {
    const newItem = { id: makeId(), label: "New" };
    setItems((prev) => {
      const next = [...prev];
      next.splice(index, 0, newItem);
      return next;
    });
  }

  function removeAt(index) {
    setItems((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }

  function moveUp(index) {
    setItems((prev) => {
      const next = [...prev];
      if (index <= 0) return next;
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  return (
    <div>
      <h3>Flawed Implementation (for interview)</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          aria-label="Search"
          placeholder="Filter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="checkbox"
            checked={alphaSort}
            onChange={(e) => setAlphaSort(e.target.checked)}
          />
          Sort A→Z
        </label>
        <button onClick={() => addAt(1)}>Insert at index 1</button>
      </div>

      <ul>
        {visibleItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              label={item.label}
              onChange={(newLabel) => {
                // Update by visible index → wrong item when filtered/sorted
                setItems((prev) => {
                  const next = [...prev];
                  next[index] = { ...next[index], label: newLabel };
                  return next;
                });
              }}
            />
            <div style={{ display: "inline-flex", gap: 6, marginLeft: 8 }}>
              <button onClick={() => moveUp(index)}>↑</button>
              <button onClick={() => removeAt(index)}>✕</button>
            </div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export { FlawedList };