// import { cn } from "@/lib/utils";
// import { withTemplate } from "../_Templates";
// import { containerDefinition } from "@/_Variables";

// export const Home = withTemplate(() => {
//   return <div className={cn(containerDefinition, "mt-10 pt-10")}></div>;
// });

import { cn } from "@/lib/utils";
import { withTemplate } from "../_Templates";
import { containerDefinition } from "@/_Variables";

export const Home = withTemplate(() => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Full viewport background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      />

      {/* Content area */}
      <div
        className={cn(
          containerDefinition,
          "absolute inset-0 pt-[var(--navbar-height)] overflow-auto",
        )}
      >
        {/* Your scrollable content goes here */}
      </div>
    </div>
  );
});
