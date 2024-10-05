import { cn } from "@/lib/utils";
import { withTemplate } from "../_Templates";
import { containerDefinition } from "@/_Variables";

export const Home = withTemplate(() => {
  return <div className={cn(containerDefinition, "mt-10 pt-10")}></div>;
});
