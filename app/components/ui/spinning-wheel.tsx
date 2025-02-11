"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "./button";

export type SpinningWheelProps = {
  segments: string[];
  spinDuration?: number;
  onStart?: (value?: string) => void;
  onStop?: (value: string) => void;
};

const colors = [
  "#4ECDC4",
  "#FF6B6B",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F06292",
  "#AED581",
  "#7986CB",
];

const SpinningWheel = (props: SpinningWheelProps) => {
  const { segments, spinDuration = 5000, onStart, onStop } = props;

  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimationControls();

  const segmentAngle = 360 / segments.length;
  const centerX = 50;
  const centerY = 50;
  const radius = 50;

  const getCoordinates = (angle: number) => {
    const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));
    return `${x},${y}`;
  };

  const spin = async () => {
    if (!isSpinning) {
      setIsSpinning(true);
      onStart?.();

      const fullRotations = 4 + Math.random() * 2;
      const randomSegment = Math.floor(Math.random() * segments.length);
      const finalRotation = fullRotations * 360 + randomSegment * segmentAngle;

      await controls.start({
        rotate: finalRotation,
        transition: {
          duration: spinDuration / 1000,
          ease: [0.13, 0.99, 0.29, 1.0],
          type: "tween",
        },
      });

      setIsSpinning(false);
      const winningIndex =
        segments.length - 1 - Math.floor((finalRotation % 360) / segmentAngle);
      onStop?.(segments[winningIndex]);
    }
  };

  return (
    <div className="relative w-80 h-80">
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        animate={controls}
        initial={{ rotate: 0 }}
      >
        {segments.map((segment, index) => {
          const startAngle = index * segmentAngle;
          const endAngle = (index + 1) * segmentAngle;

          const start = getCoordinates(startAngle);
          const end = getCoordinates(endAngle);

          const largeArcFlag = segmentAngle <= 180 ? "0" : "1";

          const d = [
            `M ${centerX},${centerY}`,
            `L ${start}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${end}`,
            "Z",
          ].join(" ");

          return (
            <g key={index}>
              <path
                d={d}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="0.5"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                fill="white"
                fontSize="6"
                fontWeight="bold"
                transform={`
                    rotate(${startAngle + segmentAngle / 2}, 50, 50)
                    translate(0, -30)
                  `}
              >
                {segment}
              </text>
            </g>
          );
        })}
      </motion.svg>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500"></div>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={spin}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          Spin
        </Button>
      </div>
    </div>
  );
};

export { SpinningWheel };
