"use client";

import { KeyboardEvent, useState, type ChangeEvent } from "react";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";

export function Setup() {
  const [names, setNames] = useState<string[]>([""]);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = event.target.value;
    if (newValue === "" || /^[a-zA-Z0-9\s]*$/.test(newValue)) {
      setNames((prev) => {
        const newNames = [...prev];
        newNames[index] = newValue;
        return newNames;
      });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setNames((prevState) => [...prevState, ""]);
      setTimeout(() => {
        const inputs = document.querySelectorAll<HTMLInputElement>("input");
        inputs[inputs.length - 1]?.focus();
      }, 0);
    }
  };

  const onAddMore = () => {
    setNames((prevState) => [...prevState, ""]);
  };

  const onProceed = () => {
    const validNames = names.filter((it) => it && it !== "");
    if (validNames.length <= 1) {
      toast({
        title: "Invalid",
        description: "Please add 2 or more than 2 names to proceed.",
      });
      return;
    }
    setNames(validNames);
    localStorage.setItem("names", JSON.stringify(validNames));
    setTimeout(() => {
      navigate("/daily-decider");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-row justify-between mb-3">
          <Label className="block text-lg font-semibold text-gray-800">
            Enter Names
          </Label>
        </div>

        <div className="space-y-4">
          {names.map((name, index) => (
            <div key={index}>
              <Input
                id={`name-${index}`}
                type="text"
                value={name}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={onKeyDown}
                placeholder="Enter Name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
        </div>

        <Button className="w-full mt-5" variant="secondary" onClick={onAddMore}>
          Press Enter Or Click To Add More
        </Button>
        <Button className="w-full mt-2" variant="default" onClick={onProceed}>
          Proceed
        </Button>
      </div>
    </div>
  );
}
