"use client";

import { useEffect, useState } from "react";

export default function Age() {
  const [age, setAge] = useState<string>("21");

  useEffect(() => {
    const dob = new Date("2005-07-20");
    const updateAge = () => {
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      const gap = (now.getTime() - dob.getTime()) / msPerDay;
      const years = gap / 365.2425;
      setAge(years.toFixed(9));
    };
    updateAge();
    const interval = setInterval(updateAge, 50);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono">{age}</span>;
}
