const FONT = "var(--font-ibm-plex-sans), Helvetica, Arial, sans-serif";
const RED = "#FF2A40";
const INK_TEXT = "#FFFFFF";

function Pill({ x, y, label, color = RED, delay = 0, w }) {
  const width = w ?? Math.max(64, label.length * 7 + 30);
  return (
    <g className="ic-node-pop" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x - width / 2} ${y - 15})`} style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.3))" }}>
        <rect width={width} height="30" rx="15" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.38)" />
        <circle cx="14" cy="15" r="3" fill={color} />
        <text x="24" y="19" fontSize="10" fontWeight="600" fill={INK_TEXT}>{label}</text>
      </g>
    </g>
  );
}

function Hub({ x, y, label, w = 120, h = 76, delay = 0.3 }) {
  return (
    <g className="ic-node-pop" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x - w / 2} ${y - h / 2})`} style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.35))" }}>
        <rect width={w} height={h} rx="14" fill={RED} />
        <text x={w / 2} y={h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#FFFFFF">{label}</text>
      </g>
    </g>
  );
}

function Caption({ text }) {
  if (!text) return null;
  return (
    <text x="32" y="404" fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.45)" letterSpacing="2">
      {text.toUpperCase()}
    </text>
  );
}

const DEFAULT_COLORS = ["#FF2A40", "#0EA5E9", "#7C3AED", "#0D9488", "#E0A425", "#C74634", "#0A6ED1"];

/* ThemedVisual — generic constellation for services/solutions */
export function ThemedVisual({ center, nodes, caption }) {
  const placed = nodes.map((n, i) => {
    const angle = (-90 + i * (360 / nodes.length)) * (Math.PI / 180);
    return {
      ...n,
      color: n.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      x: 280 + 165 * Math.cos(angle),
      y: 210 + 150 * Math.sin(angle),
    };
  });

  return (
    <svg
      viewBox="0 0 560 420"
      className="h-auto w-full"
      role="img"
      aria-label={`${center} connected to ${nodes.map((n) => n.label).join(", ")}`}
      fontFamily={FONT}
    >
      <g className="ic-orbit" style={{ transformOrigin: "280px 210px" }}>
        <circle cx="280" cy="210" r="168" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="280" cy="42" r="3.5" fill={RED} opacity="0.85" />
      </g>
      <g className="ic-orbit-rev" style={{ transformOrigin: "280px 210px" }}>
        <circle cx="280" cy="210" r="105" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="2 7" />
      </g>

      {placed.map((n, i) => (
        <line key={`l-${n.label}`} x1="280" y1="210" x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" pathLength={100} className="ic-line" style={{ animationDelay: `${0.5 + i * 0.09}s` }} />
      ))}

      {placed.map((n, i) => {
        const dur = `${4 + (i % 3) * 0.8}s`;
        const begin = `${1.5 + i * 0.5}s`;
        return (
          <circle key={`p-${n.label}`} r="3.5" fill={RED} opacity="0">
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={`M 280 210 L ${n.x} ${n.y}`} />
            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.14;0.82;1" dur={dur} begin={begin} repeatCount="indefinite" />
          </circle>
        );
      })}

      <g className="ic-node-pop" style={{ animationDelay: "0.4s" }}>
        <g transform="translate(212 166)" style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.35))" }}>
          <rect width="136" height="88" rx="14" fill={RED} />
          <text x="68" y="52" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFFFFF">{center}</text>
        </g>
      </g>

      {placed.map((n, i) => (
        <g key={`n-${n.label}`} className="ic-node-pop" style={{ animationDelay: `${0.75 + i * 0.11}s` }}>
          <g className="ic-node-float" style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${6 + (i % 3)}s` }}>
            <g transform={`translate(${n.x - 52} ${n.y - 17})`} style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.3))" }}>
              <rect width="104" height="34" rx="17" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.38)" />
              <circle cx="16" cy="17" r="3.5" fill={n.color} />
              <text x="27" y="21" fontSize="10.5" fontWeight="600" fill="#FFFFFF">{n.label}</text>
            </g>
          </g>
        </g>
      ))}

      {caption ? (
        <text x="32" y="402" fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.45)" letterSpacing="2">
          {caption.toUpperCase()}
        </text>
      ) : null}
    </svg>
  );
}

/* TransformationVisual — Shape/Architect/Deliver/Sustain curve */
const STAGES = [
  { n: "01", label: "Shape", x: 40 },
  { n: "02", label: "Architect", x: 168 },
  { n: "03", label: "Deliver", x: 296 },
  { n: "04", label: "Sustain", x: 424 },
];

export function TransformationVisual() {
  const pathD = "M 96 330 C 150 330 160 268 232 268 C 300 268 290 206 360 206 C 428 206 430 144 488 122";
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="The infocure method: shape, architect, deliver and sustain" fontFamily={FONT}>
      <g className="ic-orbit" style={{ transformOrigin: "280px 210px" }}>
        <circle cx="280" cy="210" r="185" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="280" cy="25" r="3.5" fill={RED} opacity="0.85" />
      </g>
      <g className="ic-orbit-rev" style={{ transformOrigin: "280px 210px" }}>
        <circle cx="280" cy="210" r="120" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 7" />
      </g>

      <path d={pathD} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" pathLength={100} className="ic-line" style={{ animationDelay: "0.5s" }} />

      <circle r="4" fill={RED} opacity="0">
        <animateMotion dur="5s" begin="1.6s" repeatCount="indefinite" path={pathD} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur="5s" begin="1.6s" repeatCount="indefinite" />
      </circle>

      {STAGES.map((s, i) => (
        <g key={s.n} className="ic-node-pop" style={{ animationDelay: `${0.7 + i * 0.15}s` }}>
          <g className="ic-node-float" style={{ animationDelay: `${i * 0.9}s`, animationDuration: `${6 + (i % 3)}s` }}>
            <g transform={`translate(${s.x} ${318 - i * 62})`}>
              <rect width="104" height="58" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" />
              <text x="16" y="24" fontSize="11" fontWeight="600" fill={RED} letterSpacing="1">{s.n}</text>
              <text x="16" y="42" fontSize="13.5" fontWeight="600" fill="#FFFFFF">{s.label}</text>
            </g>
          </g>
        </g>
      ))}

      <g className="ic-node-pop" style={{ animationDelay: "1.5s" }}>
        <g transform="translate(440 36)">
          <rect width="96" height="64" rx="12" fill={RED} style={{ filter: "drop-shadow(0 10px 24px rgba(255,42,64,0.35))" }} />
          <path d="M20 44 L36 20 L44 32 L60 12" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="48" y="56" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#FFFFFF">Outcomes</text>
        </g>
      </g>

      {["M30 60v14M23 67h14", "M524 330v14M517 337h14", "M40 380v14M33 387h14"].map((d) => (
        <path key={d} d={d} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
      ))}

      <text x="40" y="400" fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.45)" letterSpacing="2">
        MEASURABLE AT EVERY GATE
      </text>
    </svg>
  );
}

/* CRM — customer ecosystem orbit + pipeline funnel */
export function CrmVisual({ caption = "Customer ecosystem" }) {
  const contacts = [
    { label: "Customers", a: -90 },
    { label: "Leads", a: -18 },
    { label: "Partners", a: 54 },
    { label: "Accounts", a: 126 },
    { label: "Service", a: 198 },
  ].map((c) => ({ ...c, x: 165 + 108 * Math.cos((c.a * Math.PI) / 180), y: 205 + 92 * Math.sin((c.a * Math.PI) / 180) }));
  const funnel = [
    { label: "Leads", w: 150 },
    { label: "Qualified", w: 122 },
    { label: "Proposal", w: 96 },
    { label: "Negotiation", w: 72 },
    { label: "Won", w: 50 },
  ];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="CRM customer ecosystem and sales pipeline" fontFamily={FONT}>
      <g className="ic-orbit" style={{ transformOrigin: "165px 205px" }}>
        <circle cx="165" cy="205" r="112" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="165" cy="93" r="3" fill={RED} opacity="0.8" />
      </g>
      {contacts.map((c, i) => (
        <line key={c.label} x1="165" y1="205" x2={c.x} y2={c.y} stroke="rgba(255,255,255,0.32)" strokeWidth="1.1" pathLength={100} className="ic-line" style={{ animationDelay: `${0.5 + i * 0.1}s` }} />
      ))}
      {contacts.map((c, i) => (
        <circle key={`p-${c.label}`} r="3" fill={RED} opacity="0">
          <animateMotion dur={`${4 + (i % 3)}s`} begin={`${1.4 + i * 0.5}s`} repeatCount="indefinite" path={`M 165 205 L ${c.x} ${c.y}`} />
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.8;1" dur={`${4 + (i % 3)}s`} begin={`${1.4 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <Hub x={165} y={205} label="CRM" w={104} h={68} />
      {contacts.map((c, i) => (
        <g key={`n-${c.label}`} className="ic-node-float" style={{ animationDelay: `${i * 0.7}s`, animationDuration: `${6 + (i % 3)}s` }}>
          <Pill x={c.x} y={c.y} label={c.label} delay={0.8 + i * 0.12} />
        </g>
      ))}
      <text x="380" y="86" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">PIPELINE</text>
      {funnel.map((f, i) => (
        <g key={f.label} className="ic-node-pop" style={{ animationDelay: `${1 + i * 0.18}s` }}>
          <rect x="380" y={100 + i * 44} width={f.w} height="26" rx="6" fill={i === funnel.length - 1 ? RED : "rgba(255,255,255,0.10)"} stroke="rgba(255,255,255,0.25)">
            <animate attributeName="width" from="0" to={f.w} dur="0.8s" begin={`${1 + i * 0.18}s`} fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1" />
          </rect>
          <text x="388" y={117 + i * 44} fontSize="9.5" fontWeight="600" fill="#FFFFFF">{f.label}</text>
        </g>
      ))}
      <polyline points="380,352 410,342 440,346 470,330 500,318 530,306" fill="none" stroke={RED} strokeWidth="2" pathLength={100} className="ic-line" style={{ animationDelay: "2.2s" }} />
      <text x="380" y="376" fontSize="9" fontWeight="500" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">REVENUE TREND</text>
      <Caption text={caption} />
    </svg>
  );
}

/* OMS — order lifecycle station chain */
export function OmsVisual({ caption = "Order lifecycle" }) {
  const stations = [
    { label: "Customer", x: 62 },
    { label: "Order", x: 136 },
    { label: "Inventory", x: 210 },
    { label: "Warehouse", x: 284 },
    { label: "Dispatch", x: 358 },
    { label: "Delivery", x: 432 },
    { label: "Tracking", x: 506 },
  ];
  const y = 210;
  const pathD = `M ${stations[0].x} ${y} L ${stations[stations.length - 1].x} ${y}`;
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Order lifecycle from customer to tracking" fontFamily={FONT}>
      <line x1={stations[0].x} y1={y} x2={stations[stations.length - 1].x} y2={y} stroke="rgba(255,255,255,0.30)" strokeWidth="1.4" strokeDasharray="4 6" pathLength={100} className="ic-line" style={{ animationDelay: "0.4s" }} />
      {stations.map((s, i) => (
        <g key={s.label}>
          <circle cx={s.x} cy={y} r="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.30)" className="ic-node-pop" style={{ animationDelay: `${0.5 + i * 0.12}s` }} />
          <circle cx={s.x} cy={y} r="16" fill="none" stroke={RED} strokeWidth="1.6" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.16;0.24" dur="7s" begin={`${i * 1}s`} repeatCount="indefinite" />
          </circle>
          <text x={s.x} y={y + 34} textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.75)">{s.label}</text>
        </g>
      ))}
      <g>
        <rect x="-9" y="-9" width="18" height="18" rx="4" fill={RED}>
          <animateMotion dur="7s" repeatCount="indefinite" path={pathD} rotate="0" />
        </rect>
      </g>
      <g className="ic-node-pop" style={{ animationDelay: "1.2s" }}>
        <g transform="translate(196 92)" style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))" }}>
          <rect width="168" height="58" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
          <text x="16" y="24" fontSize="10" fontWeight="700" fill="#FFFFFF">ORDER #SO-2481</text>
          <text x="16" y="42" fontSize="9" fontWeight="500" fill="rgba(255,255,255,0.6)">Stock reserved · Credit cleared</text>
          <circle cx="148" cy="20" r="8" fill={RED} />
          <path d="M 144 20 l 3 3 l 5 -6" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
        </g>
      </g>
      <g className="ic-node-pop" style={{ animationDelay: "2s" }}>
        <g transform="translate(360 280)">
          <rect width="140" height="46" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
          <text x="14" y="20" fontSize="9.5" fontWeight="700" fill="#FFFFFF">PROOF OF DELIVERY</text>
          <text x="14" y="35" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.6)">Signed · Synced to ERP</text>
        </g>
      </g>
      <Caption text={caption} />
    </svg>
  );
}

/* DMS — dealer network tree */
export function DmsVisual({ caption = "Dealer network" }) {
  const dists = [
    { label: "Distributor", x: 130, y: 200 },
    { label: "Distributor", x: 280, y: 176 },
    { label: "Distributor", x: 430, y: 200 },
  ];
  const dealers = [
    { label: "Dealer", x: 80, y: 316, p: 0 },
    { label: "Dealer", x: 180, y: 330, p: 0 },
    { label: "Dealer", x: 240, y: 300, p: 1 },
    { label: "Dealer", x: 330, y: 316, p: 1 },
    { label: "Dealer", x: 390, y: 330, p: 2 },
    { label: "Dealer", x: 490, y: 312, p: 2 },
  ];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Dealer and distributor territory network" fontFamily={FONT}>
      <circle cx="280" cy="92" r="70" fill="none" stroke="rgba(255,255,255,0.10)" strokeDasharray="2 7" className="ic-orbit" style={{ transformOrigin: "280px 92px" }} />
      {dists.map((d, i) => (
        <line key={`hd-${i}`} x1="280" y1="92" x2={d.x} y2={d.y} stroke="rgba(255,255,255,0.34)" strokeWidth="1.2" pathLength={100} className="ic-line" style={{ animationDelay: `${0.5 + i * 0.12}s` }} />
      ))}
      {dealers.map((d, i) => (
        <line key={`dd-${i}`} x1={dists[d.p].x} y1={dists[d.p].y} x2={d.x} y2={d.y} stroke="rgba(255,255,255,0.24)" strokeWidth="1" pathLength={100} className="ic-line" style={{ animationDelay: `${0.9 + i * 0.1}s` }} />
      ))}
      {dealers.map((d, i) => (
        <circle key={`pulse-${i}`} r="3" fill={RED} opacity="0">
          <animateMotion dur={`${3.6 + (i % 3) * 0.7}s`} begin={`${1.6 + i * 0.6}s`} repeatCount="indefinite" path={`M 280 92 L ${dists[d.p].x} ${dists[d.p].y} L ${d.x} ${d.y}`} />
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.12;0.85;1" dur={`${3.6 + (i % 3) * 0.7}s`} begin={`${1.6 + i * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <Hub x={280} y={92} label="Head Office" w={128} h={60} />
      {dists.map((d, i) => (
        <Pill key={`dist-${i}`} x={d.x} y={d.y} label={d.label} color="#0EA5E9" delay={0.8 + i * 0.14} w={96} />
      ))}
      {dealers.map((d, i) => (
        <g key={`dealer-${i}`} className="ic-node-float" style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${6 + (i % 3)}s` }}>
          <Pill x={d.x} y={d.y} label={d.label} color="#E0A425" delay={1.2 + i * 0.1} w={78} />
        </g>
      ))}
      <text x="32" y="60" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.45)" letterSpacing="1.5">ORDERS · INVENTORY · CLAIMS FLOW DOWN THE TERRITORY TREE</text>
      <Caption text={caption} />
    </svg>
  );
}

/* HRMS — employee lifecycle loop */
export function HrmsVisual({ caption = "Employee lifecycle" }) {
  const stages = [
    { label: "Recruit" },
    { label: "Onboard" },
    { label: "Attend" },
    { label: "Payroll" },
    { label: "Perform" },
    { label: "Grow" },
  ].map((s, i) => {
    const a = (-90 + i * 60) * (Math.PI / 180);
    return { ...s, x: 280 + 138 * Math.cos(a), y: 205 + 122 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Employee lifecycle loop" fontFamily={FONT}>
      <ellipse cx="280" cy="205" rx="138" ry="122" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" />
      <ellipse cx="280" cy="205" rx="138" ry="122" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="120 640" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 280 205" to="360 280 205" dur="12s" repeatCount="indefinite" />
      </ellipse>
      <g className="ic-node-pop" style={{ animationDelay: "0.4s" }}>
        <g transform="translate(238 168)">
          <rect width="84" height="74" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
          <rect x="28" y="10" width="28" height="14" rx="4" fill={RED} />
          <line x1="42" y1="24" x2="42" y2="34" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <line x1="20" y1="40" x2="64" y2="40" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <rect x="10" y="40" width="20" height="12" rx="4" fill="rgba(255,255,255,0.35)" />
          <rect x="32" y="40" width="20" height="12" rx="4" fill="rgba(255,255,255,0.35)" />
          <rect x="54" y="40" width="20" height="12" rx="4" fill="rgba(255,255,255,0.35)" />
          <text x="42" y="68" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="rgba(255,255,255,0.65)" letterSpacing="1">ORG STRUCTURE</text>
        </g>
      </g>
      {stages.map((s, i) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="7" fill="#1A1F2B" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" className="ic-node-pop" style={{ animationDelay: `${0.6 + i * 0.14}s` }} />
          <circle cx={s.x} cy={s.y} r="7" fill="none" stroke={RED} strokeWidth="1.6" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="12s" begin={`${i * 2}s`} repeatCount="indefinite" />
          </circle>
          <Pill x={s.x} y={s.y - 26} label={s.label} color={i % 2 ? "#0EA5E9" : RED} delay={0.7 + i * 0.14} w={Math.max(62, s.label.length * 7 + 26)} />
        </g>
      ))}
      <Caption text={caption} />
    </svg>
  );
}

/* PPC — gantt rows + capacity gauge */
export function PpcVisual({ caption = "Production planning" }) {
  const rows = [
    { label: "Line A", blocks: [{ x: 96, w: 90, red: false }, { x: 200, w: 64, red: true }] },
    { label: "Line B", blocks: [{ x: 120, w: 70, red: false }, { x: 210, w: 96, red: false }] },
    { label: "Line C", blocks: [{ x: 96, w: 56, red: true }, { x: 172, w: 110, red: false }] },
    { label: "Line D", blocks: [{ x: 140, w: 84, red: false }, { x: 244, w: 62, red: true }] },
  ];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Production schedule across machines with capacity gauge" fontFamily={FONT}>
      <text x="40" y="66" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">PRODUCTION SCHEDULE</text>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="96" y1={100 + i * 56} x2="330" y2={100 + i * 56} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      ))}
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x="40" y={105 + i * 56} fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.7)">{r.label}</text>
          {r.blocks.map((b, j) => (
            <g key={j} className="ic-node-pop" style={{ animationDelay: `${0.5 + i * 0.16 + j * 0.22}s` }}>
              <rect x={b.x} y={88 + i * 56} height="26" rx="6" fill={b.red ? RED : "rgba(255,255,255,0.10)"} stroke="rgba(255,255,255,0.28)">
                <animate attributeName="width" from="0" to={b.w} dur="0.9s" begin={`${0.5 + i * 0.16 + j * 0.22}s`} fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1" />
              </rect>
            </g>
          ))}
        </g>
      ))}
      <g className="ic-node-pop" style={{ animationDelay: "1.6s" }}>
        <text x="404" y="66" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">CAPACITY</text>
        <path d="M 380 160 A 62 62 0 0 1 504 160" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="8" strokeLinecap="round" />
        <path d="M 380 160 A 62 62 0 0 1 504 160" fill="none" stroke={RED} strokeWidth="8" strokeLinecap="round" strokeDasharray="195" strokeDashoffset="195">
          <animate attributeName="stroke-dashoffset" from="195" to="52" dur="1.6s" begin="1.8s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1" />
        </path>
        <text x="442" y="152" textAnchor="middle" fontSize="17" fontWeight="700" fill="#FFFFFF">87%</text>
        <text x="442" y="170" textAnchor="middle" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.55)" letterSpacing="1">UTILISED</text>
      </g>
      <g className="ic-node-pop" style={{ animationDelay: "2.2s" }}>
        <rect x="380" y="210" width="140" height="66" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" />
        <text x="394" y="232" fontSize="9.5" fontWeight="700" fill="#FFFFFF">MATERIAL FLOW</text>
        <text x="394" y="248" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.6)">RM → WIP → FG, planned</text>
        <circle cx="504" cy="230" r="4" fill={RED}>
          <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
      <polyline points="96,330 160,322 224,334 288,318 330,326" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeDasharray="3 5" pathLength={100} className="ic-line" style={{ animationDelay: "2.4s" }} />
      <text x="96" y="356" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.45)" letterSpacing="1">THROUGHPUT TREND</text>
      <Caption text={caption} />
    </svg>
  );
}

/* EXIM — global trade routes */
export function EximVisual({ caption = "Global trade" }) {
  const ports = [
    { label: "Nhava Sheva", x: 110, y: 250 },
    { label: "Jebel Ali", x: 285, y: 165 },
    { label: "Singapore", x: 455, y: 235 },
  ];
  const arcs = [
    { d: "M 110 250 Q 190 130 285 165", dur: "5s", begin: "1.4s" },
    { d: "M 285 165 Q 380 110 455 235", dur: "6s", begin: "2.2s" },
    { d: "M 455 235 Q 280 330 110 250", dur: "7s", begin: "3s" },
  ];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Global trade routes connecting ports" fontFamily={FONT}>
      {Array.from({ length: 60 }).map((_, i) => {
        const x = 60 + (i % 12) * 40;
        const y = 90 + Math.floor(i / 12) * 56;
        return <circle key={i} cx={x} cy={y} r="1.4" fill="rgba(255,255,255,0.10)" />;
      })}
      {arcs.map((a, i) => (
        <path key={i} d={a.d} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" strokeDasharray="5 6" pathLength={100} className="ic-line" style={{ animationDelay: `${0.6 + i * 0.25}s` }} />
      ))}
      {arcs.map((a, i) => (
        <circle key={`ship-${i}`} r="4" fill={RED} opacity="0">
          <animateMotion dur={a.dur} begin={a.begin} repeatCount="indefinite" path={a.d} />
          <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.1;0.85;1" dur={a.dur} begin={a.begin} repeatCount="indefinite" />
        </circle>
      ))}
      {ports.map((p, i) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="10" fill="#1A1F2B" stroke={RED} strokeWidth="1.8" className="ic-node-pop" style={{ animationDelay: `${0.5 + i * 0.18}s` }} />
          <circle cx={p.x} cy={p.y} r="10" fill="none" stroke={RED} strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="10;22" dur="2.6s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="2.6s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          </circle>
          <Pill x={p.x} y={p.y + 30} label={p.label} color="#0EA5E9" delay={0.7 + i * 0.18} w={Math.max(84, p.label.length * 6.6 + 26)} />
        </g>
      ))}
      <g className="ic-node-pop" style={{ animationDelay: "1.8s" }}>
        <g transform="translate(352 42)" style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))" }}>
          <rect width="150" height="52" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
          <text x="14" y="22" fontSize="9.5" fontWeight="700" fill="#FFFFFF">SHIPPING BILL · e-BRC</text>
          <text x="14" y="38" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.6)">Documents generated from data</text>
        </g>
      </g>
      <Caption text={caption} />
    </svg>
  );
}

/* VTS — GPS route with moving vehicle */
export function VtsVisual({ caption = "Fleet tracking" }) {
  const route = "M 84 322 C 160 300 140 220 226 210 S 330 260 396 190 S 450 130 486 118";
  const pins = [
    { x: 84, y: 322, label: "Depot" },
    { x: 226, y: 210, label: "Halt 1" },
    { x: 396, y: 190, label: "Halt 2" },
  ];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Live fleet GPS tracking on a route" fontFamily={FONT}>
      {Array.from({ length: 36 }).map((_, i) => {
        const x = 60 + (i % 9) * 56;
        const y = 80 + Math.floor(i / 9) * 76;
        return <circle key={i} cx={x} cy={y} r="1.3" fill="rgba(255,255,255,0.08)" />;
      })}
      <path d={route} fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.6" strokeDasharray="6 7" pathLength={100} className="ic-line" style={{ animationDelay: "0.4s" }} />
      <circle cx="486" cy="118" r="26" fill="none" stroke={RED} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.7">
        <animate attributeName="r" values="20;34" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="486" cy="118" r="9" fill={RED} className="ic-node-pop" style={{ animationDelay: "0.9s" }} />
      <Pill x={486} y={84} label="Destination" delay={1} w={92} />
      {pins.map((p, i) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="7" fill="#1A1F2B" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" className="ic-node-pop" style={{ animationDelay: `${0.6 + i * 0.16}s` }} />
          <circle cx={p.x} cy={p.y} r="2.6" fill="#0EA5E9" />
          <text x={p.x} y={p.y + 22} textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.7)">{p.label}</text>
        </g>
      ))}
      <g>
        <rect x="-11" y="-8" width="22" height="16" rx="4" fill={RED}>
          <animateMotion dur="6.5s" repeatCount="indefinite" path={route} rotate="auto" />
        </rect>
      </g>
      <g className="ic-node-pop" style={{ animationDelay: "1.4s" }}>
        <g transform="translate(52 52)">
          <rect width="150" height="48" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
          <circle cx="18" cy="24" r="5" fill={RED}>
            <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x="32" y="21" fontSize="9.5" fontWeight="700" fill="#FFFFFF">LIVE · 42 km/h</text>
          <text x="32" y="36" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.6)">ETA 1h 12m · On route</text>
        </g>
      </g>
      <Caption text={caption} />
    </svg>
  );
}

/* e-Invoicing — compliance gates into ERP ledger */
export function EinvVisual({ caption = "Invoice automation" }) {
  const gates = [
    { label: "Validate", y: 150 },
    { label: "Approve", y: 216 },
    { label: "Tax · IRN", y: 282 },
    { label: "ERP Sync", y: 348 },
  ];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Invoice flowing through compliance gates into ERP" fontFamily={FONT}>
      <line x1="200" y1="96" x2="200" y2="368" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" strokeDasharray="4 6" pathLength={100} className="ic-line" style={{ animationDelay: "0.4s" }} />
      <g className="ic-node-pop" style={{ animationDelay: "0.5s" }}>
        <g transform="translate(164 46)" style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))" }}>
          <rect width="72" height="52" rx="8" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.35)" />
          <line x1="14" y1="16" x2="58" y2="16" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <line x1="14" y1="26" x2="58" y2="26" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="14" y1="36" x2="44" y2="36" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <text x="36" y="66" textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.55)" letterSpacing="1">INVOICE</text>
        </g>
      </g>
      {gates.map((g, i) => (
        <g key={g.label}>
          <Pill x={200} y={g.y} label={g.label} color={i === gates.length - 1 ? RED : "#0D9488"} delay={0.8 + i * 0.2} w={96} />
          <circle cx={200 + 62} cy={g.y} r="9" fill={RED} opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          </circle>
          <path d={`M ${200 + 58.5} ${g.y} l 2.5 2.5 l 4.5 -5`} stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.62;0.7;1" dur="6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          </path>
        </g>
      ))}
      <g>
        <rect x="-7" y="-7" width="14" height="14" rx="3" fill="rgba(255,255,255,0.85)" opacity="0">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 200 96 L 200 368" />
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.85;1" dur="6s" repeatCount="indefinite" />
        </rect>
      </g>
      <g className="ic-node-pop" style={{ animationDelay: "1.6s" }}>
        <g transform="translate(330 168)" style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.35))" }}>
          <rect width="150" height="120" rx="14" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.28)" />
          <rect x="18" y="18" width="114" height="16" rx="5" fill={RED} />
          <text x="75" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">ERP LEDGER</text>
          {[0, 1, 2].map((r) => (
            <line key={r} x1="18" y1={52 + r * 18} x2="132" y2={52 + r * 18} stroke="rgba(255,255,255,0.25)" strokeWidth="4" strokeLinecap="round" strokeDasharray="114" strokeDashoffset="114">
              <animate attributeName="stroke-dashoffset" from="114" to="0" dur="0.9s" begin={`${2 + r * 0.4}s`} fill="freeze" />
            </line>
          ))}
          <text x="18" y="112" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.55)">GSTN · ZATCA reconciled</text>
        </g>
      </g>
      <line x1="262" y1="348" x2="330" y2="270" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="4 5" pathLength={100} className="ic-line" style={{ animationDelay: "2s" }} />
      <Caption text={caption} />
    </svg>
  );
}

/* Integration mesh — ERP/systems cross-linked */
export function IntegrationMeshVisual({ caption = "Connected systems" }) {
  const systems = [
    { label: "ERP", x: 130, y: 120 },
    { label: "CRM", x: 430, y: 110 },
    { label: "OMS", x: 470, y: 290 },
    { label: "Portal", x: 280, y: 350 },
    { label: "BI", x: 96, y: 290 },
  ];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3]];
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Enterprise systems connected in an integration mesh" fontFamily={FONT}>
      {links.map(([a, b], i) => (
        <line key={i} x1={systems[a].x} y1={systems[a].y} x2={systems[b].x} y2={systems[b].y} stroke="rgba(255,255,255,0.26)" strokeWidth="1.1" pathLength={100} className="ic-line" style={{ animationDelay: `${0.4 + i * 0.12}s` }} />
      ))}
      {links.slice(0, 5).map(([a, b], i) => (
        <circle key={`m-${i}`} r="3" fill={RED} opacity="0">
          <animateMotion dur={`${3.4 + i * 0.6}s`} begin={`${1.4 + i * 0.5}s`} repeatCount="indefinite" path={`M ${systems[a].x} ${systems[a].y} L ${systems[b].x} ${systems[b].y}`} />
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.12;0.85;1" dur={`${3.4 + i * 0.6}s`} begin={`${1.4 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <g className="ic-node-pop" style={{ animationDelay: "0.9s" }}>
        <g transform="translate(240 190)" style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.35))" }}>
          <rect width="80" height="52" rx="12" fill={RED} />
          <text x="40" y="31" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#FFFFFF">API</text>
        </g>
      </g>
      {systems.map((s, i) => (
        <g key={s.label} className="ic-node-float" style={{ animationDelay: `${i * 0.65}s`, animationDuration: `${6 + (i % 3)}s` }}>
          <Pill x={s.x} y={s.y} label={s.label} color={["#0EA5E9", "#7C3AED", "#0D9488", "#E0A425", "#C74634"][i]} delay={0.7 + i * 0.13} w={72} />
        </g>
      ))}
      <Caption text={caption} />
    </svg>
  );
}
