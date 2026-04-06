import { redirect } from "next/navigation";
import { aiProjects } from "@/data/ai-projects";

export default function AIIndex() {
  redirect(`/ai/${aiProjects[0].id}`);
}
