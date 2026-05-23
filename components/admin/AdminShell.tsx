/**
 * AdminShell — one shared admin layout (design-doc §17 "shared admin shell").
 * Filter rail + content + (eventually) detail drawer + status controls.
 * Three views plug in for applications, bookings, and resource CRUD (W4 / W7).
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 desktop:grid-cols-[16rem_1fr]">
      <aside className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-navy/60">
        Filters — W4
      </aside>
      <div>{children}</div>
    </div>
  );
}
