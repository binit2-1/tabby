import React from "react";
import { motion } from "motion/react";

interface FlowingLineProps extends React.SVGProps<SVGSVGElement> {
  enableAnimation?: boolean;
}

const FlowingLine = ({ enableAnimation = true, ...props }: FlowingLineProps) => {
  const uid = React.useId().replace(/[:]/g, "");
  const gradId = `border-gradient-${uid}`;

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 40"
      width="100%"
      height="20"
      preserveAspectRatio="none"
      {...props}
    >
      <line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="var(--landing-borders)"
        strokeWidth={0.5}
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke={`url(#${gradId})`}
        strokeWidth={1}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1:"-10%",
            x2:"0%"
          }}
          animate={
            enableAnimation
              ? {
                  x1: "100%",
                  x2: "110%",
                }
              : {
                  x1: "-10%",
                  x2: "0%",
                }
          }
          transition={{
            duration: 5,
            repeat:Infinity,
            repeatDelay: 3,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

export default FlowingLine;
