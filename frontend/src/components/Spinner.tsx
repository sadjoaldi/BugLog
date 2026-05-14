import { motion } from "framer-motion";

type Props = {
  size?: "sm" | "md";
};

export default function Spinner({ size = "sm" }: Props) {
  const dimensions = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className={`${dimensions} rounded-full border-2 border-white/20 border-t-white shrink-0`}
    />
  );
}
