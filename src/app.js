const STORE_KEY = "dpl2-static-data";
const ADMIN_PASSWORD = "DPL@2026";

const scoringRules = {
  batting: [
    ["present", "Present", 6, 1],
    ["substitute", "Substitute", 4, 1],
    ["medical", "Medical", 2, 1],
    ["testimonial", "Testimonial", 1, 1],
    ["oneToOne", "1-2-1", 2, 1],
    ["referralInside", "Referral Inside", 2, 1],
    ["referralOutside", "Referral Outside", 4, 1],
    ["paidVisitorRegistered", "Paid Visitor Registered", 6, 1],
    ["trainingAttended", "Training Attended", 6, 1],
    ["tyfcb", "TYFCB per Rs 1 lakh", 1, 1],
    ["visitorAfterRegistration", "Visitor attended after registration", 25, 6],
    ["induction", "Induction", 100, 25],
  ],
  extras: [
    ["teamMeetup", "Team meetup", 5],
    ["powerDate", "Power date", 7],
  ],
  bowling: [
    ["absent", "Absent", 1, -10],
    ["late", "Late", 1, -5],
    ["noActivity", "No activity in a day", 1, 0],
    ["referralClaim", "6/9 members doing 2 referrals or 2 1-2-1s", 1, 0],
    ["visitorClaim", "6/9 members registering 1 paid visitor", 3, 0],
    ["allCriteria", "Bowler completing all criteria on bowling day", 2, 0],
  ],
};

const seed = {
  teams: [
    { id: "obsidian", name: "Obsidian Strikers", group: "A", color: "#ff8a1f", logo: "" },
    { id: "quartz", name: "Quartz Kings", group: "A", color: "#37b7ff", logo: "" },
    { id: "onyx", name: "Onyx Titans", group: "B", color: "#a855f7", logo: "" },
    { id: "granite", name: "Granite Gladiators", group: "B", color: "#28e78d", logo: "" },
  ],
  players: [
    ["p1", "Aarav Mehta", "obsidian"], ["p2", "Dev Shah", "obsidian"], ["p3", "Kabir Rao", "obsidian"], ["p4", "Rohan Iyer", "obsidian"], ["p5", "Nikhil Jain", "obsidian"], ["p6", "Sameer Das", "obsidian"], ["p7", "Vivaan Suri", "obsidian"], ["p8", "Manav Bose", "obsidian"], ["p9", "Harsh Vyas", "obsidian"],
    ["p10", "Ishaan Patel", "quartz"], ["p11", "Yash Nair", "quartz"], ["p12", "Arjun Kale", "quartz"], ["p13", "Karan Gill", "quartz"], ["p14", "Neel Shah", "quartz"], ["p15", "Dhruv Roy", "quartz"], ["p16", "Rudra Sen", "quartz"], ["p17", "Om Desai", "quartz"], ["p18", "Vir Batra", "quartz"],
    ["p19", "Reyansh Kapoor", "onyx"], ["p20", "Advait Joshi", "onyx"], ["p21", "Shaurya Singh", "onyx"], ["p22", "Parth Malhotra", "onyx"], ["p23", "Ayaan Reddy", "onyx"], ["p24", "Aryan Menon", "onyx"], ["p25", "Vedant Kulkarni", "onyx"], ["p26", "Krish Rao", "onyx"], ["p27", "Mihir Chawla", "onyx"],
    ["p28", "Vihaan Gupta", "granite"], ["p29", "Atharv Jain", "granite"], ["p30", "Pranav Sethi", "granite"], ["p31", "Samar Bhat", "granite"], ["p32", "Tanay Agarwal", "granite"], ["p33", "Rishabh Lal", "granite"], ["p34", "Anay Saxena", "granite"], ["p35", "Kunal Verma", "granite"], ["p36", "Ivaan Khanna", "granite"],
  ].map(([id, name, teamId]) => ({ id, name, teamId })),
  awards: {
    orangeCap: "",
    purpleCap: "",
    bestStrikeRate: "",
    bestEconomy: "",
    mvp: "",
    motm: "",
  },
  sponsors: {
    title: { name: "Your Title Sponsor", logo: "", note: "Title Sponsor" },
    poweredBy: { name: "Your Powered By Partner", logo: "", note: "Powered By" },
    partners: [
      { id: "sponsor-1", name: "Partner Sponsor", logo: "", note: "Awards Sponsor" },
    ],
  },
  matches: [],
};

const fixtures = [
  ["m1", 1, "obsidian", "quartz"], ["m2", 1, "onyx", "granite"],
  ["m3", 2, "obsidian", "onyx"], ["m4", 2, "quartz", "granite"],
  ["m5", 3, "obsidian", "granite"], ["m6", 3, "quartz", "onyx"],
  ["m7", 4, "obsidian", "quartz"], ["m8", 4, "onyx", "granite"],
  ["m9", 5, "A1", "B2"], ["m10", 5, "B1", "A2"],
];

function freshMatch(id, week, teamAId, teamBId) {
  return {
    id, week, teamAId, teamBId, venue: `Week ${week} Match Center`, status: week === 1 ? "live" : "upcoming",
    tossWinnerId: teamAId, battingTeamId: teamAId, bowlingTeamId: teamBId, innings: 1, powerplay: true,
    secretImposterId: "", openers: [], selectedBowlers: [], allOut: false, winnerId: "", playerOfMatchId: "", matchMvpId: "",
    startAt: "", completedAt: "",
    extras: 0, batting: {}, bowling: {}, commentary: [
      { time: "00.1", text: "DPL 2.0 begins with a bright start and the live desk is awake." },
      { time: "00.0", text: "Toss done. Captains are in. Opening pair selected from admin." },
    ],
  };
}

seed.matches = fixtures.map((item) => freshMatch(...item));

let data = loadData();
let route = location.hash.replace("#", "") || "home";
let adminUnlocked = sessionStorage.getItem("dpl2-admin") === "true";
let adminTab = "live";
let adminLiveMatchId = sessionStorage.getItem("dpl2-admin-live-match") || "";
let statsScope = sessionStorage.getItem("dpl2-stats-scope") || "season";

const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const navToggle = document.getElementById("navToggle");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (saved && saved.teams && saved.players && saved.matches) return normalizeData(saved);
  } catch (error) {}
  return clone(seed);
}
function normalizeData(saved) {
  const normalized = { ...saved };
  normalized.sponsors ||= clone(seed.sponsors);
  normalized.sponsors.title ||= clone(seed.sponsors.title);
  normalized.sponsors.poweredBy ||= clone(seed.sponsors.poweredBy);
  normalized.sponsors.partners ||= [];
  if (!normalized.meta?.supportsTwoLiveWeek) {
    const hasCompleted = normalized.matches.some((match) => match.status === "completed");
    const weekOne = normalized.matches.filter((match) => Number(match.week) === 1);
    if (!hasCompleted && weekOne.length >= 2) {
      weekOne.slice(0, 2).forEach((match) => {
        match.status = "live";
      });
    }
    normalized.meta = { ...(normalized.meta || {}), supportsTwoLiveWeek: true };
    localStorage.setItem(STORE_KEY, JSON.stringify(normalized));
  }
  return normalized;
}
function saveData() {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}
function resetData() {
  data = clone(seed);
  saveData();
  toast("League data reset");
  render();
}
function id(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`; }
function byId(collection, itemId) { return collection.find((item) => item.id === itemId); }
function teamName(teamId) { return byId(data.teams, teamId)?.name || teamId || "TBD"; }
function playerName(playerId) { return byId(data.players, playerId)?.name || "Select player"; }
function teamPlayers(teamId) { return data.players.filter((player) => player.teamId === teamId); }
function initials(name) { return String(name || "T").split(/\s+/).map((x) => x[0]).join("").slice(0, 3).toUpperCase(); }
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[match]));
}
function dateTimeInputValue(value) {
  return value ? String(value).slice(0, 16) : "";
}
function matchTimeText(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}
function oversText(balls) { return `${balls || 0} Balls`; }
function scoreOf(match) {
  const runs = Object.values(match.batting || {}).reduce((sum, row) => sum + Number(row.runs || 0), 0) + Number(match.extras || 0);
  const wickets = Object.values(match.batting || {}).filter((row) => row.out).length;
  const balls = Object.values(match.batting || {}).reduce((sum, row) => sum + Number(row.balls || 0), 0);
  return { runs, wickets, balls, rr: balls ? (runs / balls).toFixed(2) : "0.00" };
}
function bowlingScore(match) {
  return Object.values(match.bowling || {}).reduce((acc, row) => {
    acc.wickets += Number(row.wickets || 0);
    acc.runs += Number(row.runs || 0);
    acc.balls += Number(row.balls || 0);
    return acc;
  }, { wickets: 0, runs: 0, balls: 0 });
}
function matchTitle(match) { return `${teamName(match.teamAId)} vs ${teamName(match.teamBId)}`; }
function teamBadge(teamId) {
  const team = byId(data.teams, teamId);
  return `<span class="team-logo ${team?.logo ? "has-logo" : ""}" style="--team:${team?.color || "#ff8a1f"}">${team?.logo ? `<img src="${esc(team.logo)}" alt="${esc(team.name)} logo">` : esc(initials(team?.name || teamId))}</span>`;
}
function playerOptions(selected = "", teamId = "") {
  const players = teamId ? teamPlayers(teamId) : data.players;
  return `<option value="">Select player</option>${players.map((p) => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(p.name)} - ${esc(teamName(p.teamId))}</option>`).join("")}`;
}
function teamOptions(selected = "") {
  return `<option value="">Select team</option>${data.teams.map((t) => `<option value="${t.id}" ${t.id === selected ? "selected" : ""}>${esc(t.name)}</option>`).join("")}`;
}
function matchOptions(selected = "", status = "") {
  const matches = status ? data.matches.filter((m) => m.status === status) : data.matches;
  return matches.map((m) => `<option value="${m.id}" ${m.id === selected ? "selected" : ""}>W${m.week} - ${esc(matchTitle(m))}</option>`).join("");
}
function battingRows(match) {
  const players = teamPlayers(match.battingTeamId);
  return players.map((player) => {
    const row = match.batting[player.id] || { runs: 0, balls: 0, out: false };
    const sr = row.balls ? ((row.runs / row.balls) * 100).toFixed(1) : "0.0";
    const batterName = `${player.name}${row.out ? "" : "*"}`;
    const wicketText = row.out && row.wicketBy ? ` / wicket by ${playerName(row.wicketBy)}` : "";
    return `<tr><td><strong>${esc(batterName)}</strong> ${match.openers.includes(player.id) ? "<span class='pill'>Opener</span>" : ""}<div class="muted">${row.out ? `out${wicketText} / future scoring 50%` : "not out"}</div></td><td class="orange">${row.runs || 0}</td><td>${row.balls || 0}</td><td>${sr}</td></tr>`;
  }).join("");
}
function bowlingRows(match) {
  const players = teamPlayers(match.bowlingTeamId);
  return players.map((player) => {
    const row = match.bowling[player.id] || { runs: 0, balls: 0, wickets: 0 };
    const economy = row.balls ? (Math.max(0, row.runs) / row.balls).toFixed(2) : "0.00";
    const day = match.selectedBowlers.find((b) => b.playerId === player.id)?.day || "";
    return `<tr><td><strong>${esc(player.name)}</strong> ${day ? `<span class="pill">${esc(day)}</span>` : ""}</td><td>${row.balls || 0}</td><td>${row.runs || 0}</td><td class="purple">${row.wickets || 0}</td><td>${economy}</td></tr>`;
  }).join("");
}
function sponsorLogo(item) {
  if (item?.logo) return `<img src="${esc(item.logo)}" alt="${esc(item.name)} logo">`;
  return `<span>${esc(initials(item?.name || "SP"))}</span>`;
}
function sponsorRibbon() {
  const sponsors = data.sponsors || seed.sponsors;
  const partners = sponsors.partners || [];
  const sponsorItems = `
    <div class="sponsor-item title-sponsor"><small>Title Sponsor</small>${sponsorLogo(sponsors.title)}<strong>${esc(sponsors.title?.name || "Title Sponsor")}</strong></div>
    <div class="sponsor-item"><small>Powered By</small>${sponsorLogo(sponsors.poweredBy)}<strong>${esc(sponsors.poweredBy?.name || "Powered By")}</strong></div>
    ${partners.slice(0, 4).map((sponsor) => `<div class="sponsor-item"><small>${esc(sponsor.note || "Sponsor")}</small>${sponsorLogo(sponsor)}<strong>${esc(sponsor.name)}</strong></div>`).join("")}
  `;
  return `<div class="sponsor-ribbon">
    <div class="sponsor-track">${sponsorItems}${sponsorItems}</div>
  </div>`;
}
function ensureBattingRow(match, playerId) {
  match.batting[playerId] ||= { runs: 0, balls: 0, out: false, wicketBy: "", events: [] };
  match.batting[playerId].events ||= [];
  return match.batting[playerId];
}
function ensureBowlingRow(match, playerId) {
  match.bowling[playerId] ||= { wickets: 0, runs: 0, balls: 0, events: [] };
  match.bowling[playerId].events ||= [];
  return match.bowling[playerId];
}
function scoringBreakdown(title, events, fallbackText) {
  return `<div class="card" style="margin-top:1rem">
    <h3 class="panel-title">${esc(title)}</h3>
    <div class="event-list">
      ${events.length ? events.map((event) => `
        <div class="event-row">
          <div>
            <strong>${esc(event.label)}</strong>
            <span class="muted">${esc(event.detail || "")}</span>
          </div>
          <div class="event-score">${esc(event.summary)}</div>
        </div>
      `).join("") : `<p class="muted">${esc(fallbackText)}</p>`}
    </div>
  </div>`;
}
function batsmenSummary(match) {
  return teamPlayers(match.battingTeamId).map((player) => {
    const row = match.batting[player.id] || { runs: 0, balls: 0, out: false };
    const sr = row.balls ? ((row.runs / row.balls) * 100).toFixed(1) : "0.0";
    const name = `${player.name}${row.out ? "" : "*"}`;
    const status = row.out
      ? `out${row.wicketBy ? ` / wicket by ${playerName(row.wicketBy)}` : ""} / 50% future score`
      : "not out";
    return `
      <div class="player-summary clickable-player" data-action="open-player-detail" data-match="${match.id}" data-player="${player.id}" role="button" tabindex="0" aria-label="Open scoring details for ${esc(player.name)}">
        <div>
          <strong>${esc(name)}</strong>
          <span class="muted">${esc(status)} ${match.openers.includes(player.id) ? " / opener" : ""}</span>
        </div>
        <div class="score-metrics">
          <span><b>${row.runs || 0}</b><small>R</small></span>
          <span><b>${row.balls || 0}</b><small>B</small></span>
          <span><b>${sr}</b><small>SR</small></span>
        </div>
      </div>
    `;
  }).join("");
}
function bowlersSummary(match) {
  return teamPlayers(match.bowlingTeamId).map((player) => {
    const row = match.bowling[player.id] || { runs: 0, balls: 0, wickets: 0 };
    const economy = row.balls ? (Math.max(0, row.runs) / row.balls).toFixed(2) : "0.00";
    const day = match.selectedBowlers.find((b) => b.playerId === player.id)?.day || "";
    return `
      <div class="player-summary bowler-summary clickable-player" data-action="open-player-detail" data-match="${match.id}" data-player="${player.id}" role="button" tabindex="0" aria-label="Open scoring details for ${esc(player.name)}">
        <div>
          <strong>${esc(player.name)}</strong>
          <span class="muted">${day ? `bowling day: ${day}` : "bowler"}</span>
        </div>
        <div class="score-metrics">
          <span><b>${row.balls || 0}</b><small>B</small></span>
          <span><b>${row.runs || 0}</b><small>R</small></span>
          <span><b>${row.wickets || 0}</b><small>W</small></span>
          <span><b>${economy}</b><small>Econ</small></span>
        </div>
      </div>
    `;
  }).join("");
}

function renderShell(content) {
  app.innerHTML = `
    <section class="screen active"><div class="wrap">${sponsorRibbon()}${content}</div></section>
  `;
  [...nav.querySelectorAll("a")].forEach((link) => link.classList.toggle("active", link.dataset.route === route));
}

function homeView() {
  const liveMatches = data.matches.filter((m) => m.status === "live");
  const sponsors = data.sponsors || seed.sponsors;
  renderShell(`
    <div class="hero">
      <div class="home-sponsor-hero">
        <div class="home-main-sponsor">
          <small>Title Sponsor</small>
          ${sponsorLogo(sponsors.title)}
          <strong>${esc(sponsors.title?.name || "Title Sponsor")}</strong>
        </div>
        <h1>Diorite Premier League 2.0</h1>
        <div class="home-main-sponsor powered">
          <small>Powered By</small>
          ${sponsorLogo(sponsors.poweredBy)}
          <strong>${esc(sponsors.poweredBy?.name || "Powered By")}</strong>
        </div>
        <div class="hero-actions">
          <a class="button primary" href="#dashboard" data-route="dashboard">Open Live Dashboard</a>
          <a class="button purple" href="#admin" data-route="admin">Admin Panel</a>
        </div>
      </div>
      <div class="grid">
        ${liveMatches.length ? liveMatches.map((match, index) => `
          <div class="card match-card home-live-card">
            <span class="live-badge">Live Match ${index + 1}</span>
            <h2 class="panel-title" style="margin-top:1rem">${esc(matchTitle(match))}</h2>
            ${homeLiveScoreCard(match)}
          </div>
        `).join("") : `
          <div class="card match-card">
            <span class="live-badge">Live Desk</span>
            <h2 class="panel-title" style="margin-top:1rem">No live match selected</h2>
            <div class="empty">Set any match to live from admin.</div>
          </div>
        `}
      </div>
    </div>
    <div class="grid four">
      ${data.teams.map((team) => `
        <article class="card">
          <div class="team-strip">${teamBadge(team.id)}<div><h3 class="panel-title">${esc(team.name)}</h3><p class="muted">Group ${esc(team.group)}</p></div></div>
        </article>`).join("")}
    </div>
    <div class="grid three" style="margin-top:1rem">
      <article class="card"><h3>League Format</h3><p class="muted">4 teams split into 2 groups, playing 10 matches across 5 weeks. Each live week can run 2 matches side by side, with Week 5 closing placement matches.</p></article>
      <article class="card"><h3>Rules Summary</h3><p class="muted">Batting actions score runs and balls. Bowling actions claim wickets or penalties. After a wicket, that player's future batting scoring is halved. A full team all out stops remaining scoring.</p></article>
      <article class="card"><h3>Awards Summary</h3><p class="muted">Orange Cap, Purple Cap, Best Strike Rate, Best Economy, MVP, and Match awards update from scorecards and can be edited from admin.</p></article>
    </div>
    <div class="card" style="margin-top:1rem">
      <div class="section-head"><h2>10 Matches Across 5 Weeks</h2><span class="pill">Fixture Grid</span></div>
      <div class="grid two">${data.matches.map(matchFixtureCard).join("")}</div>
    </div>
  `);
}

function homeLiveScoreCard(match) {
  const score = scoreOf(match);
  const openers = match.openers.map(playerName).join(", ") || "Openers not selected";
  const bowlers = match.selectedBowlers.map((bowler) => `${playerName(bowler.playerId)}${bowler.day ? ` (${bowler.day})` : ""}`).join(", ") || "Bowlers not selected";
  const days = match.selectedBowlers.map((bowler) => bowler.day).filter(Boolean);
  const dayText = days.length ? Array.from(new Set(days)).join(", ") : `Week ${match.week}`;
  return `
    <div class="home-match-time">Week ${match.week}${dayText !== `Week ${match.week}` ? ` / ${esc(dayText)}` : ""}</div>
    <div class="home-scoreline">
      <div class="home-team-block">
        <div class="team-strip">${teamBadge(match.battingTeamId)}<div><strong>${esc(teamName(match.battingTeamId))}</strong><p class="muted">Batting team</p></div></div>
        <p><strong>Openers</strong><span>${esc(openers)}</span></p>
      </div>
      <div class="home-score-number">${score.runs}/${score.wickets}</div>
      <div class="home-team-block">
        <div class="team-strip bowling-strip"><div><strong>${esc(teamName(match.bowlingTeamId))}</strong><p class="muted">Bowling team</p></div>${teamBadge(match.bowlingTeamId)}</div>
        <p><strong>Bowler</strong><span>${esc(bowlers)}</span></p>
      </div>
    </div>
    <div class="home-score-meta">
      <span>${oversText(score.balls)}</span>
      <span>RR ${score.rr}</span>
      <span>Inn ${match.innings}</span>
      <span class="${match.powerplay ? "green" : "muted"}">${match.powerplay ? "PP On" : "PP Off"}</span>
    </div>
  `;
}

function liveScoreCard(match, compact = false) {
  const score = scoreOf(match);
  const bowl = bowlingScore(match);
  const openers = match.openers.map(playerName).join(", ") || "Openers not selected";
  const bowlers = match.selectedBowlers.map((bowler) => `${playerName(bowler.playerId)}${bowler.day ? ` (${bowler.day})` : ""}`).join(", ") || "Bowlers not selected";
  const days = match.selectedBowlers.map((bowler) => bowler.day).filter(Boolean);
  const dayText = days.length ? Array.from(new Set(days)).join(", ") : `Week ${match.week}`;
  return `
    <div class="score-click" data-action="open-scorecard" data-id="${match.id}" role="button" tabindex="0" aria-label="Open scorecard for ${esc(matchTitle(match))}">
      <div class="home-match-time">Week ${match.week}${dayText !== `Week ${match.week}` ? ` / ${esc(dayText)}` : ""}</div>
      <div class="home-scoreline">
        <div class="home-team-block">
          <div class="team-strip">${teamBadge(match.battingTeamId)}<div><strong>${esc(teamName(match.battingTeamId))}</strong><p class="muted">Batting team</p></div></div>
          <p><strong>Openers</strong><span>${esc(openers)}</span></p>
        </div>
        <div class="home-score-number">${score.runs}/${score.wickets}</div>
        <div class="home-team-block">
          <div class="team-strip bowling-strip"><div><strong>${esc(teamName(match.bowlingTeamId))}</strong><p class="muted">Bowling team</p></div>${teamBadge(match.bowlingTeamId)}</div>
          <p><strong>Bowler</strong><span>${esc(bowlers)}</span></p>
        </div>
      </div>
      <div class="statline"><span>Innings ${match.innings}</span><span class="${match.powerplay ? "green" : "muted"}">${match.powerplay ? "Powerplay active" : "Powerplay off"}</span><span>RR ${score.rr}</span></div>
      <div class="chips" style="margin-top:.8rem">
        <span class="pill">${oversText(score.balls)}</span>
        <span class="pill">Wickets ${score.wickets}</span>
        <span class="pill">Bowling impact ${bowl.wickets} wkts</span>
        <span class="pill">Tap scoreboard for batsmen and bowlers</span>
      </div>
    </div>
  `;
}

function dashboardView() {
  const liveMatches = data.matches.filter((m) => m.status === "live");
  renderShell(`
    <div class="section-head"><div><span class="live-badge">Live</span><h1 class="page-title">Match Center</h1><p class="lead">IPL-style live scoreboard with innings state, powerplay, run rate, wickets, and commentary. Click any scoreboard to view batsmen and bowlers.</p></div></div>
    ${liveMatches.length ? liveMatches.map((match) => `
      <div class="scoreboard-layout" style="margin-bottom:1rem">
        <article class="card match-card">${liveScoreCard(match)}</article>
        <aside class="card"><h3 class="panel-title">Commentary Feed</h3><div class="commentary">${commentaryHtml(match)}</div></aside>
      </div>
    `).join("") : `<div class="empty">No live matches right now. Set a match status to live in admin.</div>`}
  `);
}

function miniPanel(title, value) {
  return `<div class="card" style="box-shadow:none"><strong>${esc(title)}</strong><p class="muted">${esc(value)}</p></div>`;
}
function scoreTable(title, heads, rows) {
  return `<div class="card"><h3 class="panel-title">${esc(title)}</h3><div class="table-wrap"><table><thead><tr>${heads.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows || "<tr><td colspan='5'>No rows</td></tr>"}</tbody></table></div></div>`;
}
function commentaryHtml(match) {
  return (match.commentary || []).map((c) => `<div class="comment"><strong>${esc(c.time)}</strong>${esc(c.text)}</div>`).join("") || `<div class="empty">No commentary yet.</div>`;
}

function resultsView() {
  const completed = data.matches.filter((m) => m.status === "completed");
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Archive</span><h1 class="page-title">Previous Results</h1></div></div>
    <div class="grid two">
      ${completed.length ? completed.map((match) => {
        const score = scoreOf(match);
        return `<article class="card match-card">
          <h3>${esc(matchTitle(match))}</h3>
          <div class="big-score">${score.runs}/${score.wickets} <span style="font-size:.42em;color:var(--muted)">(${oversText(score.balls)})</span></div>
          <div class="statline"><span>Winner: <strong class="green">${esc(teamName(match.winnerId))}</strong></span><span>MVP: ${esc(playerName(match.matchMvpId))}</span><span>MOTM: ${esc(playerName(match.playerOfMatchId))}</span></div>
          <div class="chips" style="margin-top:.75rem"><span class="pill">Started: ${esc(matchTimeText(match.startAt))}</span><span class="pill">Completed: ${esc(matchTimeText(match.completedAt))}</span></div>
          <button class="button primary small" data-action="open-scorecard" data-id="${match.id}" style="margin-top:1rem">Full Scorecard</button>
        </article>`;
      }).join("") : `<div class="empty">Completed matches will appear here after admin marks them complete.</div>`}
    </div>
  `);
}

function playerAggregates() {
  return playerAggregatesForMatches(data.matches);
}
function playerAggregatesForMatches(matches) {
  const map = {};
  data.players.forEach((p) => map[p.id] = { player: p, runs: 0, balls: 0, outs: 0, wickets: 0, bowlRuns: 0, bowlBalls: 0, motm: 0 });
  matches.forEach((match) => {
    Object.entries(match.batting || {}).forEach(([pid, row]) => {
      if (!map[pid]) return;
      map[pid].runs += Number(row.runs || 0);
      map[pid].balls += Number(row.balls || 0);
      if (row.out) map[pid].outs += 1;
    });
    Object.entries(match.bowling || {}).forEach(([pid, row]) => {
      if (!map[pid]) return;
      map[pid].wickets += Number(row.wickets || 0);
      map[pid].bowlRuns += Number(row.runs || 0);
      map[pid].bowlBalls += Number(row.balls || 0);
    });
    if (match.playerOfMatchId && map[match.playerOfMatchId]) map[match.playerOfMatchId].motm += 1;
  });
  return Object.values(map).map((row) => ({
    ...row,
    strikeRate: row.balls ? (row.runs / row.balls) * 100 : 0,
    economy: row.bowlBalls ? Math.max(0, row.bowlRuns) / row.bowlBalls : 0,
    mvp: row.runs + row.wickets * 25 + row.motm * 15,
  }));
}
function leader(rows, sorter) { return [...rows].sort(sorter)[0]; }
function topPlayers(rows, sorter, filter = () => true) {
  return rows.filter(filter).sort(sorter).slice(0, 5);
}
function leaderboardCard(title, rows, metricLabel, valueGetter, subGetter) {
  const titleEmoji = {
    "Orange Cap": "🟠",
    "Purple Cap": "🟣",
    "Best Strike Rate": "⚡",
    "Best Economy": "🎯",
    "Most Valuable Player": "⭐",
  }[title] || "🏅";
  return `<article class="card leaderboard-card">
    <div class="section-head"><h2>${esc(title)}</h2><span class="pill">Top 5</span></div>
    <div class="leaderboard-list">
      ${rows.length ? rows.map((row, index) => `
        <div class="leaderboard-row">
          <span class="rank ${index === 0 ? "winner-rank" : ""}">${index === 0 ? titleEmoji : index + 1}</span>
          <div>
            <strong>${esc(row.player.name)}</strong>
            <span class="muted">${esc(teamName(row.player.teamId))}${subGetter ? ` / ${esc(subGetter(row))}` : ""}</span>
          </div>
          <div class="leaderboard-value"><b>${esc(valueGetter(row))}</b><small>${esc(metricLabel)}</small></div>
        </div>
      `).join("") : `<p class="muted">No eligible players yet.</p>`}
    </div>
  </article>`;
}
function availableWeeks() {
  return Array.from(new Set(data.matches.map((match) => Number(match.week)).filter(Boolean))).sort((a, b) => a - b);
}
function scopedStatsRows() {
  if (statsScope === "season") return playerAggregates();
  const week = Number(statsScope.replace("week-", ""));
  return playerAggregatesForMatches(data.matches.filter((match) => Number(match.week) === week));
}
function scopedStatsMatches() {
  if (statsScope === "season") return data.matches;
  const week = Number(statsScope.replace("week-", ""));
  return data.matches.filter((match) => Number(match.week) === week);
}
function statsScopeLabel() {
  return statsScope === "season" ? "Whole Season" : `Week ${statsScope.replace("week-", "")}`;
}
function statsView() {
  const rows = playerAggregates();
  const scopedRows = scopedStatsRows();
  const orangeRows = topPlayers(rows, (a, b) => b.runs - a.runs || b.strikeRate - a.strikeRate, (row) => row.runs > 0);
  const purpleRows = topPlayers(rows, (a, b) => b.wickets - a.wickets || b.runs - a.runs, (row) => row.wickets > 0);
  const strikeRows = topPlayers(rows, (a, b) => b.strikeRate - a.strikeRate || b.runs - a.runs, (row) => row.balls > 0);
  const economyRows = topPlayers(rows, (a, b) => a.economy - b.economy || b.wickets - a.wickets, (row) => row.bowlBalls > 0);
  const mvpRows = topPlayers(rows, (a, b) => b.mvp - a.mvp || b.runs - a.runs || b.wickets - a.wickets, (row) => row.runs || row.wickets || row.bowlBalls || row.motm);
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Overall Awards</span><h1 class="page-title">League Leaders</h1><p class="lead">Top 5 players for every overall award across the whole Diorite Premier League. Player of the Match stays match-specific and is shown only in match results.</p></div></div>
    <div class="grid two">
      ${leaderboardCard("Orange Cap", orangeRows, "Runs", (row) => row.runs, (row) => `${row.balls} B / SR ${row.strikeRate.toFixed(1)}`)}
      ${leaderboardCard("Purple Cap", purpleRows, "Wkts", (row) => row.wickets, (row) => `${row.bowlBalls} B / Econ ${row.economy.toFixed(2)}`)}
      ${leaderboardCard("Best Strike Rate", strikeRows, "SR", (row) => row.strikeRate.toFixed(1), (row) => `${row.runs} R / ${row.balls} B`)}
      ${leaderboardCard("Best Economy", economyRows, "Econ", (row) => row.economy.toFixed(2), (row) => `${row.wickets} W / ${row.bowlBalls} B`)}
      ${leaderboardCard("Most Valuable Player", mvpRows, "MVP", (row) => row.mvp, (row) => `${row.runs} R / ${row.wickets} W`)}
    </div>
    <div class="card" style="margin-top:1rem">
      <div class="section-head">
        <h2>Detailed Player Stats</h2>
        <label class="scope-select">View<select data-action="select-stats-scope">
          <option value="season" ${statsScope === "season" ? "selected" : ""}>Whole Season</option>
          ${availableWeeks().map((week) => `<option value="week-${week}" ${statsScope === `week-${week}` ? "selected" : ""}>Week ${week}</option>`).join("")}
        </select></label>
      </div>
      <p class="muted">Showing ${esc(statsScopeLabel())} stats.</p>
      <div class="table-wrap"><table><thead><tr><th>Player</th><th>Team</th><th>Runs</th><th>Balls</th><th>SR</th><th>Outs</th><th>Wkts</th><th>Bowl Runs</th><th>Bowl Balls</th><th>Economy</th><th>MVP</th></tr></thead><tbody>
        ${scopedRows.sort((a,b) => b.mvp - a.mvp).map((r) => `<tr class="clickable-row" data-action="open-stats-player-detail" data-player="${r.player.id}" tabindex="0"><td>${esc(r.player.name)}</td><td>${esc(teamName(r.player.teamId))}</td><td class="orange">${r.runs}</td><td>${r.balls}</td><td>${r.strikeRate.toFixed(1)}</td><td>${r.outs}</td><td class="purple">${r.wickets}</td><td>${r.bowlRuns}</td><td>${r.bowlBalls}</td><td>${r.bowlBalls ? r.economy.toFixed(2) : "-"}</td><td>${r.mvp}</td></tr>`).join("")}
      </tbody></table></div>
    </div>
  `);
}

function pointsRows() {
  return data.teams.map((team) => {
    const completed = data.matches.filter((m) => m.status === "completed" && [m.teamAId, m.teamBId].includes(team.id));
    const wins = completed.filter((m) => m.winnerId === team.id).length;
    let rf = 0, ra = 0;
    completed.forEach((m) => {
      const s = scoreOf(m).runs;
      if (m.battingTeamId === team.id) rf += s; else ra += s;
    });
    return { team, matches: completed.length, wins, losses: completed.length - wins, points: wins * 2, rf, ra, nrr: completed.length ? ((rf - ra) / completed.length).toFixed(2) : "0.00" };
  }).sort((a,b) => b.points - a.points || Number(b.nrr) - Number(a.nrr));
}
function scoringCriteriaSection() {
  const batting = scoringRules.batting.map(([, label, runs, balls]) => `
    <div class="criteria-row"><span>${esc(label)}</span><strong>${runs} runs / ${balls} ball${balls === 1 ? "" : "s"}</strong></div>
  `).join("");
  const extras = scoringRules.extras.map(([, label, runs]) => `
    <div class="criteria-row"><span>${esc(label)}</span><strong>${runs} team runs</strong></div>
  `).join("");
  const bowling = scoringRules.bowling.map(([, label, wickets, runs]) => `
    <div class="criteria-row"><span>${esc(label)}</span><strong>${wickets} wicket${wickets === 1 ? "" : "s"}${runs ? ` / ${runs} runs` : ""}</strong></div>
  `).join("");
  return `
    <div class="card" style="margin-top:1rem">
      <div class="section-head"><div><span class="eyebrow">Rules</span><h2>Scoring and Wicket Criteria</h2></div></div>
      <div class="grid two">
        <article class="criteria-card"><h3>Batting Scoring</h3><div class="criteria-list">${batting}</div></article>
        <article class="criteria-card"><h3>Extras</h3><div class="criteria-list">${extras}</div><h3 style="margin-top:1rem">Wicket Rule</h3><div class="criteria-list"><div class="criteria-row"><span>Player loses wicket</span><strong>All future scoring becomes 50%</strong></div><div class="criteria-row"><span>Full team all out</span><strong>No more scoring allowed for that innings</strong></div></div></article>
        <article class="criteria-card full"><h3>Bowling and Wicket Claims</h3><div class="criteria-list">${bowling}</div></article>
      </div>
    </div>
  `;
}
function pointsView() {
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Standings</span><h1 class="page-title">Points Table</h1></div></div>
    <div class="card"><div class="table-wrap"><table><thead><tr><th>Team</th><th>M</th><th>W</th><th>L</th><th>Pts</th><th>Runs For</th><th>Runs Against</th><th>NRR</th></tr></thead><tbody>
      ${pointsRows().map((r) => `<tr><td><div class="team-strip">${teamBadge(r.team.id)}<strong>${esc(r.team.name)}</strong></div></td><td>${r.matches}</td><td class="green">${r.wins}</td><td>${r.losses}</td><td class="orange">${r.points}</td><td>${r.rf}</td><td>${r.ra}</td><td>${r.nrr}</td></tr>`).join("")}
    </tbody></table></div></div>
    ${scoringCriteriaSection()}
  `);
}

function matchFixtureCard(match) {
  return `<article class="card"><div class="statline" style="border:0;margin:0;padding:0"><span>Week ${match.week}</span><span class="${match.status === "live" ? "green" : match.status === "completed" ? "orange" : "muted"}">${match.status}</span></div><h3>${esc(matchTitle(match))}</h3><p class="muted">${esc(match.venue)}</p></article>`;
}

function adminView() {
  if (!adminUnlocked) {
    renderShell(`
      <div class="card" style="max-width:520px;margin:4rem auto">
        <span class="eyebrow">Protected Admin</span>
        <h1 class="page-title" style="font-size:3rem">Unlock Control Room</h1>
        <form data-form="login" class="grid">
          <label>Password<input type="password" name="password" placeholder="Enter admin password" autocomplete="current-password"></label>
          <button class="button primary">Unlock Admin</button>
        </form>
      </div>
    `);
    return;
  }
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Admin</span><h1 class="page-title">Control Room</h1></div><button class="button danger" data-action="lock-admin">Lock</button></div>
    <div class="admin-shell">
      <aside class="admin-tabs">${["live","teams","players","matches","awards","sponsors","backup"].map((tab) => `<button data-action="admin-tab" data-tab="${tab}" class="${adminTab === tab ? "active" : ""}">${tab[0].toUpperCase() + tab.slice(1)}</button>`).join("")}</aside>
      <div>
        ${adminPanel("live", liveAdmin())}
        ${adminPanel("teams", teamsAdmin())}
        ${adminPanel("players", playersAdmin())}
        ${adminPanel("matches", matchesAdmin())}
        ${adminPanel("awards", awardsAdmin())}
        ${adminPanel("sponsors", sponsorsAdmin())}
        ${adminPanel("backup", backupAdmin())}
      </div>
    </div>
  `);
}
function adminPanel(name, html) { return `<section class="admin-panel ${adminTab === name ? "active" : ""}" data-panel="${name}">${html}</section>`; }
function activeAdminMatch() {
  return byId(data.matches, adminLiveMatchId) || data.matches.find((m) => m.status === "live") || data.matches[0];
}
function liveAdmin() {
  const match = activeAdminMatch();
  return `<div class="grid">
    <div class="card"><h2>Edit Live Scores</h2><form class="form-grid" data-form="match-state">
      <label>Match<select name="matchId" data-action="select-admin-live-match">${matchOptions(match.id)}</select></label>
      <label>Status<select name="status"><option ${match.status==="upcoming"?"selected":""}>upcoming</option><option ${match.status==="live"?"selected":""}>live</option><option ${match.status==="completed"?"selected":""}>completed</option></select></label>
      <label>Batting team<select name="battingTeamId">${teamOptions(match.battingTeamId)}</select></label>
      <label>Bowling team<select name="bowlingTeamId">${teamOptions(match.bowlingTeamId)}</select></label>
      <label>Toss winner<select name="tossWinnerId">${teamOptions(match.tossWinnerId)}</select></label>
      <label>Current innings<input name="innings" type="number" min="1" max="2" value="${match.innings}"></label>
      <label>Match starts at<input name="startAt" type="datetime-local" value="${esc(dateTimeInputValue(match.startAt))}"></label>
      <label>Match completed at<input name="completedAt" type="datetime-local" value="${esc(dateTimeInputValue(match.completedAt))}"></label>
      <label>Secret imposter<select name="secretImposterId">${playerOptions(match.secretImposterId)}</select></label>
      <label>Powerplay<select name="powerplay"><option value="true" ${match.powerplay ? "selected" : ""}>On</option><option value="false" ${!match.powerplay ? "selected" : ""}>Off</option></select></label>
      <label>Opener 1<select name="opener1">${playerOptions(match.openers[0], match.battingTeamId)}</select></label>
      <label>Opener 2<select name="opener2">${playerOptions(match.openers[1], match.battingTeamId)}</select></label>
      ${[0,1,2].map((i) => `<label>Bowler ${i+1}<select name="bowler${i}">${playerOptions(match.selectedBowlers[i]?.playerId, match.bowlingTeamId)}</select></label><label>Bowling day ${i+1}<input name="bowlerDay${i}" value="${esc(match.selectedBowlers[i]?.day || "")}" placeholder="Monday"></label>`).join("")}
      <button class="button primary full">Save Match State</button>
    </form></div>
    <div class="grid two">
      <div class="card"><h3>Batting Scoring</h3><form class="grid" data-form="batting-score"><input type="hidden" name="matchId" value="${match.id}"><label>Player<select name="playerId">${playerOptions("", match.battingTeamId)}</select></label><label>Scoring event<select name="event">${scoringRules.batting.map(([key,label,r,b]) => `<option value="${key}">${label} (${r}/${b})</option>`).join("")}</select></label><label>Quantity<input type="number" name="qty" min="1" value="1"></label><button class="button primary">Add Runs</button></form><div class="chips" style="margin-top:.75rem">${scoringRules.extras.map(([key,label,r]) => `<button class="button small" data-action="add-extra" data-match="${match.id}" data-key="${key}">${label} +${r}</button>`).join("")}</div></div>
      <div class="card"><h3>Bowling / Wickets</h3><form class="grid" data-form="bowling-score"><input type="hidden" name="matchId" value="${match.id}"><label>Bowler<select name="playerId">${playerOptions("", match.bowlingTeamId)}</select></label><label>Bowling event<select name="event">${scoringRules.bowling.map(([key,label,w,r]) => `<option value="${key}">${label} (${w} wicket, ${r} runs)</option>`).join("")}</select></label><label>Target batter<select name="targetId">${playerOptions("", match.battingTeamId)}</select></label><button class="button purple">Apply Bowling Impact</button></form></div>
    </div>
    <div class="grid two">
      <div class="card"><h3>Player Wickets</h3><div class="mini-list">${teamPlayers(match.battingTeamId).map((p) => {
        const row = match.batting[p.id] || { out: false, wicketBy: "" };
        return `<div class="list-item wicket-admin-row">
          <span>${esc(p.name)} <small class="muted">${row.out ? `Out${row.wicketBy ? ` / wicket by ${playerName(row.wicketBy)}` : ""} / future scoring 50%` : "Not out"}</small></span>
          <label class="compact-label">Wicket by<select data-action="select-wicket-bowler" data-match="${match.id}" data-player="${p.id}">${playerOptions(row.wicketBy || "", match.bowlingTeamId)}</select></label>
          <button class="button small purple" data-action="toggle-out" data-match="${match.id}" data-player="${p.id}">${row.out ? "Undo out" : "Mark out"}</button>
        </div>`;
      }).join("")}</div><button class="button danger" data-action="all-out" data-match="${match.id}" style="margin-top:.75rem">Mark Team All Out</button></div>
      <div class="card"><h3>Complete Match</h3><form class="grid" data-form="complete-match"><input type="hidden" name="matchId" value="${match.id}"><label>Winner<select name="winnerId">${teamOptions(match.winnerId)}</select></label><label>Match MVP<select name="matchMvpId">${playerOptions(match.matchMvpId)}</select></label><label>Man of the Match<select name="playerOfMatchId">${playerOptions(match.playerOfMatchId)}</select></label><label>Completed at<input name="completedAt" type="datetime-local" value="${esc(dateTimeInputValue(match.completedAt))}"></label><button class="button green">Complete and Move to Results</button></form><button class="button small" data-action="open-scorecard" data-id="${match.id}" style="margin-top:.75rem">Preview Scorecard</button></div>
    </div>
    <div class="card"><h3>Edit Commentary</h3><form class="grid" data-form="commentary"><input type="hidden" name="matchId" value="${match.id}"><label>Ball / Time<input name="time" placeholder="12.4"></label><label>Commentary<textarea name="text" placeholder="Add match event"></textarea></label><button class="button primary">Add Commentary</button></form><div class="commentary" style="margin-top:1rem">${commentaryHtml(match)}</div></div>
  </div>`;
}
function teamsAdmin() {
  return `<div class="grid two"><div class="card"><h2>Add / Edit Team</h2><form class="form-grid" data-form="team"><input type="hidden" name="id"><label>Name<input name="name" required></label><label>Group<select name="group"><option>A</option><option>B</option></select></label><label>Color<input name="color" type="color" value="#ff8a1f"></label><label>Team logo URL/path<input name="logo" placeholder="./assets/team-logo.png or https://..."></label><button class="button primary full">Save Team</button></form></div><div class="card"><h2>Teams</h2><div class="mini-list">${data.teams.map((t) => `<div class="list-item"><span>${teamBadge(t.id)} ${esc(t.name)} / Group ${esc(t.group)}</span><span><button class="button small" data-action="edit-team" data-id="${t.id}">Edit</button> <button class="button small danger" data-action="delete-team" data-id="${t.id}">Remove</button></span></div>`).join("")}</div></div></div>`;
}
function playersAdmin() {
  return `<div class="grid two"><div class="card"><h2>Add / Edit Player</h2><form class="form-grid" data-form="player"><input type="hidden" name="id"><label>Name<input name="name" required></label><label>Team<select name="teamId">${teamOptions()}</select></label><button class="button primary full">Save Player</button></form></div><div class="card"><h2>Players</h2><div class="mini-list">${data.players.map((p) => `<div class="list-item"><span>${esc(p.name)} <small class="muted">${esc(teamName(p.teamId))}</small></span><span><button class="button small" data-action="edit-player" data-id="${p.id}">Edit</button> <button class="button small danger" data-action="delete-player" data-id="${p.id}">Remove</button></span></div>`).join("")}</div></div></div>`;
}
function matchesAdmin() {
  return `<div class="grid two"><div class="card"><h2>Add / Edit Match</h2><form class="form-grid" data-form="match"><input type="hidden" name="id"><label>Week<input name="week" type="number" min="1" value="1"></label><label>Status<select name="status"><option>upcoming</option><option>live</option><option>completed</option></select></label><label>Team A<select name="teamAId">${teamOptions()}</select></label><label>Team B<select name="teamBId">${teamOptions()}</select></label><label>Match starts at<input name="startAt" type="datetime-local"></label><label>Match completed at<input name="completedAt" type="datetime-local"></label><label class="full">Venue<input name="venue" value="DPL Arena"></label><button class="button primary full">Save Match</button></form></div><div class="card"><h2>Matches</h2><div class="mini-list">${data.matches.map((m) => `<div class="list-item"><span>W${m.week} - ${esc(matchTitle(m))} <small class="muted">${m.status} / Start: ${esc(matchTimeText(m.startAt))} / Done: ${esc(matchTimeText(m.completedAt))}</small></span><span><button class="button small" data-action="edit-match" data-id="${m.id}">Edit</button> <button class="button small danger" data-action="delete-match" data-id="${m.id}">Remove</button></span></div>`).join("")}</div></div></div>`;
}
function awardsAdmin() {
  const rows = playerAggregates();
  const orangeRows = topPlayers(rows, (a, b) => b.runs - a.runs || b.strikeRate - a.strikeRate, (row) => row.runs > 0);
  const purpleRows = topPlayers(rows, (a, b) => b.wickets - a.wickets || b.runs - a.runs, (row) => row.wickets > 0);
  const strikeRows = topPlayers(rows, (a, b) => b.strikeRate - a.strikeRate || b.runs - a.runs, (row) => row.balls > 0);
  const economyRows = topPlayers(rows, (a, b) => a.economy - b.economy || b.wickets - a.wickets, (row) => row.bowlBalls > 0);
  const mvpRows = topPlayers(rows, (a, b) => b.mvp - a.mvp || b.runs - a.runs || b.wickets - a.wickets, (row) => row.runs || row.wickets || row.bowlBalls || row.motm);
  return `<div class="card">
    <span class="eyebrow">Overall Awards</span>
    <h2>League Award Leaderboards</h2>
    <p class="muted">Overall awards are calculated from full league performance. Player of the Match remains match-specific and appears in Previous Results.</p>
    <div class="grid two" style="margin-top:1rem">
      ${leaderboardCard("Orange Cap", orangeRows, "Runs", (row) => row.runs, (row) => `${row.balls} B / SR ${row.strikeRate.toFixed(1)}`)}
      ${leaderboardCard("Purple Cap", purpleRows, "Wkts", (row) => row.wickets, (row) => `${row.bowlBalls} B / Econ ${row.economy.toFixed(2)}`)}
      ${leaderboardCard("Best Strike Rate", strikeRows, "SR", (row) => row.strikeRate.toFixed(1), (row) => `${row.runs} R / ${row.balls} B`)}
      ${leaderboardCard("Best Economy", economyRows, "Econ", (row) => row.economy.toFixed(2), (row) => `${row.wickets} W / ${row.bowlBalls} B`)}
      ${leaderboardCard("Most Valuable Player", mvpRows, "MVP", (row) => row.mvp, (row) => `${row.runs} R / ${row.wickets} W`)}
    </div>
  </div>`;
}
function sponsorsAdmin() {
  const sponsors = data.sponsors || seed.sponsors;
  return `<div class="grid two">
    <div class="card">
      <h2>Title Sponsor and Powered By</h2>
      <form class="form-grid" data-form="sponsor-config">
        <label>Title sponsor name<input name="titleName" value="${esc(sponsors.title?.name || "")}"></label>
        <label>Title sponsor logo URL/path<input name="titleLogo" value="${esc(sponsors.title?.logo || "")}" placeholder="./assets/logo.png or https://..."></label>
        <label>Powered by name<input name="poweredName" value="${esc(sponsors.poweredBy?.name || "")}"></label>
        <label>Powered by logo URL/path<input name="poweredLogo" value="${esc(sponsors.poweredBy?.logo || "")}" placeholder="./assets/logo.png or https://..."></label>
        <button class="button primary full">Save Main Sponsors</button>
      </form>
    </div>
    <div class="card">
      <h2>Add / Edit Sponsor</h2>
      <form class="form-grid" data-form="sponsor">
        <input type="hidden" name="id">
        <label>Name<input name="name" required></label>
        <label>Sponsoring for<input name="note" placeholder="Orange Cap, Match Balls, Awards, Refreshments"></label>
        <label class="full">Logo URL/path<input name="logo" placeholder="./assets/sponsor.png or https://..."></label>
        <button class="button primary full">Save Sponsor</button>
      </form>
    </div>
    <div class="card full">
      <h2>Sponsors</h2>
      <div class="mini-list">${(sponsors.partners || []).map((sponsor) => `<div class="list-item"><span>${sponsorLogo(sponsor)} ${esc(sponsor.name)} <small class="muted">${esc(sponsor.note || "Sponsor")}</small></span><span><button class="button small" data-action="edit-sponsor" data-id="${sponsor.id}">Edit</button> <button class="button small danger" data-action="delete-sponsor" data-id="${sponsor.id}">Remove</button></span></div>`).join("") || `<div class="empty">No supporting sponsors added yet.</div>`}</div>
    </div>
  </div>`;
}
function backupAdmin() {
  return `<div class="grid two"><div class="card"><h2>Export / Import JSON Backup</h2><div class="toolbar"><button class="button primary" data-action="export-json">Export JSON</button><button class="button danger" data-action="reset-data">Reset Data</button></div><form class="grid" data-form="import-json" style="margin-top:1rem"><label>Paste JSON backup<textarea name="json"></textarea></label><button class="button green">Import Backup</button></form></div><div class="card"><h2>Current Backup</h2><textarea readonly style="min-height:360px">${esc(JSON.stringify(data, null, 2))}</textarea></div></div>`;
}

function openScorecard(matchId) {
  const match = byId(data.matches, matchId);
  const score = scoreOf(match);
  modalBody.innerHTML = `<h2>${esc(matchTitle(match))}</h2>
    ${liveScoreCard(match, true)}
    <div class="grid two" style="margin-top:1rem">
      ${miniPanel("Opening batsmen", match.openers.map(playerName).join(", ") || "Not selected")}
      ${miniPanel("Selected bowlers", match.selectedBowlers.map((b) => `${playerName(b.playerId)} (${b.day})`).join(", ") || "Not selected")}
    </div>
    <div class="grid two player-detail-grid" style="margin-top:1rem">
      <div class="card"><h3 class="panel-title">Batsmen</h3><div class="player-summary-list">${batsmenSummary(match)}</div></div>
      <div class="card"><h3 class="panel-title">Bowlers</h3><div class="player-summary-list">${bowlersSummary(match)}</div></div>
    </div>
    <div class="card" style="margin-top:1rem"><h3>Match Summary</h3><p class="muted">Score: ${esc(teamName(match.battingTeamId))} ${score.runs}/${score.wickets} (${oversText(score.balls)})</p><p class="muted">Started: ${esc(matchTimeText(match.startAt))}. Completed: ${esc(matchTimeText(match.completedAt))}.</p><p class="muted">Secret imposter: ${esc(playerName(match.secretImposterId))}. Winner: ${esc(teamName(match.winnerId))}. MVP: ${esc(playerName(match.matchMvpId))}. MOTM: ${esc(playerName(match.playerOfMatchId))}.</p><p class="muted">* not out</p></div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openPlayerDetail(matchId, playerId) {
  const match = byId(data.matches, matchId);
  const player = byId(data.players, playerId);
  if (!match || !player) return;
  const batting = match.batting[playerId] || { runs: 0, balls: 0, out: false, wicketBy: "" };
  const bowling = match.bowling[playerId] || { runs: 0, balls: 0, wickets: 0 };
  const battingEvents = batting.events || [];
  const bowlingEvents = bowling.events || [];
  const strikeRate = batting.balls ? ((batting.runs / batting.balls) * 100).toFixed(1) : "0.0";
  const economy = bowling.balls ? (Math.max(0, bowling.runs) / bowling.balls).toFixed(2) : "0.00";
  const bowlingDay = match.selectedBowlers.find((b) => b.playerId === playerId)?.day || "";
  const roles = [
    match.openers.includes(playerId) ? "Opening batsman" : "",
    bowlingDay ? `Selected bowler: ${bowlingDay}` : "",
    match.secretImposterId === playerId ? "Secret imposter" : "",
  ].filter(Boolean);

  modalBody.innerHTML = `<div class="section-head">
      <div>
        <span class="eyebrow">Player Details</span>
        <h2>${esc(player.name)}</h2>
        <p class="muted">${esc(teamName(player.teamId))} / ${esc(matchTitle(match))}</p>
      </div>
      <button class="button small" data-action="open-scorecard" data-id="${match.id}">Back to Scorecard</button>
    </div>
    <div class="grid two">
      <div class="card">
        <h3 class="panel-title">Batting Score</h3>
        <div class="player-detail-line"><span>Runs</span><strong class="orange">${batting.runs || 0}</strong></div>
        <div class="player-detail-line"><span>Balls</span><strong>${batting.balls || 0}</strong></div>
        <div class="player-detail-line"><span>Strike Rate</span><strong>${strikeRate}</strong></div>
        <div class="player-detail-line"><span>Status</span><strong>${batting.out ? "Out" : "Not out *"}</strong></div>
        <div class="player-detail-line"><span>Wicket by</span><strong>${batting.out && batting.wicketBy ? esc(playerName(batting.wicketBy)) : "-"}</strong></div>
        <p class="muted" style="margin-bottom:0">${batting.out ? "Future batting scoring is counted at 50%." : "* not out"}</p>
      </div>
      <div class="card">
        <h3 class="panel-title">Bowling Impact</h3>
        <div class="player-detail-line"><span>Balls</span><strong>${bowling.balls || 0}</strong></div>
        <div class="player-detail-line"><span>Runs +/-</span><strong>${bowling.runs || 0}</strong></div>
        <div class="player-detail-line"><span>Wickets</span><strong class="purple">${bowling.wickets || 0}</strong></div>
        <div class="player-detail-line"><span>Economy</span><strong>${economy}</strong></div>
        <div class="player-detail-line"><span>Bowling day</span><strong>${esc(bowlingDay || "-")}</strong></div>
      </div>
    </div>
    <div class="card" style="margin-top:1rem">
      <h3 class="panel-title">Match Role</h3>
      <div class="chips">${roles.length ? roles.map((role) => `<span class="pill">${esc(role)}</span>`).join("") : `<span class="pill">Squad player</span>`}</div>
    </div>
    ${scoringBreakdown(
      "How They Scored",
      battingEvents,
      (batting.runs || batting.balls) ? "This batting total was recorded before detailed event tracking was added. New scoring entries will show here with rule-wise details." : "No batting scoring events recorded yet."
    )}
    ${scoringBreakdown(
      "How They Took Wickets / Bowling Impact",
      bowlingEvents,
      (bowling.wickets || bowling.runs || bowling.balls) ? "This bowling total was recorded before detailed event tracking was added. New bowling entries will show here with rule-wise details." : "No bowling impact events recorded yet."
    )}`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openStatsPlayerDetail(playerId) {
  const player = byId(data.players, playerId);
  if (!player) return;
  const matches = scopedStatsMatches();
  const aggregate = playerAggregatesForMatches(matches).find((row) => row.player.id === playerId);
  const battingCounts = Object.fromEntries(scoringRules.batting.map(([key, label]) => [key, { label, qty: 0, runs: 0, balls: 0 }]));
  const bowlingCounts = Object.fromEntries(scoringRules.bowling.map(([key, label]) => [key, { label, count: 0, wickets: 0, runs: 0 }]));
  const matchLines = [];

  matches.forEach((match) => {
    const batting = match.batting[playerId];
    const bowling = match.bowling[playerId];
    (batting?.events || []).forEach((event) => {
      if (event.type !== "batting" || !battingCounts[event.key]) return;
      battingCounts[event.key].qty += Number(event.qty || 1);
      battingCounts[event.key].runs += Number(event.runs || 0);
      battingCounts[event.key].balls += Number(event.balls || 0);
    });
    (bowling?.events || []).forEach((event) => {
      if (event.type !== "bowling" || !bowlingCounts[event.key]) return;
      bowlingCounts[event.key].count += 1;
      bowlingCounts[event.key].wickets += Number(event.wickets || 0);
      bowlingCounts[event.key].runs += Number(event.runs || 0);
    });
    if (batting || bowling || match.playerOfMatchId === playerId || match.matchMvpId === playerId) {
      const runs = Number(batting?.runs || 0);
      const balls = Number(batting?.balls || 0);
      const wickets = Number(bowling?.wickets || 0);
      matchLines.push(`<div class="event-row"><div><strong>${esc(matchTitle(match))}</strong><span class="muted">Week ${match.week}${batting?.out ? ` / out${batting.wicketBy ? ` by ${playerName(batting.wicketBy)}` : ""}` : ""}</span></div><div class="event-score">${runs} R / ${balls} B / ${wickets} W</div></div>`);
    }
  });

  const battingRows = Object.values(battingCounts).filter((row) => row.qty || row.runs || row.balls);
  const bowlingRows = Object.values(bowlingCounts).filter((row) => row.count || row.wickets || row.runs);

  modalBody.innerHTML = `<div class="section-head">
      <div>
        <span class="eyebrow">Member Stats</span>
        <h2>${esc(player.name)}</h2>
        <p class="muted">${esc(teamName(player.teamId))} / ${esc(statsScopeLabel())}</p>
      </div>
    </div>
    <div class="grid two">
      <div class="card">
        <h3 class="panel-title">Summary</h3>
        <div class="player-detail-line"><span>Runs</span><strong class="orange">${aggregate?.runs || 0}</strong></div>
        <div class="player-detail-line"><span>Balls</span><strong>${aggregate?.balls || 0}</strong></div>
        <div class="player-detail-line"><span>Strike Rate</span><strong>${aggregate ? aggregate.strikeRate.toFixed(1) : "0.0"}</strong></div>
        <div class="player-detail-line"><span>Wickets</span><strong class="purple">${aggregate?.wickets || 0}</strong></div>
        <div class="player-detail-line"><span>Economy</span><strong>${aggregate?.bowlBalls ? aggregate.economy.toFixed(2) : "-"}</strong></div>
        <div class="player-detail-line"><span>MVP</span><strong>${aggregate?.mvp || 0}</strong></div>
      </div>
      <div class="card">
        <h3 class="panel-title">Activity Breakdown</h3>
        <div class="event-list">
          ${battingRows.length ? battingRows.map((row) => `<div class="event-row"><div><strong>${esc(row.label)}</strong><span class="muted">Quantity ${row.qty}</span></div><div class="event-score">${row.runs} R / ${row.balls} B</div></div>`).join("") : `<p class="muted">No detailed batting events recorded for this scope.</p>`}
        </div>
      </div>
    </div>
    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3 class="panel-title">Bowling Breakdown</h3>
        <div class="event-list">
          ${bowlingRows.length ? bowlingRows.map((row) => `<div class="event-row"><div><strong>${esc(row.label)}</strong><span class="muted">Entries ${row.count}</span></div><div class="event-score">${row.wickets} W / ${row.runs} R</div></div>`).join("") : `<p class="muted">No detailed bowling events recorded for this scope.</p>`}
        </div>
      </div>
      <div class="card">
        <h3 class="panel-title">Match-by-Match</h3>
        <div class="event-list">${matchLines.length ? matchLines.join("") : `<p class="muted">No match activity for this scope.</p>`}</div>
      </div>
    </div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function handleForm(event) {
  const form = event.target.closest("form");
  if (!form) return;
  event.preventDefault();
  const fd = new FormData(form);
  const type = form.dataset.form;
  if (type === "login") {
    if (fd.get("password") === ADMIN_PASSWORD) {
      adminUnlocked = true;
      sessionStorage.setItem("dpl2-admin", "true");
      toast("Admin unlocked");
      render();
    } else toast("Wrong password");
  }
  if (type === "match-state") {
    const match = byId(data.matches, fd.get("matchId"));
    adminLiveMatchId = match.id;
    sessionStorage.setItem("dpl2-admin-live-match", adminLiveMatchId);
    Object.assign(match, {
      status: fd.get("status"), battingTeamId: fd.get("battingTeamId"), bowlingTeamId: fd.get("bowlingTeamId"),
      tossWinnerId: fd.get("tossWinnerId"), secretImposterId: fd.get("secretImposterId"),
      startAt: fd.get("startAt"), completedAt: fd.get("completedAt"),
      innings: Number(fd.get("innings") || 1), powerplay: fd.get("powerplay") === "true",
      openers: [fd.get("opener1"), fd.get("opener2")].filter(Boolean),
      selectedBowlers: [0,1,2].map((i) => ({ playerId: fd.get(`bowler${i}`), day: fd.get(`bowlerDay${i}`) })).filter((b) => b.playerId),
    });
    saveData(); toast("Match state saved"); render();
  }
  if (type === "batting-score") {
    const match = byId(data.matches, fd.get("matchId"));
    if (match.allOut) return toast("Team is all out. No more scoring allowed.");
    const playerId = fd.get("playerId");
    if (!playerId) return toast("Select a batter");
    const rule = scoringRules.batting.find((r) => r[0] === fd.get("event"));
    const qty = Number(fd.get("qty") || 1);
    const row = ensureBattingRow(match, playerId);
    const multiplier = row.out ? 0.5 : 1;
    const addedRuns = Math.round(rule[2] * qty * multiplier * 10) / 10;
    const addedBalls = rule[3] * qty;
    row.runs += addedRuns;
    row.balls += addedBalls;
    row.events.unshift({
      id: id("bat"),
      type: "batting",
      key: rule[0],
      label: rule[1],
      qty,
      baseRuns: rule[2],
      baseBalls: rule[3],
      multiplier,
      runs: addedRuns,
      balls: addedBalls,
      summary: `+${addedRuns} R / ${addedBalls} B`,
      detail: `${qty} x ${rule[2]} run, ${rule[3]} ball rule${multiplier === 0.5 ? " / half score after wicket" : ""}`,
      at: new Date().toISOString(),
    });
    match.commentary.unshift({ time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), text: `${playerName(playerId)} adds ${rule[1]}${multiplier === 0.5 ? " at half score after wicket" : ""}.` });
    saveData(); render();
  }
  if (type === "bowling-score") {
    const match = byId(data.matches, fd.get("matchId"));
    const bowlerId = fd.get("playerId"), targetId = fd.get("targetId");
    if (!bowlerId) return toast("Select a bowler");
    const rule = scoringRules.bowling.find((r) => r[0] === fd.get("event"));
    const row = ensureBowlingRow(match, bowlerId);
    row.wickets += rule[2];
    row.runs += rule[3];
    row.balls += 1;
    row.events.unshift({
      id: id("bowl"),
      type: "bowling",
      key: rule[0],
      label: rule[1],
      wickets: rule[2],
      runs: rule[3],
      balls: 1,
      targetId,
      summary: `+${rule[2]} W / ${rule[3]} R / 1 B`,
      detail: `${targetId ? `Target batter: ${playerName(targetId)}` : "No specific target batter selected"}`,
      at: new Date().toISOString(),
    });
    if (targetId) {
      const targetRow = ensureBattingRow(match, targetId);
      targetRow.out = true;
      targetRow.wicketBy = bowlerId;
      targetRow.events.unshift({
        id: id("wicket"),
        type: "wicket",
        label: "Wicket lost",
        summary: `Out by ${playerName(bowlerId)}`,
        detail: `${rule[1]} / future scoring becomes 50%`,
        at: new Date().toISOString(),
      });
    }
    match.commentary.unshift({ time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), text: `${playerName(bowlerId)} claims bowling impact: ${rule[1]}.` });
    saveData(); render();
  }
  if (type === "complete-match") {
    const match = byId(data.matches, fd.get("matchId"));
    match.winnerId = fd.get("winnerId");
    match.matchMvpId = fd.get("matchMvpId");
    match.playerOfMatchId = fd.get("playerOfMatchId");
    match.completedAt = fd.get("completedAt") || match.completedAt;
    match.status = "completed";
    saveData(); toast("Match completed"); render();
  }
  if (type === "commentary") {
    const match = byId(data.matches, fd.get("matchId"));
    match.commentary.unshift({ time: fd.get("time") || "Live", text: fd.get("text") || "" });
    saveData(); render();
  }
  if (type === "team") upsertTeam(fd);
  if (type === "player") upsertPlayer(fd);
  if (type === "match") upsertMatch(fd);
  if (type === "sponsor-config") {
    data.sponsors ||= clone(seed.sponsors);
    data.sponsors.title = { name: fd.get("titleName"), logo: fd.get("titleLogo"), note: "Title Sponsor" };
    data.sponsors.poweredBy = { name: fd.get("poweredName"), logo: fd.get("poweredLogo"), note: "Powered By" };
    saveData(); toast("Main sponsors saved"); render();
  }
  if (type === "sponsor") upsertSponsor(fd);
  if (type === "awards") {
    Object.keys(data.awards).forEach((key) => data.awards[key] = fd.get(key));
    saveData(); toast("Awards saved"); render();
  }
  if (type === "import-json") {
    try {
      const incoming = JSON.parse(fd.get("json"));
      if (!incoming.teams || !incoming.players || !incoming.matches) throw new Error("Invalid backup");
      data = incoming; saveData(); toast("Backup imported"); render();
    } catch (error) { toast("Invalid JSON backup"); }
  }
}
function upsertTeam(fd) {
  const item = { id: fd.get("id") || id("team"), name: fd.get("name"), group: fd.get("group"), color: fd.get("color") || "#ff8a1f", logo: fd.get("logo") || "" };
  data.teams = data.teams.some((t) => t.id === item.id) ? data.teams.map((t) => t.id === item.id ? item : t) : [...data.teams, item];
  saveData(); toast("Team saved"); render();
}
function upsertPlayer(fd) {
  const item = { id: fd.get("id") || id("player"), name: fd.get("name"), teamId: fd.get("teamId") };
  data.players = data.players.some((p) => p.id === item.id) ? data.players.map((p) => p.id === item.id ? item : p) : [...data.players, item];
  saveData(); toast("Player saved"); render();
}
function upsertMatch(fd) {
  const existing = byId(data.matches, fd.get("id"));
  const base = existing || freshMatch(id("match"), Number(fd.get("week") || 1), fd.get("teamAId"), fd.get("teamBId"));
  Object.assign(base, { week: Number(fd.get("week") || 1), status: fd.get("status"), teamAId: fd.get("teamAId"), teamBId: fd.get("teamBId"), venue: fd.get("venue"), startAt: fd.get("startAt"), completedAt: fd.get("completedAt") });
  data.matches = existing ? data.matches.map((m) => m.id === base.id ? base : m) : [...data.matches, base];
  saveData(); toast("Match saved"); render();
}
function upsertSponsor(fd) {
  data.sponsors ||= clone(seed.sponsors);
  data.sponsors.partners ||= [];
  const item = { id: fd.get("id") || id("sponsor"), name: fd.get("name"), note: fd.get("note"), logo: fd.get("logo") };
  data.sponsors.partners = data.sponsors.partners.some((sponsor) => sponsor.id === item.id)
    ? data.sponsors.partners.map((sponsor) => sponsor.id === item.id ? item : sponsor)
    : [...data.sponsors.partners, item];
  saveData(); toast("Sponsor saved"); render();
}

function handleChange(event) {
  const statsSelect = event.target.closest('[data-action="select-stats-scope"]');
  if (statsSelect) {
    statsScope = statsSelect.value;
    sessionStorage.setItem("dpl2-stats-scope", statsScope);
    render();
    return;
  }
  const wicketSelect = event.target.closest('[data-action="select-wicket-bowler"]');
  if (wicketSelect) {
    const match = byId(data.matches, wicketSelect.dataset.match);
    const playerId = wicketSelect.dataset.player;
    const row = ensureBattingRow(match, playerId);
    row.wicketBy = wicketSelect.value;
    if (wicketSelect.value) {
      row.out = true;
      row.events.unshift({
        id: id("wicket"),
        type: "wicket",
        label: "Wicket assigned",
        summary: `Out by ${playerName(wicketSelect.value)}`,
        detail: "Manual wicket-taker selection from admin",
        at: new Date().toISOString(),
      });
    }
    saveData();
    render();
    return;
  }
  const select = event.target.closest('[data-action="select-admin-live-match"]');
  if (!select) return;
  adminLiveMatchId = select.value;
  sessionStorage.setItem("dpl2-admin-live-match", adminLiveMatchId);
  render();
}

function handleKeydown(event) {
  if (!["Enter", " "].includes(event.key)) return;
  const el = event.target.closest('[data-action="open-scorecard"], [data-action="open-player-detail"], [data-action="open-stats-player-detail"]');
  if (!el) return;
  event.preventDefault();
  if (el.dataset.action === "open-player-detail") openPlayerDetail(el.dataset.match, el.dataset.player);
  else if (el.dataset.action === "open-stats-player-detail") openStatsPlayerDetail(el.dataset.player);
  else openScorecard(el.dataset.id);
}

function handleClick(event) {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    route = routeLink.dataset.route;
    nav.classList.remove("open");
    render();
    return;
  }
  const el = event.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  if (action === "open-scorecard") openScorecard(el.dataset.id);
  if (action === "open-player-detail") openPlayerDetail(el.dataset.match, el.dataset.player);
  if (action === "open-stats-player-detail") openStatsPlayerDetail(el.dataset.player);
  if (action === "admin-tab") { adminTab = el.dataset.tab; render(); }
  if (action === "lock-admin") { adminUnlocked = false; sessionStorage.removeItem("dpl2-admin"); render(); }
  if (action === "add-extra") {
    const match = byId(data.matches, el.dataset.match);
    const rule = scoringRules.extras.find((r) => r[0] === el.dataset.key);
    if (match.allOut) return toast("Team is all out. No more scoring allowed.");
    match.extras = Number(match.extras || 0) + rule[2];
    match.commentary.unshift({ time: "Extra", text: `${rule[1]} adds ${rule[2]} team runs.` });
    saveData(); render();
  }
  if (action === "toggle-out") {
    const match = byId(data.matches, el.dataset.match);
    const row = ensureBattingRow(match, el.dataset.player);
    row.out = !row.out;
    if (row.out) {
      row.events.unshift({
        id: id("wicket"),
        type: "wicket",
        label: "Marked out",
        summary: "Out",
        detail: "Manual out mark from admin / future scoring becomes 50%",
        at: new Date().toISOString(),
      });
    } else {
      row.wicketBy = "";
      row.events.unshift({
        id: id("wicket"),
        type: "wicket",
        label: "Out reversed",
        summary: "Back to not out",
        detail: "Manual wicket reversal from admin",
        at: new Date().toISOString(),
      });
    }
    saveData(); render();
  }
  if (action === "all-out") {
    const match = byId(data.matches, el.dataset.match);
    match.allOut = true;
    teamPlayers(match.battingTeamId).forEach((p) => {
      const row = ensureBattingRow(match, p.id);
      row.out = true;
      row.events.unshift({
        id: id("allout"),
        type: "wicket",
        label: "Team all out",
        summary: "Out",
        detail: "Team marked all out from admin / no more scoring allowed",
        at: new Date().toISOString(),
      });
    });
    saveData(); toast("Team marked all out"); render();
  }
  if (action === "edit-team") fillTeam(el.dataset.id);
  if (action === "edit-player") fillPlayer(el.dataset.id);
  if (action === "edit-match") fillMatch(el.dataset.id);
  if (action === "edit-sponsor") fillSponsor(el.dataset.id);
  if (action === "delete-team") { data.teams = data.teams.filter((t) => t.id !== el.dataset.id); saveData(); render(); }
  if (action === "delete-player") { data.players = data.players.filter((p) => p.id !== el.dataset.id); saveData(); render(); }
  if (action === "delete-match") { data.matches = data.matches.filter((m) => m.id !== el.dataset.id); saveData(); render(); }
  if (action === "delete-sponsor") { data.sponsors.partners = (data.sponsors?.partners || []).filter((sponsor) => sponsor.id !== el.dataset.id); saveData(); render(); }
  if (action === "reset-data") resetData();
  if (action === "export-json") {
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
    toast("Backup JSON copied to clipboard");
  }
}
function fillTeam(teamId) {
  const t = byId(data.teams, teamId), f = document.querySelector('form[data-form="team"]');
  f.id.value = t.id; f.name.value = t.name; f.group.value = t.group; f.color.value = t.color; f.logo.value = t.logo || "";
}
function fillPlayer(playerId) {
  const p = byId(data.players, playerId), f = document.querySelector('form[data-form="player"]');
  f.id.value = p.id; f.name.value = p.name; f.teamId.value = p.teamId;
}
function fillMatch(matchId) {
  const m = byId(data.matches, matchId), f = document.querySelector('form[data-form="match"]');
  f.id.value = m.id; f.week.value = m.week; f.status.value = m.status; f.teamAId.value = m.teamAId; f.teamBId.value = m.teamBId; f.venue.value = m.venue;
  f.startAt.value = dateTimeInputValue(m.startAt); f.completedAt.value = dateTimeInputValue(m.completedAt);
}
function fillSponsor(sponsorId) {
  const sponsor = (data.sponsors?.partners || []).find((item) => item.id === sponsorId);
  const f = document.querySelector('form[data-form="sponsor"]');
  if (!sponsor || !f) return;
  f.id.value = sponsor.id; f.name.value = sponsor.name; f.note.value = sponsor.note || ""; f.logo.value = sponsor.logo || "";
}
function toast(message) {
  const node = document.getElementById("toastTemplate").content.firstElementChild.cloneNode(true);
  node.textContent = message;
  document.getElementById("toastStack").appendChild(node);
  setTimeout(() => node.remove(), 2600);
}
function render() {
  const views = { home: homeView, dashboard: dashboardView, results: resultsView, stats: statsView, points: pointsView, admin: adminView };
  (views[route] || homeView)();
}

document.addEventListener("submit", handleForm);
document.addEventListener("change", handleChange);
document.addEventListener("keydown", handleKeydown);
document.addEventListener("click", handleClick);
navToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (event) => { if (event.target === modal) modal.classList.remove("open"); });
window.addEventListener("hashchange", () => { route = location.hash.replace("#", "") || "home"; render(); });
render();
