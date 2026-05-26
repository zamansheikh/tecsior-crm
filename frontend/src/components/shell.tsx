"use client";

import { usePathname } from "next/navigation";
import { Sidebar, TopBar } from "./chrome";
import { TaskDrawer } from "./task-drawer";
import { CommandPalette } from "./command-palette";
import { useApp } from "@/providers/app";
import { TimerProvider } from "@/providers/timer";

function useCrumbs(): string[] {
  const pathname = usePathname();
  const { projectById } = useApp();
  if (pathname === "/dashboard") return ["Workspace", "Dashboard"];
  if (pathname.startsWith("/projects/")) {
    const id = pathname.split("/")[2];
    return ["Workspace", "Projects", projectById[id]?.name ?? "—"];
  }
  if (pathname.startsWith("/projects")) return ["Workspace", "Projects"];
  if (pathname.startsWith("/tasks")) return ["Workspace", "Tasks"];
  if (pathname.startsWith("/time")) return ["Workspace", "Time tracking"];
  if (pathname.startsWith("/clients")) return ["Workspace", "Clients"];
  if (pathname.startsWith("/team")) return ["Workspace", "Team"];
  if (pathname.startsWith("/invoices")) return ["Operate", "Invoices"];
  if (pathname.startsWith("/expenses")) return ["Operate", "Expenses"];
  if (pathname.startsWith("/accounting")) return ["Operate", "Accounting"];
  if (pathname.startsWith("/assets")) return ["Operate", "Fixed Assets"];
  if (pathname.startsWith("/reports")) return ["Operate", "Reports"];
  if (pathname.startsWith("/audit")) return ["System", "Audit log"];
  if (pathname.startsWith("/settings")) return ["System", "Settings"];
  return ["Workspace"];
}

export function Shell({ children }: { children: React.ReactNode }) {
  const crumbs = useCrumbs();
  const { taskOpenId, closeTask } = useApp();

  return (
    <TimerProvider>
      <div className="app-shell ambient-bg">
        <Sidebar />
        <main style={{ display: "flex", flexDirection: "column", minWidth: 0, position: "relative", overflow: "hidden" }}>
          <TopBar crumbs={crumbs} />
          <div className="screen-scroll">{children}</div>
        </main>

        {taskOpenId && <TaskDrawer taskId={taskOpenId} onClose={closeTask} />}
        <CommandPalette />
      </div>
    </TimerProvider>
  );
}
