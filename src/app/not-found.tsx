import NotFoundClient from "@/components/common/not-found-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error 404",
  description:
    "We can not find the page you are looking for It might have been removed renamed or temporarily unavailable",
};
export default function NotFoundPage() {
  return <NotFoundClient />;
}
