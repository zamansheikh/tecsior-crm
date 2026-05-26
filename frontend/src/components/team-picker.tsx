"use client";

import { Avatar, Icon, I } from "@/components/primitives";
import { useApp } from "@/providers/app";

// Multi-select of team members for a project, with one member flagged as lead.
// Keeps team + lead consistent: the lead is always part of the team, and
// removing the lead promotes the next remaining member (or clears it).
export function TeamPicker({
  team,
  lead,
  onChange,
}: {
  team: string[];
  lead: string;
  onChange: (next: { team: string[]; lead: string }) => void;
}) {
  const { team: members } = useApp();

  const toggle = (id: string) => {
    if (team.includes(id)) {
      const nextTeam = team.filter((x) => x !== id);
      const nextLead = lead === id ? nextTeam[0] ?? "" : lead;
      onChange({ team: nextTeam, lead: nextLead });
    } else {
      const nextTeam = [...team, id];
      onChange({ team: nextTeam, lead: lead || id });
    }
  };

  const makeLead = (id: string) => {
    onChange({ team: team.includes(id) ? team : [...team, id], lead: id });
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {members.map((m) => {
        const selected = team.includes(m.id);
        const isLead = lead === m.id;
        return (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 6px 3px 3px",
              borderRadius: 99,
              border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
              background: selected ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "var(--surface-solid)",
              fontSize: 11,
              color: selected ? "var(--text)" : "var(--text-sub)",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(m.id)}
              title={selected ? `Remove ${m.name}` : `Add ${m.name}`}
              style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit", padding: 0 }}
            >
              <Avatar name={m.name} bg={m.bg} size={18} ring={isLead ? "var(--accent)" : undefined} />
              {m.name.split(" ")[0]}
              {selected && <Icon d={I.check} size={11} color="var(--accent-soft)" />}
            </button>
            {selected && (
              <button
                type="button"
                onClick={() => makeLead(m.id)}
                title={isLead ? "Project lead" : "Set as lead"}
                style={{ display: "inline-flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0, opacity: isLead ? 1 : 0.4 }}
              >
                <Icon d={I.star} size={12} color={isLead ? "var(--warning)" : "var(--text-dim)"} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
