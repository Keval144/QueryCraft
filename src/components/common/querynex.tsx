import { Roboto } from "next/font/google";
import Logo from "./logo";

interface QueryNexProps {
  className?: string;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

function QueryNex({ className }: QueryNexProps) {
  return (
    <div
      className={`text-primary flex items-center ${roboto.variable} ${className}`}
    >
      <Logo className="h-[1.5em] w-[1.5em] fill-current" />
      <span className="font-(--font-roboto) text-black dark:text-white">
        ueryNex
      </span>
      <span className="text-primary font-(--font-roboto)">_</span>
    </div>
  );
}

export default QueryNex;
