"use client";

import { motion } from "framer-motion";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundClient() {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length < 1) {
      router.push("/");
    } else {
      router.back();
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(125%_125%_at_50%_90%,#ffffff_40%,#1d9bf0_100%)] px-4 text-center transition-all duration-700 ease-in-out dark:bg-[radial-gradient(125%_125%_at_50%_90%,#15181c_40%,#2563eb_100%)]">
      <motion.div
        initial={{ scale: 0, rotate: -40, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mx-auto inline-flex h-[120px] w-[120px] items-center justify-center rounded-xl"
      >
        <CircleX size={80} className="text-destructive" />
      </motion.div>

      <h1 className="mt-3 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Page not found : 404
      </h1>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        We can’t find the page you’re looking for. It might have been removed,
        renamed, or temporarily unavailable.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={handleBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Go back
        </button>
      </div>
    </main>
  );
}
