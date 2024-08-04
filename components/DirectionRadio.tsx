"use client";

import { useState } from "react";

export default function DirectionRadio() {
  const [direction, setDirection] = useState(0);

  return (
    <div className="flex">
      <input
        type="radio"
        name="direction"
        checked={direction === 0}
        onChange={() => setDirection(0)}
      />
      <input
        type="radio"
        name="direction"
        checked={direction === 1}
        onChange={() => setDirection(1)}
      />
    </div>
  );
}
