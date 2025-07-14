import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";

const GallerySkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-4 md:gap-6">
    {Array(12)
      .fill()
      .map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="rounded-lg overflow-hidden"
        >
          <Skeleton className="w-full h-48 md:h-64" />
        </motion.div>
      ))}
  </div>
);

export default GallerySkeleton;
