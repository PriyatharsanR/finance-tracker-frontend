import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import MobileBottomNav from "./MobileBottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden text-on-background font-body-lg">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-md md:p-lg bg-surface-bright">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
