import Logo from "./logo";
import { Roboto } from "next/font/google";

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
      className={`flex items-center  text-primary ${roboto.variable} ${className}`}
    >
      <Logo className="w-[1.5em] h-[1.5em] fill-current" />
      <span className="text-black dark:text-white font-(--font-roboto)">
        ueryNex
      </span>
      <span className="text-primary font-(--font-roboto)">_</span>
    </div>
  );
}

export default QueryNex;
