import { cn } from "../../lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  header,
  description,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border-2 justify-between flex flex-col space-y-4 relative",
        className
      )}
    >
      
      {header}
      <motion.div
        className="absolute bottom-28 right-9 bg-neutral-200 bg-opacity-25 p-2 rounded-full"
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: -45 },
        }}
        transition={{ duration: 0.3 }}
      >
        <IconArrowRight className="h-6 w-6 text-neutral-800 font-bold" />
      </motion.div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mt-1 heading text-xl">
          {title}
        </div>
        <span className="text-sm">{description}</span>
      </div>
    </motion.div>
  );
};
