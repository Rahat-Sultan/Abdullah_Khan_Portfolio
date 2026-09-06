import type { SkillGroup } from "@/lib/data";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="section container" id="skills">
      <h2 className="section-title">Skills</h2>
      <div className="grid-4">
        {groups.map((group) => (
          <article key={group.title} className="panel" style={{ padding: "1.2rem" }}>
            <h3 style={{ marginTop: 0 }}>{group.title}</h3>
            <ul className="muted" style={{ paddingLeft: "1.1rem" }}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
