"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpinningWheel } from "~/components/ui/spinning-wheel";
import { useNavigate } from "@remix-run/react";

export function DailyDecider() {
  const [winner, setWinner] = useState<string>();
  const [segments, setSegments] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const names = localStorage.getItem("names");
    if (!names) {
      navigate("/");
    }
    if (names) {
      const segs = JSON.parse(names);
      setSegments(segs);
    }
  }, [navigate]);

  const onStart = () => {
    setWinner(undefined);
  };

  const onStop = (value: string) => {
    setWinner(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SpinningWheel
        segments={segments}
        spinDuration={5000}
        onStart={onStart}
        onStop={onStop}
      />
      {winner ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-2xl font-bold text-center"
        >
          Winner: {winner}
        </motion.div>
      ) : null}
    </div>
  );
}
