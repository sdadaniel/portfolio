import { redirect } from "next/navigation";
import { companies } from "@/data/companies";

export default function ProjectIndex() {
  redirect(`/project/${companies[0].id}`);
}
