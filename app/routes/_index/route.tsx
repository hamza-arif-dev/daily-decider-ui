"use client";

import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Decider" },
    { name: "description", content: "Welcome Daily Decider" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const names = localStorage.getItem("names");
      if (!names) {
        navigate("/setup");
      }
      if (names) {
        navigate("/daily-decider");
      }
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Daily Decider!
        </h1>
        <p className="text-gray-600 mt-2">
          Easily add names and let us help you make a decision.
        </p>
      </div>
    </div>
  );
}
