const STORE_KEY = "dpl2-static-data";
const APP_VERSION = "20260519-firebase-sync-2";
const ADMIN_PASSWORD_HASH = "3105102736d7420b";
const ADMIN_SESSION_MS = 5 * 60 * 1000;
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBqf7-sDjs-o69rnmXhDErwt2vFASm5vDE",
  authDomain: "dpl-season2.firebaseapp.com",
  projectId: "dpl-season2",
  storageBucket: "dpl-season2.firebasestorage.app",
  messagingSenderId: "108366600776",
  appId: "1:108366600776:web:8d1365b4db7af6cbc8167d",
  measurementId: "G-S45G8FHEYH",
};
const FIREBASE_DOC_PATH = ["leagues", "dpl-season2"];

const scoringRules = {
  batting: [
    ["present", "Present", 6, 1],
    ["earlyArrival", "Arrives before 7:40am", 4, 1],
    ["substitute", "Substitute", 4, 1],
    ["medical", "Medical", 2, 1],
    ["testimonial", "Testimonial", 1, 1],
    ["oneToOne", "1-2-1", 2, 1],
    ["referralInside", "Referral Inside", 2, 1],
    ["referralOutside", "Referral Outside", 4, 1],
    ["paidVisitorRegistered", "Paid Visitor Registered", 6, 1],
    ["trainingAttended", "Training Attended", 6, 1],
    ["tyfcb", "TYFCB Per Rs 1 Lakh", 1, 1],
    ["visitorAfterRegistration", "Visitor Attended After Registration", 25, 6],
    ["induction", "Induction", 100, 25],
  ],
  extras: [
    ["teamMeetup", "5/9 Team Members Meet Up", 5],
    ["powerDate", "Powerdate With Ask/Company/Person", 7],
    ["fullTeamPresent", "All Team Players Present In Meeting", 9],
    ["socialMediaContent", "3/9 Players Post Diorite Social Media Content", 3],
  ],
  bowling: [
    ["absent", "Absent", 1, -10],
    ["late", "Late", 1, -6],
    ["noActivity", "No Activity In A Day", 1, 0],
    ["oneToOneClaim", "6/9 Members Doing 2 1-2-1s", 1, 0],
    ["referralClaim", "6/9 Members Passing 2 Referrals", 1, 0],
    ["visitorClaim", "6/9 Members Registering 1 Paid Visitor", 3, 0],
    ["allCriteria", "Bowler Completing All Criteria On Bowling Day", 2, 0],
  ],
};

const seed = {
  teams: [
    { id: "obsidian", name: "Obsidian Strikers", group: "A", color: "#ff8a1f", logo: "", logoSize: 100 },
    { id: "quartz", name: "Quartz Kings", group: "A", color: "#37b7ff", logo: "", logoSize: 100 },
    { id: "onyx", name: "Onyx Titans", group: "B", color: "#a855f7", logo: "", logoSize: 100 },
    { id: "granite", name: "Granite Gladiators", group: "B", color: "#28e78d", logo: "", logoSize: 100 },
  ],
  players: [
    ["p1", "Aarav Mehta", "obsidian"], ["p2", "Dev Shah", "obsidian"], ["p3", "Kabir Rao", "obsidian"], ["p4", "Rohan Iyer", "obsidian"], ["p5", "Nikhil Jain", "obsidian"], ["p6", "Sameer Das", "obsidian"], ["p7", "Vivaan Suri", "obsidian"], ["p8", "Manav Bose", "obsidian"], ["p9", "Harsh Vyas", "obsidian"],
    ["p10", "Ishaan Patel", "quartz"], ["p11", "Yash Nair", "quartz"], ["p12", "Arjun Kale", "quartz"], ["p13", "Karan Gill", "quartz"], ["p14", "Neel Shah", "quartz"], ["p15", "Dhruv Roy", "quartz"], ["p16", "Rudra Sen", "quartz"], ["p17", "Om Desai", "quartz"], ["p18", "Vir Batra", "quartz"],
    ["p19", "Reyansh Kapoor", "onyx"], ["p20", "Advait Joshi", "onyx"], ["p21", "Shaurya Singh", "onyx"], ["p22", "Parth Malhotra", "onyx"], ["p23", "Ayaan Reddy", "onyx"], ["p24", "Aryan Menon", "onyx"], ["p25", "Vedant Kulkarni", "onyx"], ["p26", "Krish Rao", "onyx"], ["p27", "Mihir Chawla", "onyx"],
    ["p28", "Vihaan Gupta", "granite"], ["p29", "Atharv Jain", "granite"], ["p30", "Pranav Sethi", "granite"], ["p31", "Samar Bhat", "granite"], ["p32", "Tanay Agarwal", "granite"], ["p33", "Rishabh Lal", "granite"], ["p34", "Anay Saxena", "granite"], ["p35", "Kunal Verma", "granite"], ["p36", "Ivaan Khanna", "granite"],
  ].map(([id, name, teamId]) => ({ id, name, teamId, role: "" })),
  awards: {
    orangeCap: "",
    purpleCap: "",
    bestStrikeRate: "",
    bestEconomy: "",
    mvp: "",
    motm: "",
  },
  sponsors: {
    title: { name: "Your Title Sponsor", logo: "", note: "Title Sponsor", logoSize: 100 },
    poweredBy: { name: "Your Powered By Partner", logo: "", note: "Powered By", logoSize: 100 },
    partners: [
      { id: "sponsor-1", name: "Partner Sponsor", logo: "", note: "Awards Sponsor", logoSize: 100 },
    ],
  },
  criteria: clone(scoringRules),
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
    tossWinnerId: teamAId, tossChoice: "bat", battingTeamId: teamAId, bowlingTeamId: teamBId, innings: 1, currentDay: "Wednesday", powerplay: true, battingPowerplayDay: "Wednesday",
    secretImposterId: "", secretImpostersByTeam: {}, openers: [], selectedBowlers: [], teamSetups: {}, allOut: false, allOutByTeam: {}, winnerId: "", playerOfMatchId: "", matchMvpId: "",
    startAt: "", completedAt: "", firstInningsRuns: "",
    extras: 0, extrasByTeam: {}, batting: {}, bowling: {}, bowlingTracker: {}, commentary: [
      { time: "00.1", text: "DPL 2.0 begins with a bright start and the live desk is awake." },
      { time: "00.0", text: "Toss done. Captains are in. Opening pair selected from admin." },
    ],
  };
}

seed.matches = fixtures.map((item) => freshMatch(...item));

let data = loadData();
let route = location.hash.replace("#", "") || "home";
let adminLockTimer = null;
let adminUnlocked = isAdminSessionValid();
let adminTab = "live";
let adminLiveMatchId = sessionStorage.getItem("dpl2-admin-live-match") || "";
let adminPlayerTeamFilter = sessionStorage.getItem("dpl2-admin-player-team") || "all";
let statsScope = sessionStorage.getItem("dpl2-stats-scope") || "season";
let statsSearch = sessionStorage.getItem("dpl2-stats-search") || "";
let homeCommentaryPopShown = false;
let liveFormMemory = JSON.parse(sessionStorage.getItem("dpl2-live-form-memory") || "{}");
let adminCollapsed = JSON.parse(sessionStorage.getItem("dpl2-admin-collapsed") || "{}");
let adminLiveExpanded = JSON.parse(sessionStorage.getItem("dpl2-admin-live-expanded") || "{}");
let firebaseDoc = null;
let firebaseSaveTimer = null;
let applyingFirebaseData = false;
let firebaseConnected = false;
let firebaseInitPromise = null;
let firebaseStatusMessage = "Not connected yet";

const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const navToggle = document.getElementById("navToggle");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function adminHash(value) {
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  String(value || "").split("").forEach((char, index) => {
    const code = char.charCodeAt(0);
    h1 ^= code;
    h1 = Math.imul(h1, 16777619);
    h2 ^= code + index;
    h2 = Math.imul(h2, 2246822519);
  });
  return `${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}
function unlockAdminSession() {
  adminUnlocked = true;
  touchAdminSession();
}
function touchAdminSession() {
  if (!adminUnlocked) return;
  const until = Date.now() + ADMIN_SESSION_MS;
  sessionStorage.setItem("dpl2-admin-until", String(until));
  scheduleAdminLock(until);
}
function scheduleAdminLock(until = Number(sessionStorage.getItem("dpl2-admin-until") || 0)) {
  if (adminLockTimer) clearTimeout(adminLockTimer);
  const delay = until - Date.now();
  if (!until || delay <= 0) return;
  adminLockTimer = setTimeout(() => {
    if (route !== "admin") {
      lockAdminSession();
      return;
    }
    lockAdminSession("Admin locked after 5 minutes of inactivity.");
    render();
  }, delay);
}
function lockAdminSession(message = "") {
  adminUnlocked = false;
  sessionStorage.removeItem("dpl2-admin");
  sessionStorage.removeItem("dpl2-admin-until");
  if (adminLockTimer) clearTimeout(adminLockTimer);
  adminLockTimer = null;
  if (message) toast(message);
}
function isAdminSessionValid() {
  const until = Number(sessionStorage.getItem("dpl2-admin-until") || 0);
  if (until && Date.now() < until) {
    scheduleAdminLock(until);
    return true;
  }
  sessionStorage.removeItem("dpl2-admin");
  sessionStorage.removeItem("dpl2-admin-until");
  return false;
}
function requireAdmin() {
  if (isAdminSessionValid()) {
    adminUnlocked = true;
    touchAdminSession();
    return true;
  }
  adminUnlocked = false;
  toast("Admin locked. Enter password again.");
  render();
  return false;
}
function titleCaseCriteriaLabel(label) {
  return String(label || "").replace(/[A-Za-z][A-Za-z0-9-]*/g, (word) => {
    if (word === word.toUpperCase() && word.length > 1) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}
function rules() { return data.criteria || scoringRules; }
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
  normalized.teams.forEach((team) => { team.logoSize = logoSizeValue(team.logoSize); });
  normalized.sponsors.title.logoSize = logoSizeValue(normalized.sponsors.title.logoSize);
  normalized.sponsors.poweredBy.logoSize = logoSizeValue(normalized.sponsors.poweredBy.logoSize);
  normalized.sponsors.partners.forEach((sponsor) => { sponsor.logoSize = logoSizeValue(sponsor.logoSize); });
  normalized.criteria ||= clone(scoringRules);
  normalized.criteria.batting ||= clone(scoringRules.batting);
  normalized.criteria.extras ||= clone(scoringRules.extras);
  normalized.criteria.bowling ||= clone(scoringRules.bowling);
  ["batting", "extras", "bowling"].forEach((type) => {
    normalized.criteria[type] = (normalized.criteria[type] || []).map((rule) => {
      const next = [...rule];
      next[1] = titleCaseCriteriaLabel(next[1]);
      return next;
    });
  });
  normalized.players.forEach((player) => { player.role ||= ""; });
  scoringRules.extras.forEach((rule) => {
    if (!normalized.criteria.extras.some((item) => item[0] === rule[0])) normalized.criteria.extras.push(clone(rule));
  });
  const powerDateRule = normalized.criteria.extras.find((rule) => rule[0] === "powerDate");
  if (powerDateRule) powerDateRule[1] = "Powerdate With Ask/Company/Person";
  const teamMeetupRule = normalized.criteria.extras.find((rule) => rule[0] === "teamMeetup");
  if (teamMeetupRule) teamMeetupRule[1] = "5/9 Team Members Meet Up";
  scoringRules.batting.forEach((rule) => {
    if (!normalized.criteria.batting.some((item) => item[0] === rule[0])) normalized.criteria.batting.push(clone(rule));
  });
  scoringRules.bowling.forEach((rule) => {
    const existing = normalized.criteria.bowling.find((item) => item[0] === rule[0]);
    if (existing) {
      existing[1] = rule[1];
      existing[2] = rule[2];
      existing[3] = rule[3];
    } else {
      normalized.criteria.bowling.push(clone(rule));
    }
  });
  const lateRule = normalized.criteria.bowling.find((rule) => rule[0] === "late");
  if (lateRule) lateRule[3] = -6;
  normalized.matches.forEach((match) => {
    match.extrasByTeam ||= {};
    match.bowlingTracker ||= {};
    match.allOutByTeam ||= {};
    if (match.allOut && match.battingTeamId && !Object.keys(match.allOutByTeam).length) {
      match.allOutByTeam[match.battingTeamId] = true;
    }
    if (match.extras && !Object.values(match.extrasByTeam).some(Boolean) && match.battingTeamId) {
      match.extrasByTeam[match.battingTeamId] = Number(match.extras || 0);
    }
    match.battingPowerplayDay ||= "Wednesday";
    match.currentDay ||= match.battingPowerplayDay || "Wednesday";
    match.tossChoice ||= "bat";
    match.teamSetups ||= {};
    [match.teamAId, match.teamBId].filter(Boolean).forEach((teamId) => {
      match.teamSetups[teamId] ||= { openers: [], battingPowerplayDay: teamId === match.teamAId ? "Wednesday" : "Saturday", bowlers: [], secretImposterId: "" };
      match.teamSetups[teamId].openers ||= teamId === match.battingTeamId ? [...(match.openers || [])] : [];
      match.teamSetups[teamId].battingPowerplayDay ||= teamId === match.teamAId ? "Wednesday" : "Saturday";
      match.teamSetups[teamId].bowlers ||= teamId === match.bowlingTeamId ? clone(match.selectedBowlers || []) : [];
      match.teamSetups[teamId].secretImposterId ||= match.secretImpostersByTeam?.[teamId] || (byId(normalized.players, match.secretImposterId)?.teamId === teamId ? match.secretImposterId : "");
    });
    match.secretImpostersByTeam ||= {};
    [match.teamAId, match.teamBId].filter(Boolean).forEach((teamId) => {
      if (match.teamSetups?.[teamId]?.secretImposterId) match.secretImpostersByTeam[teamId] = match.teamSetups[teamId].secretImposterId;
    });
    migratePowerplayBalls(match);
  });
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
function migratePowerplayBalls(match) {
  if (match.meta?.powerplayBallsDoubled) return;
  Object.values(match.batting || {}).forEach((row) => {
    row.events ||= [];
    row.events.forEach((event) => {
      if (event.type !== "batting" || !String(event.detail || "").includes("opener batting powerplay double")) return;
      const expectedBalls = Number(event.baseBalls || 0) * Number(event.qty || 1) * 2;
      const currentBalls = Number(event.balls || 0);
      if (expectedBalls > currentBalls) {
        const delta = expectedBalls - currentBalls;
        event.balls = expectedBalls;
        event.summary = `+${event.runs || 0} R / ${event.balls} B`;
        row.balls = Number(row.balls || 0) + delta;
      }
    });
  });
  match.meta = { ...(match.meta || {}), powerplayBallsDoubled: true };
}
function saveData() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    queueFirebaseSave();
    return true;
  } catch (error) {
    console.error(error);
    queueFirebaseSave();
    toast("Storage is full. Use smaller logo files or upload logo files to GitHub assets and enter ./assets/logo-name.png.");
    return false;
  }
}
function firebaseReady() {
  return Boolean(window.firebase?.initializeApp && window.firebase?.firestore);
}
function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    if ([...document.scripts].some((script) => script.src === src)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(script);
  });
}
async function initFirebaseSync() {
  if (firebaseDoc) return true;
  if (firebaseInitPromise) return firebaseInitPromise;
  firebaseInitPromise = (async () => {
    try {
      if (!firebaseReady()) {
        await loadExternalScript("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
        await loadExternalScript("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js");
      }
      if (!firebaseReady()) throw new Error("Firebase scripts are not available");
      const firebaseApp = window.firebase.apps?.length ? window.firebase.app() : window.firebase.initializeApp(FIREBASE_CONFIG);
      firebaseDoc = window.firebase.firestore(firebaseApp).collection(FIREBASE_DOC_PATH[0]).doc(FIREBASE_DOC_PATH[1]);
      firebaseDoc.onSnapshot((snapshot) => {
        firebaseConnected = true;
        firebaseStatusMessage = "Connected";
        if (!snapshot.exists) return;
        const remotePayload = snapshot.data()?.payload;
        const remoteData = remotePayload ? JSON.parse(remotePayload) : snapshot.data()?.data;
        if (!remoteData?.teams || !remoteData?.players || !remoteData?.matches) return;
        applyingFirebaseData = true;
        data = normalizeData(remoteData);
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
        applyingFirebaseData = false;
        render();
      }, (error) => {
        firebaseConnected = false;
        firebaseStatusMessage = error.code || error.message || "Connection failed";
        console.error(error);
        if (route === "admin") toast("Firebase sync is not connected. Check Firestore rules and internet.");
      });
      return true;
    } catch (error) {
      firebaseConnected = false;
      firebaseDoc = null;
      firebaseStatusMessage = error.code || error.message || "Setup failed";
      console.error(error);
      if (route === "admin") toast("Firebase setup failed. Check internet and Firebase rules.");
      return false;
    }
  })();
  return firebaseInitPromise;
}
function queueFirebaseSave() {
  if (applyingFirebaseData) return;
  clearTimeout(firebaseSaveTimer);
  firebaseSaveTimer = setTimeout(pushFirebaseData, 350);
}
async function pushFirebaseData() {
  if (applyingFirebaseData) return false;
  try {
    if (!firebaseDoc) {
      const ready = await initFirebaseSync();
      if (!ready || !firebaseDoc) return false;
    }
    const cleanData = JSON.parse(JSON.stringify(data));
    const payload = JSON.stringify(cleanData);
    const bytes = new Blob([payload]).size;
    if (bytes > 850000) {
      toast("Online data is too large. Move uploaded logos to GitHub assets and use ./assets/logo-name.png paths, then publish again.");
      return false;
    }
    await firebaseDoc.set({
      payload,
      data: window.firebase.firestore.FieldValue.delete(),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    firebaseConnected = true;
    firebaseStatusMessage = "Last publish successful";
    return true;
  } catch (error) {
    firebaseConnected = false;
    firebaseStatusMessage = error.code || error.message || "Publish failed";
    console.error(error);
    if (route === "admin") toast(`Firebase publish failed: ${firebaseStatusMessage}`);
    return false;
  }
}
function rememberLiveForm(matchId, formName, values) {
  liveFormMemory[matchId] ||= {};
  liveFormMemory[matchId][formName] = { ...(liveFormMemory[matchId][formName] || {}), ...values };
  sessionStorage.setItem("dpl2-live-form-memory", JSON.stringify(liveFormMemory));
}
function rememberAdminLiveExpanded(cardId, expanded = true) {
  if (!cardId) return;
  adminLiveExpanded[cardId] = expanded;
  sessionStorage.setItem("dpl2-admin-live-expanded", JSON.stringify(adminLiveExpanded));
}
function restoreAdminLiveExpanded() {
  Object.entries(adminLiveExpanded).forEach(([cardId, expanded]) => {
    const card = document.getElementById(cardId);
    if (card) card.classList.toggle("admin-live-expanded", Boolean(expanded));
  });
}
function liveMemory(match, formName) {
  return liveFormMemory[match.id]?.[formName] || {};
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
function roleTag(role) {
  return role === "captain" ? "(C)" : role === "viceCaptain" ? "(VC)" : role === "owner" ? "(O)" : "";
}
function displayPlayerName(player) {
  if (!player) return "Select player";
  const tag = roleTag(player.role);
  return `${player.name}${tag ? ` ${tag}` : ""}`;
}
function playerName(playerId) { return displayPlayerName(byId(data.players, playerId)); }
function isPlayerNotOutInLiveMatch(match, playerId) {
  if (!match || match.status !== "live" || !playerId) return false;
  const player = byId(data.players, playerId);
  if (!player || ![match.teamAId, match.teamBId].includes(player.teamId)) return false;
  return !Boolean(match.batting?.[playerId]?.out);
}
function matchPlayerName(match, playerId) {
  return `${playerName(playerId)}${isPlayerNotOutInLiveMatch(match, playerId) ? "*" : ""}`;
}
function matchDisplayPlayerName(match, player) {
  return `${displayPlayerName(player)}${isPlayerNotOutInLiveMatch(match, player?.id) ? "*" : ""}`;
}
function teamPlayers(teamId) { return data.players.filter((player) => player.teamId === teamId); }
function teamOwner(teamId) { return teamPlayers(teamId).find((player) => player.role === "owner") || null; }
function initials(name) { return String(name || "T").split(/\s+/).map((x) => x[0]).join("").slice(0, 3).toUpperCase(); }
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[match]));
}
function logoSizeValue(size = 100) {
  const value = Number(size || 100);
  return Math.min(180, Math.max(50, Number.isFinite(value) ? value : 100));
}
function logoScaleStyle(size = 100) {
  return `--logo-scale:${logoSizeValue(size) / 100}`;
}
function publicLogoPath(path = "") {
  const value = String(path || "").trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  const normalized = value.replace(/\\/g, "/").replace(/^file:\/\/\/?/i, "");
  if (normalized.startsWith("./") || normalized.startsWith("../") || normalized.startsWith("/")) return normalized;
  if (normalized.startsWith("assets/")) return `./${normalized}`;
  const fileName = normalized.split("/").pop();
  return fileName ? `./assets/${fileName}` : "";
}
function editableLogoPath(path = "") {
  const value = String(path || "");
  return value.startsWith("data:") ? "" : value;
}
function compressImageFile(file, maxSize = 900) {
  return new Promise((resolve) => {
    if (!file || !file.type?.startsWith("image/")) return resolve("");
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let output = "";
        try {
          output = canvas.toDataURL("image/webp", 0.78);
          if (!output.startsWith("data:image/webp")) output = canvas.toDataURL("image/png");
        } catch (error) {
          output = canvas.toDataURL("image/png");
        }
        resolve(output);
      };
      img.onerror = () => resolve(String(reader.result || ""));
      img.src = reader.result;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
async function logoInputValue(fd, textName, fileName, fallback = "") {
  const file = fd.get(fileName);
  if (file && file.size) return await compressImageFile(file) || await fileToDataUrl(file);
  return fd.get(textName) || fallback || "";
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
function opponentTeamId(match, teamId) {
  if (match.teamAId === teamId) return match.teamBId;
  if (match.teamBId === teamId) return match.teamAId;
  return "";
}
function setupForTeam(match, teamId) {
  match.teamSetups ||= {};
  match.teamSetups[teamId] ||= { openers: [], battingPowerplayDay: teamId === match.teamAId ? "Wednesday" : "Saturday", bowlers: [], secretImposterId: "" };
  match.teamSetups[teamId].openers ||= [];
  match.teamSetups[teamId].bowlers ||= [];
  match.teamSetups[teamId].battingPowerplayDay ||= teamId === match.teamAId ? "Wednesday" : "Saturday";
  return match.teamSetups[teamId];
}
function openersFor(match, teamId) {
  const setup = setupForTeam(match, teamId);
  return setup.openers?.length ? setup.openers : (teamId === match.battingTeamId ? (match.openers || []) : []);
}
function bowlersFor(match, teamId) {
  const setup = setupForTeam(match, teamId);
  return setup.bowlers?.length ? setup.bowlers : (teamId === match.bowlingTeamId ? (match.selectedBowlers || []) : []);
}
function imposterForTeam(match, teamId) {
  return setupForTeam(match, teamId).secretImposterId || match.secretImpostersByTeam?.[teamId] || (byId(data.players, match.secretImposterId)?.teamId === teamId ? match.secretImposterId : "");
}
function imposterImpactRuns(match, teamId) {
  const imposter = byId(data.players, imposterForTeam(match, teamId));
  if (!imposter) return 0;
  const imposterRuns = Number(match.batting?.[imposter.id]?.runs || 0);
  return Math.round(imposterRuns * 0.5 * 10) / 10;
}
function extrasTotalForTeam(match, teamId) {
  return Number(match.extrasByTeam?.[teamId] || 0) + imposterImpactRuns(match, teamId);
}
function extrasDetailText(match, teamId) {
  const manualExtras = Number(match.extrasByTeam?.[teamId] || 0);
  const imposterBonus = imposterImpactRuns(match, teamId);
  const parts = [];
  if (manualExtras) parts.push(`${manualExtras} team extras`);
  if (imposterBonus) parts.push(`${imposterBonus} bonus`);
  return parts.length ? parts.join(" / ") : "Team total only / not counted to any batter or bowler";
}
function scoreOfTeam(match, teamId) {
  const playerIds = new Set(teamPlayers(teamId).map((player) => player.id));
  const rows = Object.entries(match.batting || {}).filter(([playerId]) => playerIds.has(playerId)).map(([, row]) => row);
  const extras = extrasTotalForTeam(match, teamId);
  const imposterBonus = imposterImpactRuns(match, teamId);
  const runs = rows.reduce((sum, row) => sum + Number(row.runs || 0), 0) + extras;
  const wickets = rows.filter((row) => row.out).length;
  const balls = rows.reduce((sum, row) => sum + Number(row.balls || 0), 0);
  return { runs, wickets, balls, rr: balls ? (runs / balls).toFixed(2) : "0.00", imposterBonus };
}
function scoreOf(match) { return scoreOfTeam(match, match.battingTeamId); }
function isCurrentTeamAllOut(match) {
  return Boolean(match.allOutByTeam?.[match.battingTeamId] || (!match.allOutByTeam && match.allOut));
}
function firstInningsInfo(match) {
  if (Number(match.innings) !== 2) return null;
  const teamId = match.bowlingTeamId;
  const score = scoreOfTeam(match, teamId);
  const savedRuns = Number(match.firstInningsRuns || 0);
  if (savedRuns && !score.runs) score.runs = savedRuns;
  return { teamId, score };
}
function targetInfo(match) {
  const current = scoreOf(match);
  const first = firstInningsInfo(match);
  const firstRuns = Number(first?.score?.runs || match.firstInningsRuns || 0);
  if (Number(match.innings) !== 2 || !firstRuns) return null;
  const target = firstRuns + 1;
  return { target, required: Math.max(target - current.runs, 0), firstRuns };
}
function inningsScoreLine(match) {
  const current = scoreOf(match);
  const first = firstInningsInfo(match);
  if (!first) return "";
  const target = targetInfo(match);
  return `<div class="innings-strip">
    <span class="innings-full">1st Inn: <strong>${esc(teamName(first.teamId))} ${first.score.runs}/${first.score.wickets}</strong> (${oversText(first.score.balls)})</span>
    <span class="innings-full">2nd Inn: <strong>${esc(teamName(match.battingTeamId))} ${current.runs}/${current.wickets}</strong> (${oversText(current.balls)})</span>
    ${target ? `<span class="orange innings-full">Target ${target.target} / Need ${target.required}</span>` : ""}
    <span class="innings-mobile-summary"><strong>${esc(teamName(first.teamId))} ${first.score.runs}/${first.score.wickets}</strong>${target ? ` / Target ${target.target} / Need ${target.required}` : ""}</span>
  </div>`;
}
function homeInningsScoreLine(match) {
  const first = firstInningsInfo(match);
  if (!first) return "";
  const target = targetInfo(match);
  return `<div class="home-innings-line">
    <span>1st Inn: <strong>${esc(teamName(first.teamId))} ${first.score.runs}/${first.score.wickets}</strong></span>
    ${target ? `<span class="orange">Target ${target.target} / Need ${target.required} to win</span>` : ""}
  </div>`;
}
function finalScoreText(match) {
  if (Number(match.innings) === 2) {
    const first = firstInningsInfo(match);
    const current = scoreOf(match);
    if (first) return `${teamName(first.teamId)} ${first.score.runs}/${first.score.wickets} (${oversText(first.score.balls)}) | ${teamName(match.battingTeamId)} ${current.runs}/${current.wickets} (${oversText(current.balls)})`;
  }
  const score = scoreOf(match);
  return `${teamName(match.battingTeamId)} ${score.runs}/${score.wickets} (${oversText(score.balls)})`;
}
function bowlerAssignment(match, bowlerId) {
  const player = byId(data.players, bowlerId);
  if (!player) return null;
  if (player.role === "owner") return { playerId: bowlerId, day: "Tuesday", ownerDefault: true };
  return bowlersFor(match, player.teamId).find((bowler) => bowler.playerId === bowlerId) || null;
}
function derivedBowlingFigures(match, bowlerId) {
  const player = byId(data.players, bowlerId);
  const assignment = bowlerAssignment(match, bowlerId);
  const day = assignment?.day || "";
  const row = match.bowling?.[bowlerId] || { wickets: 0, events: [] };
  if (!player || !day) return { runs: 0, balls: 0, wickets: Number(row.wickets || 0), day, economy: 0 };
  const opponentId = opponentTeamId(match, player.teamId);
  const opponentPlayerIds = new Set(teamPlayers(opponentId).map((item) => item.id));
  let runs = 0, balls = 0;
  Object.entries(match.batting || {}).forEach(([playerId, batting]) => {
    if (!opponentPlayerIds.has(playerId)) return;
    (batting.events || []).forEach((event) => {
      if (event.type !== "batting" || event.activityDay !== day) return;
      runs += Number(event.runs || 0);
      balls += Number(event.balls || 0);
    });
  });
  return { runs, balls, wickets: Number(row.wickets || 0), day, economy: balls ? Math.max(0, runs) / balls : 0 };
}
function battingPenaltyForBowlingRule(ruleKey, runImpact) {
  if (ruleKey === "absent") return { runs: runImpact, balls: 2 };
  if (ruleKey === "late") return { runs: runImpact, balls: 1 };
  return null;
}
function bowlingScore(match) {
  return teamPlayers(match.bowlingTeamId).reduce((acc, player) => {
    const figures = derivedBowlingFigures(match, player.id);
    acc.wickets += figures.wickets;
    acc.runs += figures.runs;
    acc.balls += figures.balls;
    return acc;
  }, { wickets: 0, runs: 0, balls: 0 });
}
function matchNumber(match) {
  const index = data.matches.findIndex((item) => item.id === match?.id);
  return index >= 0 ? index + 1 : "";
}
function matchLabel(match) {
  const number = matchNumber(match);
  return `Week ${match.week}${number ? ` / Match ${number}` : ""}`;
}
function matchTitle(match) { return `${teamName(match.teamAId)} vs ${teamName(match.teamBId)}`; }
function tossText(match) {
  if (!match.tossWinnerId) return "Toss not updated";
  return `${teamName(match.tossWinnerId)} won the toss and chose to ${match.tossChoice === "bowl" ? "bowl" : "bat"}`;
}
function teamBadge(teamId) {
  const team = byId(data.teams, teamId);
  const logo = publicLogoPath(team?.logo || "");
  return `<span class="team-logo ${logo ? "has-logo" : ""}" style="--team:${team?.color || "#ff8a1f"};${logoScaleStyle(team?.logoSize)}">${logo ? `<img src="${esc(logo)}" alt="${esc(team.name)} logo" onerror="this.remove();this.parentElement.classList.remove('has-logo');this.parentElement.textContent='${esc(initials(team?.name || teamId))}'">` : esc(initials(team?.name || teamId))}</span>`;
}
function playerOptions(selected = "", teamId = "") {
  const players = teamId ? teamPlayers(teamId) : data.players;
  return `<option value="">Select player</option>${players.map((p) => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(displayPlayerName(p))} - ${esc(teamName(p.teamId))}</option>`).join("")}`;
}
function battingEventCounts(match, playerId) {
  const counts = {};
  const events = match?.batting?.[playerId]?.events || [];
  events.forEach((event) => {
    if (event.type !== "batting" || !event.key) return;
    counts[event.key] = Number(counts[event.key] || 0) + Number(event.qty || 1);
  });
  return counts;
}
function battingEventOptions(match, playerId = "", selected = "") {
  const counts = playerId ? battingEventCounts(match, playerId) : {};
  return rules().batting.map(([key, label, runs, balls]) => {
    const count = Number(counts[key] || 0);
    const countText = count ? ` - ${count}` : "";
    return `<option value="${key}" ${key === selected ? "selected" : ""}>${esc(label)} (${runs}/${balls})${countText}</option>`;
  }).join("");
}
function battingAdminEventList(match) {
  const collapsed = adminCollapsed[`${match.id}:battingEntries`] !== false;
  const events = battingAdminEvents(match).slice(0, 16);
  return `<div class="collapsible-head"><button class="button small" type="button" data-action="toggle-admin-collapse" data-key="${match.id}:battingEntries">${collapsed ? "Show" : "Hide"} Batting Entries (${events.length})</button></div>${events.length ? `<div class="admin-event-list ${collapsed ? "collapsed" : ""}">${events.map(({ playerId, event }) => `<div class="list-item admin-event-row">
    <span><strong>${esc(matchPlayerName(match, playerId))}</strong> <small class="muted">${esc(event.label || event.key)} / Qty ${esc(event.qty || 1)} / ${esc(event.activityDay || "-")} / ${esc(event.summary || "")}</small></span>
    <span class="row-actions"><button class="button small" data-action="edit-batting-event" data-match="${match.id}" data-event="${event.id}">Edit</button> <button class="button small danger" data-action="delete-batting-event" data-match="${match.id}" data-event="${event.id}">Remove</button></span>
  </div>`).join("")}</div>` : `<p class="muted">No batting scoring entries yet.</p>`}`;
}
function bowlingAdminEventList(match) {
  const collapsed = adminCollapsed[`${match.id}:bowlingEntries`] !== false;
  const events = bowlingAdminEvents(match).slice(0, 16);
  return `<div class="collapsible-head"><button class="button small" type="button" data-action="toggle-admin-collapse" data-key="${match.id}:bowlingEntries">${collapsed ? "Show" : "Hide"} Bowling Entries (${events.length})</button></div>${events.length ? `<div class="admin-event-list ${collapsed ? "collapsed" : ""}">${events.map(({ playerId, event }) => `<div class="list-item admin-event-row">
    <span><strong>${esc(matchPlayerName(match, playerId))}</strong> <small class="muted">${esc(event.label || event.key)} / ${esc(event.bowlingDay || "-")} / ${esc(event.wickets || 0)} W / ${esc(event.runs || 0)} R${event.targetId ? ` / Target ${esc(matchPlayerName(match, event.targetId))}` : ""}</small></span>
    <span class="row-actions"><button class="button small" data-action="edit-bowling-event" data-match="${match.id}" data-event="${event.id}">Edit</button> <button class="button small danger" data-action="delete-bowling-event" data-match="${match.id}" data-event="${event.id}">Remove</button></span>
  </div>`).join("")}</div>` : `<p class="muted">No bowling impact entries yet.</p>`}`;
}
function bowlingTrackingRecord(match, teamId, day, playerId) {
  match.bowlingTracker ||= {};
  match.bowlingTracker[teamId] ||= {};
  match.bowlingTracker[teamId][day] ||= {};
  match.bowlingTracker[teamId][day][playerId] ||= { oneToOnes: 0, referrals: 0, paidVisitors: 0, tyfcbLakhs: 0 };
  return match.bowlingTracker[teamId][day][playerId];
}
function bowlingTrackingRows(match, teamId, day = "") {
  const teamTracker = match.bowlingTracker?.[teamId] || {};
  return Object.entries(teamTracker).flatMap(([trackedDay, players]) => {
    if (day && trackedDay !== day) return [];
    return Object.entries(players || {}).map(([playerId, row]) => ({ day: trackedDay, playerId, row }));
  }).filter(({ row }) => Number(row.oneToOnes || 0) || Number(row.referrals || 0) || Number(row.paidVisitors || 0) || Number(row.tyfcbLakhs || 0));
}
function bowlingClaimWindowDays(match, teamId) {
  const assignedDays = bowlersFor(match, teamId).filter((bowler) => bowler.playerId && bowler.day).slice(0, 3).map((bowler) => bowler.day);
  if (assignedDays.length) return Array.from(new Set(assignedDays));
  return Array.from(new Set(bowlingTrackingRows(match, teamId).map((row) => row.day))).slice(0, 3);
}
function bowlingTrackingWindowTotals(match, teamId) {
  const windowDays = bowlingClaimWindowDays(match, teamId);
  const daySet = new Set(windowDays);
  return teamPlayers(teamId).map((player) => {
    const totals = { oneToOnes: 0, referrals: 0, paidVisitors: 0, tyfcbLakhs: 0 };
    const days = {};
    (daySet.size ? windowDays : ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"]).forEach((day) => {
      const row = match.bowlingTracker?.[teamId]?.[day]?.[player.id] || {};
      const dayTotals = {
        oneToOnes: Number(row.oneToOnes || 0),
        referrals: Number(row.referrals || 0),
        paidVisitors: Number(row.paidVisitors || 0),
        tyfcbLakhs: Number(row.tyfcbLakhs || 0),
      };
      days[day] = dayTotals;
      totals.oneToOnes += dayTotals.oneToOnes;
      totals.referrals += dayTotals.referrals;
      totals.paidVisitors += dayTotals.paidVisitors;
      totals.tyfcbLakhs += dayTotals.tyfcbLakhs;
    });
    return { player, totals, days };
  });
}
function trackingSummaryText(row) {
  return `1-2-1: ${row.oneToOnes || 0} / Ref: ${row.referrals || 0} / Paid: ${row.paidVisitors || 0} / TYFCB: ${row.tyfcbLakhs || 0}`;
}
function bowlingClaimSummary(match, teamId) {
  const windowDays = bowlingClaimWindowDays(match, teamId);
  const daySet = new Set(windowDays);
  const rows = bowlingTrackingRows(match, teamId).filter((row) => !daySet.size || daySet.has(row.day));
  const totalsByPlayer = {};
  rows.forEach(({ playerId, row }) => {
    totalsByPlayer[playerId] ||= { oneToOnes: 0, referrals: 0, paidVisitors: 0, tyfcbLakhs: 0 };
    totalsByPlayer[playerId].oneToOnes += Number(row.oneToOnes || 0);
    totalsByPlayer[playerId].referrals += Number(row.referrals || 0);
    totalsByPlayer[playerId].paidVisitors += Number(row.paidVisitors || 0);
    totalsByPlayer[playerId].tyfcbLakhs += Number(row.tyfcbLakhs || 0);
  });
  const totals = Object.values(totalsByPlayer);
  const oneToOneMembers = totals.filter((row) => row.oneToOnes >= 2).length;
  const referralMembers = totals.filter((row) => row.referrals >= 2).length;
  const paidVisitorMembers = totals.filter((row) => row.paidVisitors >= 1).length;
  const allCriteriaPlayers = rows
    .filter(({ day, playerId, row }) => {
      const assignedBowler = bowlersFor(match, teamId).find((bowler) => bowler.day === day && bowler.playerId === playerId);
      return assignedBowler && row.oneToOnes > 0 && row.referrals > 0 && row.paidVisitors > 0 && row.tyfcbLakhs > 0;
    })
    .map(({ day, playerId }) => ({ day, playerId }));
  const dayText = windowDays.length ? `across ${windowDays.map(shortDay).join(", ")}` : "across the 3 bowling days";
  const messages = [];
  if (oneToOneMembers >= 6) messages.push({ wickets: 1, text: `${oneToOneMembers}/9 members completed 2 1-2-1s ${dayText}. Team can claim 1 specific wicket.` });
  else messages.push({ wickets: 0, text: `${oneToOneMembers}/9 members completed 2 1-2-1s ${dayText}. Need ${Math.max(0, 6 - oneToOneMembers)} more for 1 wicket claim.` });
  if (referralMembers >= 6) messages.push({ wickets: 1, text: `${referralMembers}/9 members passed 2 referrals ${dayText}. Team can claim 1 specific wicket.` });
  else messages.push({ wickets: 0, text: `${referralMembers}/9 members passed 2 referrals ${dayText}. Need ${Math.max(0, 6 - referralMembers)} more for 1 wicket claim.` });
  if (paidVisitorMembers >= 6) messages.push({ wickets: 3, text: `${paidVisitorMembers}/9 members registered a paid visitor ${dayText}. Team can claim 3 specific wickets.` });
  else messages.push({ wickets: 0, text: `${paidVisitorMembers}/9 members registered a paid visitor ${dayText}. Need ${Math.max(0, 6 - paidVisitorMembers)} more for 3 wicket claim.` });
  if (allCriteriaPlayers.length) {
    messages.push({ wickets: allCriteriaPlayers.length * 2, text: `${allCriteriaPlayers.map((item) => `${matchPlayerName(match, item.playerId)} (${shortDay(item.day)})`).join(", ")} completed all tracked criteria on their own bowling day. Claim 2 specific wickets per qualifying bowler-day.` });
  } else {
    messages.push({ wickets: 0, text: "No assigned bowler has completed all tracked criteria on their own bowling day yet for the 2-wicket claim." });
  }
  return { oneToOneMembers, referralMembers, paidVisitorMembers, allCriteriaPlayers, windowDays, messages, totalClaimWickets: messages.reduce((sum, item) => sum + item.wickets, 0) };
}
function wicketClaimDayBowler(match, teamId, day = "") {
  const activeDay = day || match.currentDay || todayLeagueDay();
  const assignment = bowlingAssignmentsForTeam(match, teamId).find((bowler) => bowler.day === activeDay);
  return { day: activeDay, playerId: assignment?.playerId || "" };
}
function wicketClaimDayStatus(match, teamId, day = "") {
  const active = wicketClaimDayBowler(match, teamId, day);
  const row = active.playerId ? (match.bowlingTracker?.[teamId]?.[active.day]?.[active.playerId] || {}) : {};
  const checks = [
    { key: "oneToOnes", label: "1-2-1", value: Number(row.oneToOnes || 0), required: 1 },
    { key: "referrals", label: "Referral", value: Number(row.referrals || 0), required: 1 },
    { key: "paidVisitors", label: "Paid visitor", value: Number(row.paidVisitors || 0), required: 1 },
    { key: "tyfcbLakhs", label: "TYFCB Rs 1 lakh", value: Number(row.tyfcbLakhs || 0), required: 1 },
  ];
  const pending = checks.filter((item) => item.value < item.required);
  const complete = Boolean(active.playerId && !pending.length);
  return { ...active, match, row, checks, pending, complete };
}
function wicketClaimDayStatusHtml(dayStatus) {
  const bowler = dayStatus.playerId ? matchPlayerName(dayStatus.match, dayStatus.playerId) : "Not selected";
  return `<div class="day-claim-status">
    <p class="${dayStatus.complete ? "green" : "muted"}"><strong>${esc(shortDay(dayStatus.day))} bowler:</strong> ${esc(bowler)} / ${dayStatus.complete ? "all criteria complete, claim 2 wickets" : "all-criteria claim pending for this day"}</p>
    <div class="claim-check-grid">
      ${dayStatus.checks.map((item) => `<span class="${item.value >= item.required ? "done" : "pending"}">${item.value >= item.required ? "Done" : "Pending"}: ${esc(item.label)} (${esc(item.value)}/${esc(item.required)})</span>`).join("")}
    </div>
  </div>`;
}
function bowlingTrackerPanel(match) {
  const memory = liveMemory(match, "bowlingTracker");
  const day = memory.day || match.currentDay || "Wednesday";
  const playerId = memory.playerId || "";
  const current = playerId ? bowlingTrackingRecord(match, match.bowlingTeamId, day, playerId) : {};
  const claim = bowlingClaimSummary(match, match.bowlingTeamId);
  const totals = bowlingTrackingWindowTotals(match, match.bowlingTeamId);
  const dayStatus = wicketClaimDayStatus(match, match.bowlingTeamId, day);
  return `<div class="card" id="admin-bowling-tracker">
    <h3>Wicket Claim Tracker</h3>
    <div class="claim-box">
      <strong>${esc(teamName(match.bowlingTeamId))} claim status</strong>
      ${wicketClaimDayStatusHtml(dayStatus)}
      ${claim.messages.map((item) => `<p class="${item.wickets ? "green" : "muted"}">${esc(item.text)}</p>`).join("")}
    </div>
    <form class="grid" data-form="bowling-tracker">
      <input type="hidden" name="matchId" value="${match.id}">
      <label>Bowling day<select name="day">${dayOptions(day)}</select></label>
      <label>Member<select name="playerId">${matchTeamPlayerOptions(match, playerId, match.bowlingTeamId)}</select></label>
      <label>1-2-1s<input name="oneToOnes" type="number" min="0" step="1" value="${esc(current.oneToOnes || 0)}"></label>
      <label>Referrals<input name="referrals" type="number" min="0" step="1" value="${esc(current.referrals || 0)}"></label>
      <label>Paid Visitor Registered<input name="paidVisitors" type="number" min="0" step="1" value="${esc(current.paidVisitors || 0)}"></label>
      <label>TYFCB Of Rs 1 Lakh<input name="tyfcbLakhs" type="number" min="0" step="1" value="${esc(current.tyfcbLakhs || 0)}"></label>
      <button class="button purple">Save Tracking</button>
    </form>
    <div class="mini-list" style="margin-top:.85rem">
      <div class="muted"><small>Overall tracking for all bowling team members.</small></div>
      ${totals.map(({ player, totals: row }) => `<div class="list-item tracker-score-row"><span><strong>${esc(matchDisplayPlayerName(match, player))}</strong><small class="muted"> ${esc(trackingSummaryText(row))}</small></span></div>`).join("")}
    </div>
  </div>`;
}
function bowlingClaimScorecardPanel(match, teamId) {
  const claim = bowlingClaimSummary(match, teamId);
  const totals = bowlingTrackingWindowTotals(match, teamId);
  const dayStatus = wicketClaimDayStatus(match, teamId, scoreboardDay(match));
  return `<div class="scorecard-claim-tracker">
    <h4>Wicket Claim Tracker</h4>
    <div class="claim-box scorecard-claim-box">
      ${wicketClaimDayStatusHtml(dayStatus)}
      ${claim.messages.map((item) => `<p class="${item.wickets ? "green" : "muted"}">${esc(item.text)}</p>`).join("")}
    </div>
    <div class="mini-list scorecard-tracker-list">
      <div class="muted"><small>Overall tracking for all bowling team members.</small></div>
      ${totals.map(({ player, totals: row }) => `<div class="list-item tracker-score-row">
        <span><strong>${esc(matchDisplayPlayerName(match, player))}</strong><small class="muted"> ${esc(trackingSummaryText(row))}</small></span>
      </div>`).join("")}
    </div>
  </div>`;
}
function teamOptions(selected = "") {
  return `<option value="">Select team</option>${data.teams.map((t) => `<option value="${t.id}" ${t.id === selected ? "selected" : ""}>${esc(t.name)}</option>`).join("")}`;
}
function matchTeamOptions(match, selected = "") {
  return `<option value="">Select team</option>${[match.teamAId, match.teamBId].filter(Boolean).map((teamId) => `<option value="${teamId}" ${teamId === selected ? "selected" : ""}>${esc(teamName(teamId))}</option>`).join("")}`;
}
function matchPlayerOptions(match, selected = "") {
  return `<option value="">Select player</option>${[match.teamAId, match.teamBId].flatMap((teamId) => teamPlayers(teamId)).map((p) => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(matchDisplayPlayerName(match, p))} - ${esc(teamName(p.teamId))}</option>`).join("")}`;
}
function matchTeamPlayerOptions(match, selected = "", teamId = "") {
  const players = teamId ? teamPlayers(teamId) : [match.teamAId, match.teamBId].flatMap((id) => teamPlayers(id));
  return `<option value="">Select player</option>${players.map((p) => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(matchDisplayPlayerName(match, p))} - ${esc(teamName(p.teamId))}</option>`).join("")}`;
}
function potmContenderScore(row, context = {}) {
  const battingImpact = Number(row.runs || 0) * 1.25;
  const wicketImpact = Number(row.wickets || 0) * 35;
  const topBattingBonus = row.runs && row.runs === context.topRuns ? 18 : 0;
  const topBowlingBonus = row.wickets && row.wickets === context.topWickets ? 18 : 0;
  const strikeImpact = row.balls >= 6 ? Math.min(12, Math.max(0, row.strikeRate - 120) / 8) : 0;
  const wicketEconomyImpact = row.wickets && row.bowlBalls >= 6 ? Math.max(0, 10 - row.economy) * 2 : 0;
  return Math.round((battingImpact + wicketImpact + topBattingBonus + topBowlingBonus + strikeImpact + wicketEconomyImpact) * 10) / 10;
}
function matchAwardContenders(match, awardType = "mvp") {
  const matchPlayerIds = new Set([match.teamAId, match.teamBId].flatMap((teamId) => teamPlayers(teamId).map((p) => p.id)));
  const matchRows = playerAggregatesForMatches([match]).filter((row) => matchPlayerIds.has(row.player.id));
  const potmContext = {
    topRuns: Math.max(0, ...matchRows.map((row) => Number(row.runs || 0))),
    topWickets: Math.max(0, ...matchRows.map((row) => Number(row.wickets || 0))),
  };
  const rows = matchRows
    .map((row) => {
      const score = awardType === "potm" ? potmContenderScore(row, potmContext) : Number(row.mvp || 0);
      return { ...row, match, contenderScore: Math.max(0, score) };
    })
    .sort((a, b) => b.contenderScore - a.contenderScore || b.runs - a.runs || b.wickets - a.wickets || displayPlayerName(a.player).localeCompare(displayPlayerName(b.player)));
  const maxScore = Math.max(0, ...rows.map((row) => row.contenderScore));
  return rows.map((row) => ({
    ...row,
    deservingPercent: maxScore ? Math.round((row.contenderScore / maxScore) * 100) : 0,
  }));
}
function matchAwardOptionLabel(row, awardType = "mvp") {
  const figures = `${row.runs} R, ${row.wickets} W, ${row.bowlRuns} RC`;
  const scoreText = awardType === "potm" ? "POTM" : "MVP";
  return `${matchDisplayPlayerName(row.match, row.player)} - ${teamName(row.player.teamId)} - ${row.deservingPercent}% ${scoreText} contender (${figures})`;
}
function matchAwardOptions(match, selected = "", awardType = "mvp") {
  const contenders = matchAwardContenders(match, awardType);
  return `<option value="">Select player</option>${contenders.map((row) => `<option value="${row.player.id}" ${row.player.id === selected ? "selected" : ""}>${esc(matchAwardOptionLabel(row, awardType))}</option>`).join("")}`;
}
function selectedBowlerOptions(match, selected = "") {
  const bowlingSetup = bowlersFor(match, match.bowlingTeamId);
  const selectedIds = new Set((bowlingSetup || []).map((bowler) => bowler.playerId).filter(Boolean));
  const owner = teamOwner(match.bowlingTeamId);
  if (owner) selectedIds.add(owner.id);
  const players = selectedIds.size ? teamPlayers(match.bowlingTeamId).filter((player) => selectedIds.has(player.id)) : teamPlayers(match.bowlingTeamId);
  return `<option value="">Select bowler</option>${players.map((p) => {
    const day = p.role === "owner" ? "Tuesday" : (bowlingSetup.find((bowler) => bowler.playerId === p.id)?.day || "");
    return `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(matchDisplayPlayerName(match, p))}${day ? ` - ${esc(day)}` : ""}</option>`;
  }).join("")}`;
}
function dayOptions(selected = "") {
  return ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"].map((day) => `<option value="${day}" ${day === selected ? "selected" : ""}>${day}</option>`).join("");
}
function shortDay(day) {
  return ({
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
    Monday: "Mon",
  })[day] || day || "";
}
function todayLeagueDay() {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
}
function bowlingAssignmentsForTeam(match, teamId) {
  const assignments = [];
  const owner = teamOwner(teamId);
  if (owner) assignments.push({ playerId: owner.id, day: "Tuesday", ownerDefault: true });
  bowlersFor(match, teamId).filter((bowler) => bowler.playerId).slice(0, 3).forEach((bowler) => {
    if (assignments.some((item) => item.playerId === bowler.playerId)) return;
    assignments.push(bowler);
  });
  return assignments;
}
function scoreboardBowlerForDay(match) {
  const bowlers = bowlingAssignmentsForTeam(match, match.bowlingTeamId);
  const activeDay = match.currentDay || todayLeagueDay();
  return bowlers.find((bowler) => bowler.day === activeDay) || bowlers[0] || null;
}
function scoreboardDay(match) {
  return match.currentDay || scoreboardBowlerForDay(match)?.day || todayLeagueDay();
}
function scoreboardBowlerText(match) {
  const bowler = scoreboardBowlerForDay(match);
  if (!bowler) return "Bowler not selected";
  return `${matchPlayerName(match, bowler.playerId)}${bowler.day ? ` (${shortDay(bowler.day)})` : ""}`;
}
function selectedBowlersText(match, teamId) {
  return bowlersFor(match, teamId).filter((bowler) => bowler.playerId).slice(0, 3)
    .map((bowler) => `${matchPlayerName(match, bowler.playerId)}${bowler.day ? ` (${shortDay(bowler.day)})` : ""}`)
    .join(", ");
}
function selectedBowlersHtml(match, teamId) {
  const bowlers = bowlersFor(match, teamId).filter((bowler) => bowler.playerId).slice(0, 3);
  return bowlers.length
    ? bowlers.map((bowler) => `<strong class="setup-value">${esc(matchPlayerName(match, bowler.playerId))}</strong>${bowler.day ? ` <span class="muted">(${esc(shortDay(bowler.day))})</span>` : ""}`).join(", ")
    : "Not selected";
}
function imposterNameForTeam(match, teamId) {
  const imposterId = match.status === "completed" ? imposterForTeam(match, opponentTeamId(match, teamId)) : "";
  return imposterId ? playerName(imposterId) : "";
}
function isVisibleImposter(match, teamId, playerId) {
  return match.status === "completed" && imposterForTeam(match, opponentTeamId(match, teamId)) === playerId;
}
function openingSetupPanel(match, teamId) {
  const openers = openersFor(match, teamId).map((playerId) => matchPlayerName(match, playerId)).join(", ") || "Not selected";
  const imposter = imposterNameForTeam(match, teamId);
  return `<div class="card setup-mini-panel" style="box-shadow:none">
    <strong class="setup-line">Openers: <span class="setup-value">${esc(openers)}</span></strong>
    ${imposter ? `<p class="muted setup-line"><strong>Imposter:</strong> <span class="imposter-name">${esc(imposter)}</span></p>` : ""}
  </div>`;
}
function matchOptions(selected = "", status = "") {
  const matches = status ? data.matches.filter((m) => m.status === status) : data.matches;
  return matches.map((m) => `<option value="${m.id}" ${m.id === selected ? "selected" : ""}>W${m.week} - ${esc(matchTitle(m))}</option>`).join("");
}
function battingRows(match) {
  const players = teamPlayers(match.battingTeamId);
  const openers = openersFor(match, match.battingTeamId);
  return players.map((player) => {
    const row = match.batting[player.id] || { runs: 0, balls: 0, out: false };
    const sr = row.balls ? ((row.runs / row.balls) * 100).toFixed(1) : "0.0";
    const imposter = isVisibleImposter(match, match.battingTeamId, player.id);
    const batterName = `${esc(matchDisplayPlayerName(match, player))}${openers.includes(player.id) ? " (Op)" : ""}${imposter ? ` <span class="imposter-name">(Imp)</span>` : ""}`;
    const wicketText = row.out && row.wicketBy ? ` / wicket by ${matchPlayerName(match, row.wicketBy)}` : "";
    return `<tr><td><strong class="${imposter ? "imposter-name" : ""}">${batterName}</strong><div class="muted">${row.out ? `out${wicketText} / future scoring 50%` : "not out"}</div></td><td class="orange">${row.runs || 0}</td><td>${row.balls || 0}</td><td>${sr}</td></tr>`;
  }).join("");
}
function bowlingRows(match) {
  const players = teamPlayers(match.bowlingTeamId);
  const bowlers = bowlersFor(match, match.bowlingTeamId);
  return players.map((player) => {
    const row = match.bowling[player.id] || { runs: 0, balls: 0, wickets: 0 };
    const figures = derivedBowlingFigures(match, player.id);
    const economy = figures.balls ? figures.economy.toFixed(2) : "0.00";
    const day = bowlers.find((b) => b.playerId === player.id)?.day || "";
    return `<tr><td><strong>${esc(matchDisplayPlayerName(match, player))}</strong> ${day ? `<span class="pill">${esc(shortDay(day))}</span>` : ""}</td><td>${figures.runs || 0}</td><td>${figures.balls || 0}</td><td class="purple">${figures.wickets || 0}</td><td>${economy}</td></tr>`;
  }).join("");
}
function sponsorLogo(item) {
  const logo = publicLogoPath(item?.logo || "");
  const style = logoScaleStyle(item?.logoSize);
  if (logo) return `<img class="sponsor-logo-img" style="${style}" src="${esc(logo)}" alt="${esc(item.name)} logo" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'sponsor-logo-fallback',textContent:'${esc(initials(item?.name || "SP"))}'}))">`;
  return `<span class="sponsor-logo-fallback" style="${style}">${esc(initials(item?.name || "SP"))}</span>`;
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
function homeSponsorShowcase() {
  const sponsors = data.sponsors || seed.sponsors;
  const partners = sponsors.partners || [];
  const majorSponsors = partners.slice(0, 3);
  const teamSponsors = partners.slice(3);
  const sponsorTiles = (items) => items.map((sponsor) => `<article class="sponsor-tile">
    <small>${esc(sponsor.note || "Sponsor")}</small>
    ${sponsorLogo(sponsor)}
    <strong>${esc(sponsor.name)}</strong>
  </article>`).join("");
  return `<section class="home-sponsor-showcase">
    <div class="section-head">
      <div>
        <span class="eyebrow">League Partners</span>
        <h2>Official Sponsors</h2>
      </div>
      <span class="pill">DPL 2.0</span>
    </div>
    <div class="featured-sponsors">
      <article class="featured-sponsor title">
        <small>Title Sponsor</small>
        ${sponsorLogo(sponsors.title)}
        <strong>${esc(sponsors.title?.name || "Title Sponsor")}</strong>
      </article>
      <article class="featured-sponsor">
        <small>Powered By</small>
        ${sponsorLogo(sponsors.poweredBy)}
        <strong>${esc(sponsors.poweredBy?.name || "Powered By")}</strong>
      </article>
    </div>
    ${partners.length ? `<div class="sponsor-row-block">
      <div class="sponsor-wall major-sponsor-wall count-${Math.min(Math.max(majorSponsors.length, 1), 3)}">${sponsorTiles(majorSponsors)}</div>
    </div>
    ${teamSponsors.length ? `<div class="sponsor-row-block">
      <div class="sponsor-wall team-sponsor-wall count-${Math.min(Math.max(teamSponsors.length, 1), 4)}">${sponsorTiles(teamSponsors)}</div>
    </div>` : ""}` : `<div class="sponsor-wall"><div class="empty">Supporting sponsors can be added from Admin Panel > Sponsors.</div></div>`}
  </section>`;
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
function findBattingAdminEvent(match, eventId) {
  for (const [playerId, row] of Object.entries(match.batting || {})) {
    const event = (row.events || []).find((item) => item.id === eventId && item.type === "batting");
    if (event) return { playerId, row, event };
  }
  return null;
}
function findBowlingAdminEvent(match, eventId) {
  for (const [playerId, row] of Object.entries(match.bowling || {})) {
    const event = (row.events || []).find((item) => item.id === eventId && item.type === "bowling");
    if (event) return { playerId, row, event };
  }
  return null;
}
function removeBattingAdminEvent(match, eventId) {
  const found = findBattingAdminEvent(match, eventId);
  if (!found) return false;
  found.row.runs = Math.round((Number(found.row.runs || 0) - Number(found.event.runs || 0)) * 10) / 10;
  found.row.balls = Math.max(0, Number(found.row.balls || 0) - Number(found.event.balls || 0));
  found.row.events = (found.row.events || []).filter((event) => event.id !== eventId);
  return found;
}
function removeBowlingAdminEvent(match, eventId) {
  const found = findBowlingAdminEvent(match, eventId);
  if (!found) return false;
  found.row.wickets = Math.max(0, Number(found.row.wickets || 0) - Number(found.event.wickets || 0));
  found.row.runs = Math.round((Number(found.row.runs || 0) - Number(found.event.runs || 0)) * 10) / 10;
  found.row.balls = Math.max(0, Number(found.row.balls || 0) - Number(found.event.balls || 0));
  found.row.events = (found.row.events || []).filter((event) => event.id !== eventId);
  const targetId = found.event.targetId;
  if (targetId && match.batting?.[targetId]) {
    const targetRow = match.batting[targetId];
    (targetRow.events || []).filter((event) => event.sourceEventId === eventId && event.type === "batting").forEach((event) => {
      targetRow.runs = Math.round((Number(targetRow.runs || 0) - Number(event.runs || 0)) * 10) / 10;
      targetRow.balls = Math.max(0, Number(targetRow.balls || 0) - Number(event.balls || 0));
    });
    targetRow.events = (targetRow.events || []).filter((event) => event.sourceEventId !== eventId);
    const wicketEvents = (targetRow.events || []).filter((event) => event.type === "wicket");
    if (!wicketEvents.length || targetRow.wicketBy === found.playerId) {
      targetRow.out = Boolean(wicketEvents.length);
      targetRow.wicketBy = wicketEvents.length ? targetRow.wicketBy : "";
    }
  }
  return found;
}
function battingAdminEvents(match) {
  return Object.entries(match.batting || {}).flatMap(([playerId, row]) => (row.events || [])
    .filter((event) => event.type === "batting")
    .map((event) => ({ playerId, event })))
    .sort((a, b) => String(b.event.at || "").localeCompare(String(a.event.at || "")));
}
function bowlingAdminEvents(match) {
  return Object.entries(match.bowling || {}).flatMap(([playerId, row]) => (row.events || [])
    .filter((event) => event.type === "bowling")
    .map((event) => ({ playerId, event })))
    .sort((a, b) => String(b.event.at || "").localeCompare(String(a.event.at || "")));
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
function batsmenSummaryForTeam(match, teamId) {
  const openers = openersFor(match, teamId);
  const rows = teamPlayers(teamId).map((player) => {
    const row = match.batting[player.id] || { runs: 0, balls: 0, out: false };
    return { player, row };
  }).sort((a, b) => {
    const aSr = a.row.balls ? (a.row.runs / a.row.balls) : 0;
    const bSr = b.row.balls ? (b.row.runs / b.row.balls) : 0;
    return Number(b.row.runs || 0) - Number(a.row.runs || 0) || bSr - aSr || Number(a.row.balls || 0) - Number(b.row.balls || 0);
  }).map(({ player, row }) => {
    const sr = row.balls ? ((row.runs / row.balls) * 100).toFixed(1) : "0.0";
    const imposter = isVisibleImposter(match, teamId, player.id);
    const name = `${esc(matchDisplayPlayerName(match, player))}${openers.includes(player.id) ? " (Op)" : ""}${imposter ? ` <span class="imposter-name">(Imp)</span>` : ""}`;
    const status = row.out
      ? `out${row.wicketBy ? ` / wicket by ${matchPlayerName(match, row.wicketBy)}` : ""} / 50% future score`
      : "not out";
    return `
      <div class="player-summary clickable-player" data-action="open-player-detail" data-match="${match.id}" data-player="${player.id}" role="button" tabindex="0" aria-label="Open scoring details for ${esc(displayPlayerName(player))}">
        <div>
          <strong class="${imposter ? "imposter-name" : ""}">${name}</strong>
          <span class="muted">${esc(status)} ${openers.includes(player.id) ? " / opener" : ""}</span>
        </div>
        <div class="score-metrics">
          <span><b>${row.runs || 0}</b><small>R</small></span>
          <span><b>${row.balls || 0}</b><small>B</small></span>
          <span><b>${sr}</b><small>SR</small></span>
        </div>
      </div>
    `;
  });
  const extras = extrasTotalForTeam(match, teamId);
  if (extras) {
    rows.push(`<div class="player-summary">
      <div><strong>${esc(teamName(teamId))} Extras</strong></div>
      <div class="score-metrics"><span><b>${extras}</b><small>R</small></span><span><b>0</b><small>B</small></span><span><b>-</b><small>SR</small></span></div>
    </div>`);
  }
  return rows.join("");
}
function batsmenSummary(match) {
  return batsmenSummaryForTeam(match, match.battingTeamId);
}
function bowlingPanelEntries(match, teamId) {
  return bowlingAssignmentsForTeam(match, teamId).map((bowler) => {
    const player = byId(data.players, bowler.playerId);
    return player ? { player, day: bowler.day || "" } : null;
  }).filter(Boolean);
}
function bowlersSummaryForTeam(match, teamId) {
  return bowlingPanelEntries(match, teamId).map(({ player, day }) => {
    const figures = derivedBowlingFigures(match, player.id);
    const economy = figures.balls ? figures.economy.toFixed(2) : "0.00";
    const roleText = day ? `bowling day: ${shortDay(day)}` : "Selected bowler";
    return `
      <div class="player-summary bowler-summary clickable-player" data-action="open-player-detail" data-match="${match.id}" data-player="${player.id}" role="button" tabindex="0" aria-label="Open scoring details for ${esc(displayPlayerName(player))}">
        <div>
          <strong>${esc(matchDisplayPlayerName(match, player))}</strong>
          <span class="muted">${esc(roleText)}</span>
        </div>
        <div class="score-metrics">
          <span><b>${figures.runs || 0}</b><small>R</small></span>
          <span><b>${figures.balls || 0}</b><small>B</small></span>
          <span><b>${figures.wickets || 0}</b><small>W</small></span>
          <span><b>${economy}</b><small>Econ</small></span>
        </div>
      </div>
    `;
  }).join("");
}
function bowlersSummary(match) {
  return bowlersSummaryForTeam(match, match.bowlingTeamId);
}

function renderShell(content) {
  app.innerHTML = `
    <section class="screen active"><div class="wrap">${sponsorRibbon()}${content}</div></section>
  `;
  [...nav.querySelectorAll("a")].forEach((link) => link.classList.toggle("active", link.dataset.route === route));
}

function homeView() {
  const liveMatches = data.matches.filter((m) => m.status === "live");
  const upcomingMatches = data.matches.filter((m) => m.status === "upcoming").slice(0, 2);
  const sponsors = data.sponsors || seed.sponsors;
  renderShell(`
    <div class="hero">
      <div class="home-sponsor-hero">
        <div class="league-brand-stage">
          <div class="home-main-sponsor">
            ${sponsorLogo(sponsors.title)}
          </div>
          <div class="league-logo-hero" aria-label="Diorite Premier League DPL 2.0">
            <img src="./assets/dpl-logo-main.png" alt="Diorite Premier League DPL 2.0 logo">
          </div>
          <div class="home-main-sponsor powered">
            <small>Powered By</small>
            ${sponsorLogo(sponsors.poweredBy)}
          </div>
        </div>
      </div>
      <div class="grid">
        ${liveMatches.length ? liveMatches.map((match, index) => `
          <div class="card match-card home-live-card">
            <span class="live-badge">Live Match ${index + 1}</span>
            <h2 class="panel-title" style="margin-top:1rem">${esc(matchTitle(match))}</h2>
            ${homeLiveScoreCard(match)}
          </div>
        `).join("") : upcomingMatches.length ? upcomingMatches.map((match, index) => homeUpcomingMatchCard(match, index)).join("") : `
          <div class="card match-card">
            <span class="live-badge">Live Desk</span>
            <h2 class="panel-title" style="margin-top:1rem">No upcoming matches</h2>
            <div class="empty">Add or schedule matches from admin.</div>
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
      <article class="card"><h3>Rules Summary</h3><p class="muted">Batting actions score runs and balls. Bowling actions claim wickets or penalties. After a wicket, that player's future regular batting scoring is halved. A full team all out stops regular scoring, while admin manual bonuses can still be added.</p></article>
      <article class="card"><h3>Awards Summary</h3><p class="muted">Orange Cap, Purple Cap, Best Strike Rate, Best Economy, MVP, and Match awards update from scorecards and can be edited from admin.</p></article>
    </div>
    <div class="card fixtures-card" style="margin-top:1rem">
      <div class="section-head"><h2>10 Matches Across 5 Weeks</h2><span class="pill">Fixture Grid</span></div>
      <div class="fixture-grid">${data.matches.map(matchFixtureCard).join("")}</div>
    </div>
    ${homeSponsorShowcase()}
  `);
}

function homeUpcomingMatchCard(match, index) {
  return `<div class="card match-card home-live-card home-upcoming-card">
    <span class="live-badge">Upcoming Match ${index + 1}</span>
    <div class="scorecard-meta-row"><div class="home-match-time">${esc(matchLabel(match))} / ${esc(shortDay(scoreboardDay(match)))}</div><span class="score-status-badge completed">Upcoming</span></div>
    <h2 class="panel-title" style="margin-top:1rem">${esc(matchTitle(match))}</h2>
    <div class="home-scoreline">
      <div class="home-team-block">
        <div class="team-strip">${teamBadge(match.teamAId)}<div><strong>${esc(teamName(match.teamAId))}</strong><span class="scoreboard-role-label batting-label">Team A</span></div></div>
      </div>
      <div class="home-score-number">VS</div>
      <div class="home-team-block">
        <div class="team-strip bowling-strip"><div><strong>${esc(teamName(match.teamBId))}</strong><span class="scoreboard-role-label bowling-label">Team B</span></div>${teamBadge(match.teamBId)}</div>
      </div>
    </div>
    <div class="toss-line">Start: ${esc(matchTimeText(match.startAt))}</div>
    <div class="home-score-meta">
      <span>Venue ${esc(match.venue || "DPL Arena")}</span>
      <span>Awaiting toss</span>
    </div>
  </div>`;
}

function homeLiveScoreCard(match) {
  const score = scoreOf(match);
  const target = targetInfo(match);
  const currentOpeners = openersFor(match, match.battingTeamId);
  const openers = currentOpeners.map((playerId) => matchPlayerName(match, playerId)).join(", ") || "Openers not selected";
  const bowler = scoreboardBowlerText(match);
  const dayText = shortDay(scoreboardDay(match));
  return `
    <div class="scorecard-meta-row"><div class="home-match-time">${esc(matchLabel(match))} / ${esc(dayText)}</div><span class="score-status-badge live">Live</span></div>
    <div class="home-scoreline">
      <div class="home-team-block">
        <div class="team-strip">${teamBadge(match.battingTeamId)}<div><strong>${esc(teamName(match.battingTeamId))}</strong><span class="scoreboard-role-label batting-label">Batting</span></div></div>
        <p><strong>Openers</strong><span>${esc(openers)}</span></p>
      </div>
      <div class="home-score-number">${score.runs}/${score.wickets}</div>
      <div class="home-team-block">
        <div class="team-strip bowling-strip"><div><strong>${esc(teamName(match.bowlingTeamId))}</strong><span class="scoreboard-role-label bowling-label">Bowling</span></div>${teamBadge(match.bowlingTeamId)}</div>
        <p><strong>Bowler</strong><span>${esc(bowler)}</span></p>
      </div>
    </div>
    ${homeInningsScoreLine(match)}
    <div class="toss-line">${esc(tossText(match))}</div>
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
  const target = targetInfo(match);
  const currentOpeners = openersFor(match, match.battingTeamId);
  const openers = currentOpeners.map((playerId) => matchPlayerName(match, playerId)).join(", ") || "Openers not selected";
  const bowler = scoreboardBowlerText(match);
  const dayText = shortDay(scoreboardDay(match));
  return `
    <div class="score-click" data-action="open-scorecard" data-id="${match.id}" role="button" tabindex="0" aria-label="Open scorecard for ${esc(matchTitle(match))}">
      <div class="scorecard-meta-row"><div class="home-match-time">${esc(matchLabel(match))} / ${esc(dayText)}</div><span class="score-status-badge live">Live</span></div>
      <div class="home-scoreline">
        <div class="home-team-block">
          <div class="team-strip">${teamBadge(match.battingTeamId)}<div><strong>${esc(teamName(match.battingTeamId))}</strong><span class="scoreboard-role-label batting-label">Batting</span></div></div>
          <p><strong>Openers</strong><span>${esc(openers)}</span></p>
        </div>
        <div class="home-score-number">${score.runs}/${score.wickets}</div>
        <div class="home-team-block">
          <div class="team-strip bowling-strip"><div><strong>${esc(teamName(match.bowlingTeamId))}</strong><span class="scoreboard-role-label bowling-label">Bowling</span></div>${teamBadge(match.bowlingTeamId)}</div>
          <p><strong>Bowler</strong><span>${esc(bowler)}</span></p>
        </div>
      </div>
      ${inningsScoreLine(match)}
      <div class="toss-line">${esc(tossText(match))}</div>
      <div class="statline"><span>Innings ${match.innings}</span><span class="${match.powerplay ? "green" : "muted"}">${match.powerplay ? "Powerplay active" : "Powerplay off"}</span><span>RR ${score.rr}</span>${target ? `<span class="orange live-mobile-extra">Target ${target.target}</span><span class="orange live-mobile-extra">Need ${target.required} to win</span>` : ""}</div>
      <div class="chips" style="margin-top:.8rem">
        <span class="pill">${oversText(score.balls)}</span>
        ${target ? `<span class="pill live-mobile-extra">Target ${target.target}</span>` : ""}
        <span class="pill live-mobile-extra">Wickets ${score.wickets}</span>
        <span class="pill live-mobile-extra">Bowling impact ${bowl.wickets} wkts</span>
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
        <aside class="card"><h3 class="panel-title">Commentary Feed</h3><div class="commentary live-commentary">${commentaryHtml(match)}</div></aside>
      </div>
    `).join("") : `<div class="empty">No live matches right now. Set a match status to live in admin.</div>`}
  `);
}

function miniPanel(title, value) {
  return `<div class="card" style="box-shadow:none"><strong>${esc(title)}</strong><p class="muted">${esc(value)}</p></div>`;
}
function miniPanelRich(title, html) {
  return `<div class="card" style="box-shadow:none"><strong>${esc(title)}</strong><p class="muted">${html}</p></div>`;
}
function selectedBowlersPanel(match, teamId) {
  return miniPanelRich("Selected bowlers", selectedBowlersHtml(match, teamId));
}
function openingBatsmenPanel(match, teamId) {
  const openers = openersFor(match, teamId);
  const html = openers.length ? openers.map((playerId) => `<strong class="setup-value">${esc(matchPlayerName(match, playerId))}</strong>`).join(", ") : "Not selected";
  return miniPanelRich("Opening batsmen", html);
}
function scoreTable(title, heads, rows) {
  return `<div class="card"><h3 class="panel-title">${esc(title)}</h3><div class="table-wrap"><table><thead><tr>${heads.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows || "<tr><td colspan='5'>No rows</td></tr>"}</tbody></table></div></div>`;
}
function commentaryHtml(match) {
  return (match.commentary || []).map((c) => `<div class="comment"><strong>${esc(c.time)}</strong>${esc(c.text)}</div>`).join("") || `<div class="empty">No commentary yet.</div>`;
}
function resultTeamRow(match, teamId) {
  const score = scoreOfTeam(match, teamId);
  const isWinner = match.winnerId === teamId;
  return `<div class="result-team ${isWinner ? "winner" : ""}">
    ${isWinner ? `<span class="winner-badge">Winner</span>` : ""}
    <div class="team-strip">${teamBadge(teamId)}<div><strong>${esc(teamName(teamId))}</strong><p class="muted">${isWinner ? "Winner" : "Final score"}</p></div></div>
    <div class="result-score">${score.runs}/${score.wickets}<span>${oversText(score.balls)}</span></div>
  </div>`;
}

function resultsView() {
  const completed = data.matches.filter((m) => m.status === "completed");
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Archive</span><h1 class="page-title">Previous Results</h1></div></div>
    <div class="grid two">
      ${completed.length ? completed.map((match) => {
        return `<article class="card match-card result-card">
          <div class="result-head">
            <div><div class="scorecard-meta-row"><span class="eyebrow">${esc(matchLabel(match))}</span><span class="score-status-badge completed">Completed</span></div><h3>${esc(matchTitle(match))}</h3></div>
            <span class="pill green">Completed</span>
          </div>
          <div class="result-scoreboard">
            ${resultTeamRow(match, match.teamAId)}
            <span class="result-vs">vs</span>
            ${resultTeamRow(match, match.teamBId)}
          </div>
          <div class="result-awards">
            <span>Winner <strong class="green">${esc(teamName(match.winnerId))}</strong></span>
            <span>MVP <strong>${esc(playerName(match.matchMvpId))}</strong></span>
            <span>POTM <strong>${esc(playerName(match.playerOfMatchId))}</strong></span>
          </div>
          <div class="chips result-times"><span class="pill">Started: ${esc(matchTimeText(match.startAt))}</span><span class="pill">Completed: ${esc(matchTimeText(match.completedAt))}</span></div>
          <button class="button primary small" data-action="open-scorecard" data-id="${match.id}">Full Scorecard</button>
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
    Object.keys(map).forEach((pid) => {
      const figures = derivedBowlingFigures(match, pid);
      const row = match.bowling?.[pid];
      if (!row && !figures.balls && !figures.runs && !figures.wickets) return;
      map[pid].wickets += figures.wickets;
      map[pid].bowlRuns += figures.runs;
      map[pid].bowlBalls += figures.balls;
    });
    if (match.playerOfMatchId && map[match.playerOfMatchId]) map[match.playerOfMatchId].motm += 1;
  });
  return Object.values(map).map((row) => ({
    ...row,
    strikeRate: row.balls ? (row.runs / row.balls) * 100 : 0,
    economy: row.bowlBalls ? Math.max(0, row.bowlRuns) / row.bowlBalls : 0,
  })).map((row) => ({ ...row, mvp: mvpScore(row) }));
}
function mvpScore(row) {
  const battingBase = row.runs;
  const strikeBonus = row.balls >= 6 ? Math.min(30, Math.max(0, row.strikeRate - 100) / 5) : 0;
  const wicketBonus = row.wickets * 25;
  const bowlingVolume = row.bowlBalls >= 6 ? Math.min(12, row.bowlBalls / 2) : 0;
  const economyBonus = row.bowlBalls >= 6 ? Math.max(0, 12 - row.economy) * 3 : 0;
  return Math.round((battingBase + strikeBonus + wicketBonus + bowlingVolume + economyBonus) * 10) / 10;
}
function leader(rows, sorter) { return [...rows].sort(sorter)[0]; }
function topPlayers(rows, sorter, filter = () => true) {
  return rows.filter(filter).sort(sorter).slice(0, 5);
}
function awardBallsEligible(row, mode = "any") {
  if (mode === "batting") return Number(row.balls || 0) >= 11;
  if (mode === "bowling") return Number(row.bowlBalls || 0) >= 11;
  return Number(row.balls || 0) >= 11 || Number(row.bowlBalls || 0) >= 11;
}
function awardKey(title) {
  return {
    "Orange Cap": "orange",
    "Purple Cap": "purple",
    "Best Strike Rate": "strike",
    "Best Economy": "economy",
    "Most Valuable Player": "mvp",
  }[title] || "award";
}
function leaderboardCard(title, rows, metricLabel, valueGetter, subGetter) {
  const titleEmoji = {
    "Orange Cap": "🟠",
    "Purple Cap": "🟣",
    "Best Strike Rate": "⚡",
    "Best Economy": "🎯",
    "Most Valuable Player": "⭐",
  }[title] || "🏅";
  const titleIcon = title === "Orange Cap"
    ? `<span class="cap-icon orange-cap-icon" aria-label="Orange Cap"></span>`
    : title === "Purple Cap"
      ? `<span class="cap-icon purple-cap-icon" aria-label="Purple Cap"></span>`
      : title === "Best Strike Rate"
        ? `<span class="award-icon lightning-icon" aria-label="Best Strike Rate"></span>`
        : title === "Best Economy"
          ? `<span class="award-icon economy-icon" aria-label="Best Economy"></span>`
          : title === "Most Valuable Player"
            ? `<span class="award-icon mvp-icon" aria-label="Most Valuable Player"></span>`
            : titleEmoji;
  return `<article class="card leaderboard-card">
    <div class="section-head"><h2>${esc(title)}</h2><span class="pill">Top 5</span></div>
    <div class="leaderboard-list">
      ${rows.length ? rows.map((row, index) => `
        <div class="leaderboard-row clickable-award-row" data-action="open-award-player-detail" data-player="${row.player.id}" data-award="${awardKey(title)}" role="button" tabindex="0" aria-label="Open compact ${esc(title)} details for ${esc(displayPlayerName(row.player))}">
          <span class="rank ${index === 0 ? "winner-rank" : ""}">${index === 0 ? titleIcon : index + 1}</span>
          <div>
            <strong>${esc(displayPlayerName(row.player))}</strong>
            <span class="muted">${esc(teamName(row.player.teamId))}</span>
          </div>
          <div class="leaderboard-value"><b>${esc(valueGetter(row))}</b><small>${esc(metricLabel)}</small></div>
        </div>
      `).join("") : `<p class="muted">No eligible players yet.</p>`}
    </div>
  </article>`;
}
function battingAwardMeta(row) {
  return `Runs scored ${row.runs} / ${row.balls} B / SR ${row.strikeRate.toFixed(1)}`;
}
function bowlingAwardMeta(row) {
  return `Runs conceded ${row.bowlRuns} / ${row.bowlBalls} B / Econ ${row.economy.toFixed(2)}`;
}
function allRoundAwardMeta(row) {
  return `Runs scored ${row.runs} / Wickets ${row.wickets} / Runs conceded ${row.bowlRuns}`;
}
function playerInningsBreakdown(playerId, matches) {
  const player = byId(data.players, playerId);
  if (!player) return { batting: [], bowling: [] };
  const batting = [];
  const bowling = [];
  matches.forEach((match) => {
    const first = firstInningsInfo(match);
    const battingRow = match.batting?.[playerId];
    const bowlingRow = match.bowling?.[playerId];
    const figures = derivedBowlingFigures(match, playerId);
    const inningsForTeam = (teamId) => first && first.teamId === teamId ? "1st innings" : Number(match.innings) === 2 ? "2nd innings" : "Current innings";
    const bowlingInningsForTeam = (teamId) => {
      if (first && opponentTeamId(match, first.teamId) === teamId) return "1st innings bowling";
      if (match.bowlingTeamId === teamId) return Number(match.innings) === 2 ? "2nd innings bowling" : "Current innings bowling";
      return "Bowling";
    };
    if (battingRow || match.playerOfMatchId === playerId || match.matchMvpId === playerId) {
      const runs = Number(battingRow?.runs || 0);
      const balls = Number(battingRow?.balls || 0);
      batting.push({
        match,
        innings: inningsForTeam(player.teamId),
        runs,
        balls,
        strikeRate: balls ? ((runs / balls) * 100).toFixed(1) : "0.0",
        status: battingRow?.out ? `Out${battingRow.wicketBy ? ` by ${playerName(battingRow.wicketBy)}` : ""}` : battingRow ? "Not out" : "-",
      });
    }
    if (bowlingRow || figures.balls || figures.runs || figures.wickets) {
      bowling.push({
        match,
        innings: bowlingInningsForTeam(player.teamId),
        runs: Number(figures.runs || 0),
        balls: Number(figures.balls || 0),
        wickets: Number(figures.wickets || 0),
        economy: figures.balls ? figures.economy.toFixed(2) : "0.00",
        day: figures.day ? shortDay(figures.day) : "-",
      });
    }
  });
  return { batting, bowling };
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
  const searchText = statsSearch.trim().toLowerCase();
  const scopedRows = scopedStatsRows().filter((row) => {
    if (!searchText) return true;
    return row.player.name.toLowerCase().includes(searchText) || teamName(row.player.teamId).toLowerCase().includes(searchText);
  });
  const orangeRows = topPlayers(rows, (a, b) => b.runs - a.runs || b.strikeRate - a.strikeRate, (row) => row.runs > 0 && awardBallsEligible(row, "batting"));
  const purpleRows = topPlayers(rows, (a, b) => b.wickets - a.wickets || b.runs - a.runs, (row) => row.wickets > 0 && awardBallsEligible(row, "bowling"));
  const strikeRows = topPlayers(rows, (a, b) => b.strikeRate - a.strikeRate || b.runs - a.runs, (row) => row.balls > 0 && awardBallsEligible(row, "batting"));
  const economyRows = topPlayers(rows, (a, b) => a.economy - b.economy || b.wickets - a.wickets, (row) => row.bowlBalls > 0 && awardBallsEligible(row, "bowling"));
  const mvpRows = topPlayers(rows, (a, b) => b.mvp - a.mvp || b.runs - a.runs || b.wickets - a.wickets, (row) => (row.runs || row.wickets || row.bowlBalls || row.motm) && awardBallsEligible(row));
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Overall Awards</span><h1 class="page-title">League Leaders</h1><p class="lead">Top 5 players for every overall award across the whole Diorite Premier League. Player of the Match stays match-specific and is shown only in match results.</p><p class="muted"><small>Award eligibility: batting awards need at least 11 balls faced, bowling awards need at least 11 balls bowled/conceded, and MVP needs either 11 balls faced or 11 balls bowled/conceded overall.</small></p></div></div>
    <div class="grid two">
      ${leaderboardCard("Orange Cap", orangeRows, "Runs", (row) => row.runs, battingAwardMeta)}
      ${leaderboardCard("Purple Cap", purpleRows, "Wkts", (row) => row.wickets, (row) => `${bowlingAwardMeta(row)} / Wickets ${row.wickets}`)}
      ${leaderboardCard("Best Strike Rate", strikeRows, "SR", (row) => row.strikeRate.toFixed(1), battingAwardMeta)}
      ${leaderboardCard("Best Economy", economyRows, "Econ", (row) => row.economy.toFixed(2), (row) => `${bowlingAwardMeta(row)} / Wickets ${row.wickets}`)}
      ${leaderboardCard("Most Valuable Player", mvpRows, "MVP", (row) => row.mvp, allRoundAwardMeta)}
    </div>
    <div class="card" style="margin-top:1rem">
      <div class="section-head">
        <h2>Detailed Player Stats</h2>
        <div class="stats-controls">
          <label class="scope-select">Search<input data-action="search-stats-player" value="${esc(statsSearch)}" placeholder="Search player or team"></label>
          <label class="scope-select">View<select data-action="select-stats-scope">
            <option value="season" ${statsScope === "season" ? "selected" : ""}>Whole Season</option>
            ${availableWeeks().map((week) => `<option value="week-${week}" ${statsScope === `week-${week}` ? "selected" : ""}>Week ${week}</option>`).join("")}
          </select></label>
        </div>
      </div>
      <p class="muted">Showing ${esc(statsScopeLabel())} stats${statsSearch ? ` filtered by "${esc(statsSearch)}"` : ""}.</p>
      <div class="table-wrap"><table><thead><tr><th>Player</th><th>Team</th><th>Runs</th><th>Balls</th><th>SR</th><th>Outs</th><th>Wkts</th><th>Bowl Runs</th><th>Bowl Balls</th><th>Economy</th><th>MVP</th></tr></thead><tbody>
        ${scopedRows.sort((a,b) => b.mvp - a.mvp).map((r) => `<tr class="clickable-row" data-action="open-stats-player-detail" data-player="${r.player.id}" tabindex="0"><td>${esc(displayPlayerName(r.player))}</td><td>${esc(teamName(r.player.teamId))}</td><td class="orange">${r.runs}</td><td>${r.balls}</td><td>${r.strikeRate.toFixed(1)}</td><td>${r.outs}</td><td class="purple">${r.wickets}</td><td>${r.bowlRuns}</td><td>${r.bowlBalls}</td><td>${r.bowlBalls ? r.economy.toFixed(2) : "-"}</td><td>${r.mvp}</td></tr>`).join("")}
      </tbody></table></div>
    </div>
  `);
}

function pointsRows() {
  return data.teams.map((team) => {
    const completed = data.matches.filter((m) => m.status === "completed" && [m.teamAId, m.teamBId].includes(team.id));
    const wins = completed.filter((m) => m.winnerId === team.id).length;
    let rf = 0, ra = 0, bf = 0, ba = 0;
    completed.forEach((m) => {
      const own = scoreOfTeam(m, team.id);
      const opponentId = m.teamAId === team.id ? m.teamBId : m.teamAId;
      const opponent = scoreOfTeam(m, opponentId);
      rf += own.runs;
      bf += own.balls;
      ra += opponent.runs;
      ba += opponent.balls;
    });
    const forRate = bf ? rf / bf : 0;
    const againstRate = ba ? ra / ba : 0;
    return { team, matches: completed.length, wins, losses: completed.length - wins, points: wins * 2, rf, ra, nrr: completed.length ? (forRate - againstRate).toFixed(2) : "0.00" };
  }).sort((a,b) => b.points - a.points || Number(b.nrr) - Number(a.nrr));
}
function scoringCriteriaSection() {
  const batting = scoringRules.batting.map(([, label, runs, balls]) => `
    <div class="rule-chip"><span>${esc(label)}</span><strong>${runs} R</strong><small>${balls} B</small></div>
  `).join("");
  const extras = scoringRules.extras.map(([, label, runs]) => `
    <div class="rule-chip"><span>${esc(label)}</span><strong>${runs} R</strong><small>Team</small></div>
  `).join("");
  const specialRules = `
    <div class="rule-chip rule-chip-detail">
      <span>Opening Batsmen</span><strong>2x</strong>
      <small>Two selected openers score double only on their team's powerplay day. Normal scoring resumes after that day.</small>
    </div>
    <div class="rule-chip rule-chip-detail">
      <span>Secret Imposter</span><strong>50%</strong>
      <small>The imposter's own batting score stays fully credited, and 50% of that batting score is also added to the opponent team's total.</small>
    </div>
  `;
  const bowling = scoringRules.bowling.map(([, label, wickets, runs]) => `
    <div class="rule-chip"><span>${esc(label)}</span><strong>${wickets} W</strong><small>${runs ? `${runs} R` : "Claim"}</small></div>
  `).join("");
  return `
    <div class="card criteria-board">
      <div class="section-head"><div><span class="eyebrow">Rules</span><h2>Scoring Matrix</h2></div><span class="pill">Runs, Balls and Wickets</span></div>
      <div class="criteria-layout">
        <div class="criteria-column">
          <article class="criteria-panel batting"><h3>Batting</h3><div class="rule-grid">${batting}</div></article>
          <article class="criteria-panel bowling"><h3>Bowling Claims</h3><div class="rule-grid">${bowling}</div></article>
        </div>
        <div class="criteria-column">
          <article class="criteria-panel extras"><h3>Extras</h3><div class="rule-grid compact">${extras}</div></article>
          <article class="criteria-panel special-rules"><h3>Special Match Rules</h3><div class="rule-grid compact">${specialRules}</div></article>
          <article class="criteria-panel wickets"><h3>Wicket Rule</h3><div class="rule-grid compact"><div class="rule-chip"><span>Player Loses Wicket</span><strong>50%</strong><small>Future Regular Scoring</small></div><div class="rule-chip"><span>Full Team All Out</span><strong>Stop</strong><small>Regular Scoring Only</small></div><div class="rule-chip"><span>Manual Batting Bonus</span><strong>Full</strong><small>No 50% Or All-Out Block</small></div></div></article>
        </div>
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
  return `<article class="fixture-card ${match.status === "live" ? "is-live" : ""}">
    <span class="fixture-week">W${match.week} M${matchNumber(match) || ""}</span>
    <strong>${esc(matchTitle(match))}</strong>
    <span class="${match.status === "live" ? "green" : match.status === "completed" ? "orange" : "muted"}">${match.status}</span>
  </article>`;
}

function adminView() {
  adminUnlocked = isAdminSessionValid();
  if (!adminUnlocked) {
    renderShell(`
      <div class="card" style="max-width:520px;margin:4rem auto">
        <span class="eyebrow">Protected Admin</span>
        <h1 class="page-title" style="font-size:3rem">Unlock Control Room</h1>
        <p class="muted">The control room locks automatically after 5 minutes of inactivity.</p>
        <form data-form="login" class="grid">
          <label>Password<input type="password" name="password" placeholder="Enter admin password" autocomplete="current-password"></label>
          <button class="button primary">Unlock Admin</button>
        </form>
      </div>
    `);
    return;
  }
  renderShell(`
    <div class="section-head"><div><span class="eyebrow">Admin</span><h1 class="page-title">Control Room</h1><p class="muted">${firebaseConnected ? "Online sync connected. Admin saves publish to Firebase." : "Online sync connecting. If this stays here, check Firebase rules."} <span class="pill">Build ${esc(APP_VERSION)}</span></p></div><button class="button danger" data-action="lock-admin">Lock</button></div>
    <div class="admin-shell">
      <aside class="admin-tabs">${["live","teams","players","matches","awards","criteria","sponsors","backup"].map((tab) => `<button data-action="admin-tab" data-tab="${tab}" class="${adminTab === tab ? "active" : ""}">${tab[0].toUpperCase() + tab.slice(1)}</button>`).join("")}</aside>
      <div>
        ${adminPanel("live", liveAdmin())}
        ${adminPanel("teams", teamsAdmin())}
        ${adminPanel("players", playersAdmin())}
        ${adminPanel("matches", matchesAdmin())}
        ${adminPanel("awards", awardsAdmin())}
        ${adminPanel("criteria", criteriaAdmin())}
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
  const battingSetup = setupForTeam(match, match.battingTeamId);
  const bowlingSetup = setupForTeam(match, match.bowlingTeamId);
  const battingPowerplayDay = battingSetup.battingPowerplayDay || match.battingPowerplayDay || "Wednesday";
  const battingMemory = liveMemory(match, "batting");
  const bowlingMemory = liveMemory(match, "bowling");
  const battingBonusMemory = liveMemory(match, "battingBonus");
  const bowlingBonusMemory = liveMemory(match, "bowlingBonus");
  const teamSetupForm = (teamId) => {
    const setup = setupForTeam(match, teamId);
    const opponentId = opponentTeamId(match, teamId);
    return `<div class="card"><h3>${esc(teamName(teamId))} Setup</h3>
      <div class="form-grid">
        <label>Powerplay day<select name="ppDay_${teamId}">${dayOptions(setup.battingPowerplayDay || (teamId === match.teamAId ? "Wednesday" : "Saturday"))}</select></label>
        <label>Secret imposter<select name="imposter_${teamId}">${matchTeamPlayerOptions(match, setup.secretImposterId || "", opponentId)}</select></label>
        <label>Opener 1<select name="opener_${teamId}_0">${matchTeamPlayerOptions(match, setup.openers?.[0] || "", teamId)}</select></label>
        <label>Opener 2<select name="opener_${teamId}_1">${matchTeamPlayerOptions(match, setup.openers?.[1] || "", teamId)}</select></label>
        ${[0,1,2].map((i) => `<label>Bowler ${i + 1}<select name="bowler_${teamId}_${i}">${matchTeamPlayerOptions(match, setup.bowlers?.[i]?.playerId || "", teamId)}</select></label><label>Bowling day ${i + 1}<select name="bowlerDay_${teamId}_${i}">${dayOptions(setup.bowlers?.[i]?.day || ["Wednesday","Thursday","Friday"][i])}</select></label>`).join("")}
      </div>
    </div>`;
  };
  return `<div class="grid admin-live-panel">
    <div class="admin-live-jump">
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-match-state">Match</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-batting-score">Batting</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-bowling-score">Bowling</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-bowling-tracker">Claims</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-bonuses">Bonus</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-wickets">Wickets</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-complete">Finish</button>
      <button class="button small" type="button" data-action="scroll-admin-section" data-target="admin-commentary">Commentary</button>
    </div>
    <div class="card" id="admin-match-state"><h2>Edit Live Scores</h2><form class="form-grid" data-form="match-state">
      <label>Match<select name="matchId" data-action="select-admin-live-match">${matchOptions(match.id)}</select></label>
      <label>Status<select name="status"><option ${match.status==="upcoming"?"selected":""}>upcoming</option><option ${match.status==="live"?"selected":""}>live</option><option ${match.status==="completed"?"selected":""}>completed</option></select></label>
      <label>Batting team<select name="battingTeamId">${matchTeamOptions(match, match.battingTeamId)}</select></label>
      <label>Bowling team<select name="bowlingTeamId">${matchTeamOptions(match, match.bowlingTeamId)}</select></label>
      <label>Toss winner<select name="tossWinnerId">${matchTeamOptions(match, match.tossWinnerId)}</select></label>
      <label>Toss choice<select name="tossChoice"><option value="bat" ${match.tossChoice !== "bowl" ? "selected" : ""}>Bat</option><option value="bowl" ${match.tossChoice === "bowl" ? "selected" : ""}>Bowl</option></select></label>
      <label>Current innings<input name="innings" type="number" min="1" max="2" value="${match.innings}"></label>
      <label>Current match day<select name="currentDay">${dayOptions(match.currentDay || "Wednesday")}</select></label>
      <label>1st innings runs<input name="firstInningsRuns" type="number" min="0" value="${esc(match.firstInningsRuns || "")}" placeholder="Target source"></label>
      <label>Match starts at<input name="startAt" type="datetime-local" value="${esc(dateTimeInputValue(match.startAt))}"></label>
      <label>Match completed at<input name="completedAt" type="datetime-local" value="${esc(dateTimeInputValue(match.completedAt))}"></label>
      <label>Powerplay<select name="powerplay"><option value="true" ${match.powerplay ? "selected" : ""}>On</option><option value="false" ${!match.powerplay ? "selected" : ""}>Off</option></select></label>
      <div class="grid two full">${teamSetupForm(match.teamAId)}${teamSetupForm(match.teamBId)}</div>
      <button class="button primary full">Save Match State</button>
    </form></div>
    <div class="grid two">
      <div class="card" id="admin-batting-score"><h3>Batting Scoring</h3><form class="grid" data-form="batting-score"><input type="hidden" name="matchId" value="${match.id}"><input type="hidden" name="editEventId" value="${esc(battingMemory.editEventId || "")}"><label>Activity day<select name="activityDay">${dayOptions(battingMemory.activityDay || match.currentDay || battingPowerplayDay)}</select></label><label>Player<select name="playerId">${matchTeamPlayerOptions(match, battingMemory.playerId || "", match.battingTeamId)}</select></label><label>Scoring event<select name="event">${battingEventOptions(match, battingMemory.playerId || "", battingMemory.event)}</select></label><label>Quantity<input type="number" name="qty" min="1" value="${esc(battingMemory.qty || 1)}"></label><button class="button primary">${battingMemory.editEventId ? "Update Runs" : "Add Runs"}</button></form><p class="muted" style="margin:.6rem 0 0">Openers score double runs and double balls only on ${esc(battingPowerplayDay)} while powerplay is on. Those doubled runs and balls also count in that day's bowler figures. Event dropdown counts show only the selected player's entries in this match.</p><div class="chips" style="margin-top:.75rem">${rules().extras.map(([key,label,r]) => `<button class="button small" data-action="add-extra" data-match="${match.id}" data-key="${key}">${label} +${r}</button>`).join("")}</div><h4 class="panel-title" style="font-size:1.1rem;margin-top:1rem">Batting Entries</h4>${battingAdminEventList(match)}</div>
      <div class="card" id="admin-bowling-score"><h3>Bowling / Wickets</h3><form class="grid" data-form="bowling-score"><input type="hidden" name="matchId" value="${match.id}"><input type="hidden" name="editEventId" value="${esc(bowlingMemory.editEventId || "")}"><label>Bowling day<select name="bowlingDay">${dayOptions(bowlingMemory.bowlingDay || match.currentDay || bowlingSetup.bowlers?.[0]?.day || "Wednesday")}</select></label><label>Bowler<select name="playerId">${selectedBowlerOptions(match, bowlingMemory.playerId || "")}</select></label><label>Bowling event<select name="event">${rules().bowling.map(([key,label,w,r]) => `<option value="${key}" ${key === bowlingMemory.event ? "selected" : ""}>${label} (${w} wicket, ${r} runs)</option>`).join("")}</select></label><label>Target batter<select name="targetId">${matchTeamPlayerOptions(match, bowlingMemory.targetId || "", match.battingTeamId)}</select></label><button class="button purple">${bowlingMemory.editEventId ? "Update Bowling Impact" : "Apply Bowling Impact"}</button></form><h4 class="panel-title" style="font-size:1.1rem;margin-top:1rem">Bowling Entries</h4>${bowlingAdminEventList(match)}</div>
    </div>
    <div class="grid two" id="admin-bonuses">
      <div class="card"><h3>Manual Batting Bonus</h3><form class="grid" data-form="batting-bonus"><input type="hidden" name="matchId" value="${match.id}"><input type="hidden" name="editEventId" value="${esc(battingBonusMemory.editEventId || "")}"><label>Activity day<select name="activityDay">${dayOptions(battingBonusMemory.activityDay || match.currentDay || battingPowerplayDay)}</select></label><label>Player<select name="playerId">${matchPlayerOptions(match, battingBonusMemory.playerId || "")}</select></label><label>Bonus runs<input name="runs" type="number" step="0.1" value="${esc(battingBonusMemory.runs ?? 0)}"></label><label>Bonus balls<input name="balls" type="number" step="1" min="0" value="${esc(battingBonusMemory.balls ?? 0)}"></label><label>Reason<input name="reason" placeholder="Bonus reason" value="${esc(battingBonusMemory.reason || "")}"></label><button class="button primary">${battingBonusMemory.editEventId ? "Update Batting Bonus" : "Add Batting Bonus"}</button></form><p class="muted" style="margin:.6rem 0 0">Manual bonus can be added to either team at any time. It ignores all-out and half-score after wicket, but still counts for secret imposter transfer.</p></div>
      <div class="card"><h3>Manual Bowling Bonus</h3><form class="grid" data-form="bowling-bonus"><input type="hidden" name="matchId" value="${match.id}"><input type="hidden" name="editEventId" value="${esc(bowlingBonusMemory.editEventId || "")}"><label>Bowling day<select name="bowlingDay">${dayOptions(bowlingBonusMemory.bowlingDay || match.currentDay || bowlingSetup.bowlers?.[0]?.day || "Wednesday")}</select></label><label>Player<select name="playerId">${matchPlayerOptions(match, bowlingBonusMemory.playerId || "")}</select></label><label>Bonus wickets<input name="wickets" type="number" step="0.1" value="${esc(bowlingBonusMemory.wickets ?? 0)}"></label><label>Run impact<input name="runs" type="number" step="0.1" value="${esc(bowlingBonusMemory.runs ?? 0)}"></label><label>Reason<input name="reason" placeholder="Bonus or penalty reason" value="${esc(bowlingBonusMemory.reason || "")}"></label><button class="button purple">${bowlingBonusMemory.editEventId ? "Update Bowling Bonus" : "Add Bowling Bonus"}</button></form><p class="muted" style="margin:.6rem 0 0">Manual bonus wickets can be added to any player from either match team on any day.</p></div>
    </div>
    <div class="grid two">
      <div class="card" id="admin-wickets"><h3>Player Wickets</h3><div class="mini-list">${teamPlayers(match.battingTeamId).map((p) => {
        const row = match.batting[p.id] || { out: false, wicketBy: "" };
        return `<div class="list-item wicket-admin-row">
          <span>${esc(matchDisplayPlayerName(match, p))} <small class="muted">${row.out ? `Out${row.wicketBy ? ` / wicket by ${matchPlayerName(match, row.wicketBy)}` : ""} / future scoring 50%` : "Not out"}</small></span>
          <label class="compact-label">Wicket by<select data-action="select-wicket-bowler" data-match="${match.id}" data-player="${p.id}">${matchTeamPlayerOptions(match, row.wicketBy || "", match.bowlingTeamId)}</select></label>
          <button class="button small purple" data-action="toggle-out" data-match="${match.id}" data-player="${p.id}">${row.out ? "Undo out" : "Mark out"}</button>
        </div>`;
      }).join("")}</div><button class="button danger" data-action="all-out" data-match="${match.id}" style="margin-top:.75rem">Mark Team All Out</button></div>
      ${bowlingTrackerPanel(match)}
    </div>
    <div class="grid two">
      <div class="card" id="admin-complete"><h3>Complete Match</h3><form class="grid" data-form="complete-match"><input type="hidden" name="matchId" value="${match.id}"><label>Winner<select name="winnerId">${matchTeamOptions(match, match.winnerId)}</select></label><label>Match MVP<select name="matchMvpId">${matchAwardOptions(match, match.matchMvpId, "mvp")}</select></label><label>Player of the Match<select name="playerOfMatchId">${matchAwardOptions(match, match.playerOfMatchId, "potm")}</select></label><label>Match start date and time<input name="startAt" type="datetime-local" value="${esc(dateTimeInputValue(match.startAt))}"></label><label>Match end date and time<input name="completedAt" type="datetime-local" value="${esc(dateTimeInputValue(match.completedAt))}"></label><button class="button green">Complete and Move to Results</button></form><p class="muted" style="margin:.75rem 0 0">MVP is ranked by all-round value: runs, strike rate, wickets, bowling volume, and economy. POTM is ranked separately by standout match impact: top batting or bowling performance, runs, wickets, and decisive efficiency. Both lists use only this selected match's two teams and can still be changed manually.</p><button class="button small" data-action="open-scorecard" data-id="${match.id}" style="margin-top:.75rem">Preview Scorecard</button></div>
      <div class="card" id="admin-commentary"><h3>Edit Commentary</h3><form class="grid" data-form="commentary"><input type="hidden" name="matchId" value="${match.id}"><label>Ball / Time<input name="time" placeholder="12.4"></label><label>Commentary<textarea name="text" placeholder="Add match event"></textarea></label><button class="button primary">Add Commentary</button></form><div class="commentary" style="margin-top:1rem">${commentaryHtml(match)}</div></div>
    </div>
  </div>`;
}
function teamsAdmin() {
  return `<div class="grid two"><div class="card"><h2>Add / Edit Team</h2><form class="form-grid" data-form="team"><input type="hidden" name="id"><label>Name<input name="name" required></label><label>Group<select name="group"><option>A</option><option>B</option></select></label><label>Color<input name="color" type="color" value="#ff8a1f"></label><label>Logo size (%)<input name="logoSize" type="number" min="50" max="180" step="5" value="100"></label><label>Upload team logo<input name="logoFile" type="file" accept="image/*"></label><label class="full">Or team logo URL/path<input name="logo" placeholder="./assets/team-logo.png or https://..."></label><button class="button primary full">Save Team</button></form></div><div class="card"><h2>Teams</h2><div class="mini-list">${data.teams.map((t) => `<div class="list-item"><span>${teamBadge(t.id)} ${esc(t.name)} / Group ${esc(t.group)} <small class="muted">Logo ${logoSizeValue(t.logoSize)}%</small></span><span><button class="button small" data-action="edit-team" data-id="${t.id}">Edit</button> <button class="button small danger" data-action="delete-team" data-id="${t.id}">Remove</button></span></div>`).join("")}</div></div></div>`;
}
function playersAdmin() {
  const roleOptions = `<option value="">Member</option><option value="captain">Captain (C)</option><option value="viceCaptain">Vice Captain (VC)</option><option value="owner">Team Owner (O)</option>`;
  const selectedTeam = adminPlayerTeamFilter === "all" ? "all" : (byId(data.teams, adminPlayerTeamFilter)?.id || "all");
  const filteredPlayers = selectedTeam === "all" ? data.players : teamPlayers(selectedTeam);
  const teamFilterOptions = `<option value="all" ${selectedTeam === "all" ? "selected" : ""}>All Teams</option>${data.teams.map((team) => `<option value="${team.id}" ${selectedTeam === team.id ? "selected" : ""}>${esc(team.name)} (${teamPlayers(team.id).length})</option>`).join("")}`;
  return `<div class="grid two">
    <div class="card">
      <h2>Add / Edit Player</h2>
      <form class="form-grid" data-form="player">
        <input type="hidden" name="id">
        <label>Name<input name="name" required placeholder="Enter member name"></label>
        <label>Team<select name="teamId">${teamOptions()}</select></label>
        <label>Role<select name="role">${roleOptions}</select></label>
        <button class="button primary full">Save Player</button>
      </form>
    </div>
    <div class="card">
      <div class="section-head compact">
        <div><h2>Players</h2><p class="muted">${filteredPlayers.length} shown / ${data.players.length} total</p></div>
        <label class="compact-label player-team-filter">Team<select data-action="select-admin-player-team">${teamFilterOptions}</select></label>
      </div>
      <div class="mini-list">
        ${filteredPlayers.length ? filteredPlayers.map((p) => `<div class="list-item player-admin-row">
          <span>${esc(displayPlayerName(p))} <small class="muted">${esc(teamName(p.teamId))}${p.role ? ` / ${esc(roleTag(p.role).replace(/[()]/g, ""))}` : ""}</small></span>
          <span class="row-actions"><button class="button small" data-action="edit-player" data-id="${p.id}">Edit</button> <button class="button small danger" data-action="delete-player" data-id="${p.id}">Remove</button></span>
        </div>`).join("") : `<div class="empty">No players in this team yet.</div>`}
      </div>
    </div>
  </div>`;
}
function matchesAdmin() {
  return `<div class="grid two"><div class="card"><h2>Add / Edit Match</h2><form class="form-grid" data-form="match"><input type="hidden" name="id"><label>Week<input name="week" type="number" min="1" value="1"></label><label>Status<select name="status"><option>upcoming</option><option>live</option><option>completed</option></select></label><label>Team A<select name="teamAId">${teamOptions()}</select></label><label>Team B<select name="teamBId">${teamOptions()}</select></label><label>Match starts at<input name="startAt" type="datetime-local"></label><label>Match completed at<input name="completedAt" type="datetime-local"></label><label>1st innings runs<input name="firstInningsRuns" type="number" min="0" placeholder="Target source"></label><label class="full">Venue<input name="venue" value="DPL Arena"></label><button class="button primary full">Save Match</button></form></div><div class="card"><h2>Matches</h2><div class="mini-list">${data.matches.map((m) => `<div class="list-item"><span>W${m.week} - ${esc(matchTitle(m))} <small class="muted">${m.status} / Start: ${esc(matchTimeText(m.startAt))} / Done: ${esc(matchTimeText(m.completedAt))}</small></span><span><button class="button small" data-action="edit-match" data-id="${m.id}">Edit</button> <button class="button small danger" data-action="delete-match" data-id="${m.id}">Remove</button></span></div>`).join("")}</div></div></div>`;
}
function awardsAdmin() {
  const rows = playerAggregates();
  const orangeRows = topPlayers(rows, (a, b) => b.runs - a.runs || b.strikeRate - a.strikeRate, (row) => row.runs > 0 && awardBallsEligible(row, "batting"));
  const purpleRows = topPlayers(rows, (a, b) => b.wickets - a.wickets || b.runs - a.runs, (row) => row.wickets > 0 && awardBallsEligible(row, "bowling"));
  const strikeRows = topPlayers(rows, (a, b) => b.strikeRate - a.strikeRate || b.runs - a.runs, (row) => row.balls > 0 && awardBallsEligible(row, "batting"));
  const economyRows = topPlayers(rows, (a, b) => a.economy - b.economy || b.wickets - a.wickets, (row) => row.bowlBalls > 0 && awardBallsEligible(row, "bowling"));
  const mvpRows = topPlayers(rows, (a, b) => b.mvp - a.mvp || b.runs - a.runs || b.wickets - a.wickets, (row) => (row.runs || row.wickets || row.bowlBalls || row.motm) && awardBallsEligible(row));
  return `<div class="card">
    <span class="eyebrow">Overall Awards</span>
    <h2>League Award Leaderboards</h2>
    <p class="muted">Overall awards are calculated from full league performance. Player of the Match remains match-specific and appears in Previous Results.</p>
    <div class="grid two" style="margin-top:1rem">
      ${leaderboardCard("Orange Cap", orangeRows, "Runs", (row) => row.runs, battingAwardMeta)}
      ${leaderboardCard("Purple Cap", purpleRows, "Wkts", (row) => row.wickets, (row) => `${bowlingAwardMeta(row)} / Wickets ${row.wickets}`)}
      ${leaderboardCard("Best Strike Rate", strikeRows, "SR", (row) => row.strikeRate.toFixed(1), battingAwardMeta)}
      ${leaderboardCard("Best Economy", economyRows, "Econ", (row) => row.economy.toFixed(2), (row) => `${bowlingAwardMeta(row)} / Wickets ${row.wickets}`)}
      ${leaderboardCard("Most Valuable Player", mvpRows, "MVP", (row) => row.mvp, allRoundAwardMeta)}
    </div>
  </div>`;
}
function criteriaRows(type) {
  const current = rules()[type] || [];
  return current.map((rule) => {
    const [key, label, primary, secondary] = rule;
    const right = type === "batting"
      ? `${primary} runs / ${secondary} balls`
      : type === "extras"
        ? `${primary} runs`
        : `${primary} wickets / ${secondary} runs`;
    return `<div class="list-item"><span>${esc(label)} <small class="muted">${esc(right)}</small></span><span><button class="button small" data-action="edit-criteria" data-type="${type}" data-key="${esc(key)}">Edit</button> <button class="button small danger" data-action="delete-criteria" data-type="${type}" data-key="${esc(key)}">Remove</button></span></div>`;
  }).join("") || `<div class="empty">No criteria added.</div>`;
}
function criteriaAdmin() {
  return `<div class="grid two">
    <div class="card">
      <h2>Add / Edit Criteria</h2>
      <form class="form-grid" data-form="criteria">
        <input type="hidden" name="originalKey">
        <label>Type<select name="type"><option value="batting">Batting</option><option value="extras">Extras</option><option value="bowling">Bowling / Wicket</option></select></label>
        <label>Key<input name="key" placeholder="unique-key" required></label>
        <label class="full">Label<input name="label" placeholder="Present, Referral Outside, Absent" required></label>
        <label>Runs / Wickets<input name="primary" type="number" step="0.1" value="0"></label>
        <label>Balls / Runs Impact<input name="secondary" type="number" step="0.1" value="0"></label>
        <p class="muted full">Batting: Runs / Balls. Extras: Runs only. Bowling: Wickets / Runs impact.</p>
        <button class="button primary full">Save Criteria</button>
      </form>
    </div>
    <div class="card"><h2>Batting Criteria</h2><div class="mini-list">${criteriaRows("batting")}</div></div>
    <div class="card"><h2>Extras Criteria</h2><div class="mini-list">${criteriaRows("extras")}</div></div>
    <div class="card"><h2>Bowling and Wicket Criteria</h2><div class="mini-list">${criteriaRows("bowling")}</div></div>
  </div>`;
}
function sponsorsAdmin() {
  const sponsors = data.sponsors || seed.sponsors;
  return `<div class="grid two">
    <div class="card">
      <h2>Title Sponsor and Powered By</h2>
      <form class="form-grid" data-form="sponsor-config">
        <label>Title sponsor name<input name="titleName" value="${esc(sponsors.title?.name || "")}"></label>
        <label>Title logo size (%)<input name="titleLogoSize" type="number" min="50" max="180" step="5" value="${logoSizeValue(sponsors.title?.logoSize)}"></label>
        <label>Upload title sponsor logo<input name="titleLogoFile" type="file" accept="image/*"></label>
        <label class="full">Or title sponsor logo URL/path<input name="titleLogo" value="${esc(editableLogoPath(sponsors.title?.logo || ""))}" placeholder="./assets/logo.png or https://..."></label>
        <label>Powered by name<input name="poweredName" value="${esc(sponsors.poweredBy?.name || "")}"></label>
        <label>Powered logo size (%)<input name="poweredLogoSize" type="number" min="50" max="180" step="5" value="${logoSizeValue(sponsors.poweredBy?.logoSize)}"></label>
        <label>Upload powered by logo<input name="poweredLogoFile" type="file" accept="image/*"></label>
        <label class="full">Or powered by logo URL/path<input name="poweredLogo" value="${esc(editableLogoPath(sponsors.poweredBy?.logo || ""))}" placeholder="./assets/logo.png or https://..."></label>
        <button class="button primary full">Save Main Sponsors</button>
      </form>
    </div>
    <div class="card">
      <h2>Add / Edit Sponsor</h2>
      <form class="form-grid" data-form="sponsor">
        <input type="hidden" name="id">
        <label>Name<input name="name" required></label>
        <label>Sponsoring for<input name="note" placeholder="Orange Cap, Match Balls, Awards, Refreshments"></label>
        <label>Logo size (%)<input name="logoSize" type="number" min="50" max="180" step="5" value="100"></label>
        <label>Upload sponsor logo<input name="logoFile" type="file" accept="image/*"></label>
        <label class="full">Or logo URL/path<input name="logo" placeholder="./assets/sponsor.png or https://..."></label>
        <button class="button primary full">Save Sponsor</button>
      </form>
    </div>
    <div class="card full">
      <h2>Sponsors</h2>
      <div class="mini-list sponsor-admin-list">${(sponsors.partners || []).map((sponsor) => `<div class="list-item"><span class="sponsor-admin-info">${sponsorLogo(sponsor)} <span>${esc(sponsor.name)} <small class="muted">${esc(sponsor.note || "Sponsor")}</small></span></span><span><button class="button small" data-action="edit-sponsor" data-id="${sponsor.id}">Edit</button> <button class="button small danger" data-action="delete-sponsor" data-id="${sponsor.id}">Remove</button></span></div>`).join("") || `<div class="empty">No supporting sponsors added yet.</div>`}</div>
    </div>
  </div>`;
}
function backupAdmin() {
  return `<div class="grid two"><div class="card"><h2>Export / Import JSON Backup</h2><div class="toolbar"><button class="button green" data-action="publish-online">Publish Current Data Online</button><button class="button" data-action="test-firebase">Test Firebase</button><button class="button primary" data-action="export-json">Export JSON</button><button class="button danger" data-action="reset-data">Reset Data</button></div><p class="muted" style="margin-top:.85rem">Build ${esc(APP_VERSION)} / Firebase status: ${esc(firebaseStatusMessage)}. Use Publish once to send your current local admin data to Firebase. After that, every admin save publishes automatically.</p><form class="grid" data-form="import-json" style="margin-top:1rem"><label>Paste JSON backup<textarea name="json"></textarea></label><button class="button green">Import Backup</button></form></div><div class="card"><h2>Current Backup</h2><textarea readonly style="min-height:360px">${esc(JSON.stringify(data, null, 2))}</textarea></div></div>`;
}

function scorecardInningsTabs(match, activeView) {
  const first = firstInningsInfo(match);
  if (!first) return "";
  const previousLabel = match.status === "completed" ? `${teamName(first.teamId)} innings` : "Previous Innings";
  const currentLabel = match.status === "completed" ? `${teamName(match.battingTeamId)} innings` : "Current Innings";
  return `<div class="scorecard-tabs" role="tablist" aria-label="Innings scorecard views">
    <button class="scorecard-tab ${activeView === "previous" ? "active" : ""}" data-action="open-scorecard-innings" data-id="${match.id}" data-innings-view="previous" role="tab" aria-selected="${activeView === "previous"}">${esc(previousLabel)}</button>
    <button class="scorecard-tab ${activeView === "current" ? "active" : ""}" data-action="open-scorecard-innings" data-id="${match.id}" data-innings-view="current" role="tab" aria-selected="${activeView === "current"}">${esc(currentLabel)}</button>
  </div>`;
}

function resultScoreSummary(match) {
  return `<div class="result-detail-summary">
    <div class="result-detail-scores">
    ${[match.teamAId, match.teamBId].map((teamId) => {
      const score = scoreOfTeam(match, teamId);
      const winnerClass = match.winnerId === teamId ? " winner" : "";
      return `<div class="result-detail-team${winnerClass}">
        <div class="team-strip">${teamBadge(teamId)}<div><strong>${esc(teamName(teamId))}</strong><p class="muted">${match.winnerId === teamId ? "Winner" : "Final score"}</p></div></div>
        <div class="result-detail-score">${score.runs}/${score.wickets}<span>${oversText(score.balls)}</span></div>
      </div>`;
    }).join("")}
    </div>
    <div class="result-detail-awards">
      <div><span>Most Valuable Player:</span><strong>${esc(playerName(match.matchMvpId))}</strong></div>
      <div><span>Player of the Match:</span><strong>${esc(playerName(match.playerOfMatchId))}</strong></div>
    </div>
  </div>`;
}

function scorecardDetailView(match, activeView) {
  const first = firstInningsInfo(match);
  if (activeView === "previous" && first) {
    const previousBowlingTeamId = opponentTeamId(match, first.teamId);
    return `<div class="previous-innings-view">
      <div class="grid two player-detail-grid" style="margin-top:1rem">
        <div class="card previous-innings-card">
          <div class="section-head compact">
            <div>
              <span class="eyebrow">${esc(teamName(first.teamId))}</span>
              <h3 class="panel-title">1st Innings Batting</h3>
            </div>
            <span class="pill">${esc(teamName(first.teamId))}</span>
          </div>
          <div class="player-summary-list">${batsmenSummaryForTeam(match, first.teamId) || `<p class="muted">No batting details recorded for the previous innings yet.</p>`}</div>
        </div>
        <div class="card previous-innings-card">
          <div class="section-head compact">
            <div>
              <span class="eyebrow">${esc(teamName(previousBowlingTeamId))}</span>
              <h3 class="panel-title">1st Innings Bowling</h3>
            </div>
            <span class="pill">${esc(teamName(previousBowlingTeamId))}</span>
          </div>
          <div class="player-summary-list">${bowlersSummaryForTeam(match, previousBowlingTeamId) || `<p class="muted">No bowling details recorded for the previous innings yet.</p>`}</div>
          ${bowlingClaimScorecardPanel(match, previousBowlingTeamId)}
        </div>
      </div>
      <div class="card" style="margin-top:1rem">
        <h3 class="panel-title">${match.status === "completed" ? "1st Innings Extras" : "Previous Innings Extras"}</h3>
        <div class="player-detail-line"><span>${esc(teamName(first.teamId))}</span><strong class="orange">${extrasTotalForTeam(match, first.teamId)} runs</strong></div>
      </div>
    </div>`;
  }
  const battingTitle = match.status === "completed" ? "2nd Innings Batting" : "Batsmen";
  const bowlingTitle = match.status === "completed" ? "2nd Innings Bowling" : "Bowlers";
  return `<div class="grid two player-detail-grid" style="margin-top:1rem">
      <div class="card"><h3 class="panel-title">${battingTitle}</h3><div class="player-summary-list">${batsmenSummary(match)}</div></div>
      <div class="card"><h3 class="panel-title">${bowlingTitle}</h3><div class="player-summary-list">${bowlersSummary(match)}</div>${bowlingClaimScorecardPanel(match, match.bowlingTeamId)}</div>
    </div>
    <div class="card" style="margin-top:1rem"><h3 class="panel-title">Extras</h3><div class="player-detail-line"><span>${esc(teamName(match.battingTeamId))}</span><strong class="orange">${extrasTotalForTeam(match, match.battingTeamId)} runs</strong></div></div>`;
}

function livePreviousInningsSection(match, activeView) {
  const first = firstInningsInfo(match);
  if (match.status !== "live" || activeView !== "current" || !first) return "";
  return `<section class="live-previous-section">
    <div class="section-head compact">
      <div>
        <span class="eyebrow">Previous Innings</span>
        <h3 class="panel-title">${esc(teamName(first.teamId))} ${first.score.runs}/${first.score.wickets}</h3>
      </div>
      <span class="pill">${oversText(first.score.balls)}</span>
    </div>
    ${scorecardDetailView(match, "previous")}
  </section>`;
}

function openScorecard(matchId, activeView = "") {
  const match = byId(data.matches, matchId);
  if (!match) return;
  const first = firstInningsInfo(match);
  const initialView = activeView || (match.status === "completed" && first ? "previous" : "current");
  const view = initialView === "previous" && first ? "previous" : "current";
  const score = scoreOf(match);
  const target = targetInfo(match);
  const openingPanel = (teamId) => match.status === "live" ? openingBatsmenPanel(match, teamId) : openingSetupPanel(match, teamId);
  const setupHtml = view === "previous" && first
    ? `<div class="grid two" style="margin-top:1rem">
        ${openingPanel(first.teamId)}
        ${selectedBowlersPanel(match, opponentTeamId(match, first.teamId))}
      </div>`
    : `<div class="grid two" style="margin-top:1rem">
        ${openingPanel(match.battingTeamId)}
        ${selectedBowlersPanel(match, match.bowlingTeamId)}
      </div>`;
  modalBody.innerHTML = `<h2>${esc(matchTitle(match))}</h2>
    ${match.status === "completed" ? resultScoreSummary(match) : liveScoreCard(match, true)}
    ${scorecardInningsTabs(match, view)}
    ${setupHtml}
    ${scorecardDetailView(match, view)}
    ${livePreviousInningsSection(match, view)}
    <div class="card" style="margin-top:1rem"><h3>Match Summary</h3><p class="muted">Score: ${esc(finalScoreText(match))}${target ? ` / Target ${target.target} / Need ${target.required} to win` : ""}</p><p class="muted">Started: ${esc(matchTimeText(match.startAt))}. Completed: ${esc(matchTimeText(match.completedAt))}.</p><p class="muted">Winner: ${esc(teamName(match.winnerId))}. MVP: ${esc(playerName(match.matchMvpId))}. POTM: ${esc(playerName(match.playerOfMatchId))}.</p>${match.status === "live" ? `<p class="muted">* not out</p>` : ""}</div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openPlayerDetail(matchId, playerId) {
  const match = byId(data.matches, matchId);
  const player = byId(data.players, playerId);
  if (!match || !player) return;
  const batting = match.batting[playerId] || { runs: 0, balls: 0, out: false, wicketBy: "" };
  const bowling = match.bowling[playerId] || { runs: 0, balls: 0, wickets: 0 };
  const bowlingFigures = derivedBowlingFigures(match, playerId);
  const battingEvents = batting.events || [];
  const bowlingEvents = bowling.events || [];
  const strikeRate = batting.balls ? ((batting.runs / batting.balls) * 100).toFixed(1) : "0.0";
  const economy = bowlingFigures.balls ? bowlingFigures.economy.toFixed(2) : "0.00";
  const bowlingDay = bowlersFor(match, player.teamId).find((b) => b.playerId === playerId)?.day || "";
  const roles = [
    openersFor(match, player.teamId).includes(playerId) ? "Opening batsman" : "",
    bowlingDay ? `Selected bowler: ${shortDay(bowlingDay)}` : "",
    match.status === "completed" && imposterForTeam(match, opponentTeamId(match, player.teamId)) === playerId ? "Secret imposter" : "",
  ].filter(Boolean);

  modalBody.innerHTML = `<div class="section-head">
      <div>
        <span class="eyebrow">Player Details</span>
        <h2>${esc(matchDisplayPlayerName(match, player))}</h2>
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
        <div class="player-detail-line"><span>Status</span><strong>${batting.out ? "Out" : `Not out${isPlayerNotOutInLiveMatch(match, playerId) ? " *" : ""}`}</strong></div>
        <div class="player-detail-line"><span>Wicket by</span><strong>${batting.out && batting.wicketBy ? esc(matchPlayerName(match, batting.wicketBy)) : "-"}</strong></div>
        <p class="muted" style="margin-bottom:0">${batting.out ? "Future batting scoring is counted at 50%." : `${isPlayerNotOutInLiveMatch(match, playerId) ? "* not out" : "Not out"}`}</p>
      </div>
      <div class="card">
        <h3 class="panel-title">Bowling Impact</h3>
        <div class="player-detail-line"><span>Runs given</span><strong>${bowlingFigures.runs || 0}</strong></div>
        <div class="player-detail-line"><span>Balls bowled</span><strong>${bowlingFigures.balls || 0}</strong></div>
        <div class="player-detail-line"><span>Wickets</span><strong class="purple">${bowlingFigures.wickets || 0}</strong></div>
        <div class="player-detail-line"><span>Economy</span><strong>${economy}</strong></div>
        <div class="player-detail-line"><span>Bowling day</span><strong>${esc(bowlingDay ? shortDay(bowlingDay) : "-")}</strong></div>
        <p class="muted" style="margin-bottom:0">Runs and balls come from opponent batting activity on this bowler's day. Extras are excluded.</p>
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
  const inningsBreakdown = playerInningsBreakdown(playerId, matches);

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
      const figures = derivedBowlingFigures(match, playerId);
      matchLines.push(`<div class="event-row"><div><strong>${esc(matchTitle(match))}</strong><span class="muted">Week ${match.week}${batting?.out ? ` / out${batting.wicketBy ? ` by ${playerName(batting.wicketBy)}` : ""}` : ""}${figures.day ? ` / bowling ${shortDay(figures.day)}` : ""}</span></div><div class="event-score">${runs} R / ${balls} B / ${figures.wickets} W</div></div>`);
    }
  });

  const battingRows = Object.values(battingCounts).filter((row) => row.qty || row.runs || row.balls);
  const bowlingRows = Object.values(bowlingCounts).filter((row) => row.count || row.wickets || row.runs);

  modalBody.innerHTML = `<div class="section-head">
      <div>
        <span class="eyebrow">Member Stats</span>
        <h2>${esc(displayPlayerName(player))}</h2>
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
    </div>
    <div class="grid two innings-detail-grid" style="margin-top:1rem">
      <div class="card">
        <h3 class="panel-title">Batting by Innings</h3>
        <div class="event-list">
          ${inningsBreakdown.batting.length ? inningsBreakdown.batting.map((row) => `<div class="event-row innings-event-row"><div><strong>${esc(matchTitle(row.match))}</strong><span class="muted">Week ${row.match.week} / ${esc(row.innings)} / ${esc(row.status)}</span></div><div class="event-score">${row.runs} R / ${row.balls} B <small>SR ${row.strikeRate}</small></div></div>`).join("") : `<p class="muted">No batting innings recorded for this scope.</p>`}
        </div>
      </div>
      <div class="card">
        <h3 class="panel-title">Bowling by Innings</h3>
        <div class="event-list">
          ${inningsBreakdown.bowling.length ? inningsBreakdown.bowling.map((row) => `<div class="event-row innings-event-row"><div><strong>${esc(matchTitle(row.match))}</strong><span class="muted">Week ${row.match.week} / ${esc(row.innings)} / ${esc(row.day)}</span></div><div class="event-score">${row.runs} R / ${row.balls} B / ${row.wickets} W <small>Econ ${row.economy}</small></div></div>`).join("") : `<p class="muted">No bowling innings recorded for this scope.</p>`}
        </div>
      </div>
    </div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openAwardPlayerDetail(playerId, award = "award") {
  const player = byId(data.players, playerId);
  if (!player) return;
  const matches = data.matches;
  const aggregate = playerAggregatesForMatches(matches).find((row) => row.player.id === playerId);
  const breakdown = playerInningsBreakdown(playerId, matches);
  const config = {
    orange: {
      title: "Orange Cap",
      metric: "Runs scored",
      value: aggregate?.runs || 0,
      mode: "batting",
      note: "Only batting innings are shown for this award.",
    },
    strike: {
      title: "Best Strike Rate",
      metric: "Strike rate",
      value: aggregate?.balls ? aggregate.strikeRate.toFixed(1) : "0.0",
      mode: "batting",
      note: "Only batting innings are shown for this award.",
    },
    purple: {
      title: "Purple Cap",
      metric: "Wickets",
      value: aggregate?.wickets || 0,
      mode: "bowling",
      note: "Only bowling innings are shown for this award.",
    },
    economy: {
      title: "Best Economy",
      metric: "Economy",
      value: aggregate?.bowlBalls ? aggregate.economy.toFixed(2) : "-",
      mode: "bowling",
      note: "Only bowling innings are shown for this award.",
    },
    mvp: {
      title: "Most Valuable Player",
      metric: "MVP score",
      value: aggregate?.mvp || 0,
      mode: "all",
      note: "Compact all-round view for runs, wickets, and runs conceded.",
    },
  }[award] || { title: "Award Detail", metric: "Value", value: "-", mode: "all", note: "Compact award performance view." };
  const battingHtml = breakdown.batting.length ? breakdown.batting.map((row) => `<div class="event-row innings-event-row"><div><strong>${esc(matchTitle(row.match))}</strong><span class="muted">Week ${row.match.week} / ${esc(row.innings)} / ${esc(row.status)}</span></div><div class="event-score">${row.runs} R / ${row.balls} B <small>SR ${row.strikeRate}</small></div></div>`).join("") : `<p class="muted">No batting innings recorded.</p>`;
  const bowlingHtml = breakdown.bowling.length ? breakdown.bowling.map((row) => `<div class="event-row innings-event-row"><div><strong>${esc(matchTitle(row.match))}</strong><span class="muted">Week ${row.match.week} / ${esc(row.innings)} / ${esc(row.day)}</span></div><div class="event-score">${row.runs} R / ${row.balls} B / ${row.wickets} W <small>Econ ${row.economy}</small></div></div>`).join("") : `<p class="muted">No bowling innings recorded.</p>`;
  const overallHtml = `<div class="award-overall">
    <h3 class="panel-title">Overall Performance</h3>
    <div class="award-overall-grid">
      <div><span>Runs scored</span><strong class="orange">${aggregate?.runs || 0}</strong></div>
      <div><span>Balls faced</span><strong>${aggregate?.balls || 0}</strong></div>
      <div><span>Strike rate</span><strong>${aggregate?.balls ? aggregate.strikeRate.toFixed(1) : "0.0"}</strong></div>
      <div><span>Wickets</span><strong class="purple">${aggregate?.wickets || 0}</strong></div>
      <div><span>Runs conceded</span><strong>${aggregate?.bowlRuns || 0}</strong></div>
      <div><span>Economy</span><strong>${aggregate?.bowlBalls ? aggregate.economy.toFixed(2) : "-"}</strong></div>
    </div>
  </div>`;
  const sections = config.mode === "batting"
    ? `<div class="card"><h3 class="panel-title">Batting Innings</h3><div class="event-list">${battingHtml}</div></div>`
    : config.mode === "bowling"
      ? `<div class="card"><h3 class="panel-title">Bowling Innings</h3><div class="event-list">${bowlingHtml}</div></div>`
      : `<div class="grid two"><div class="card"><h3 class="panel-title">Batting Innings</h3><div class="event-list">${battingHtml}</div></div><div class="card"><h3 class="panel-title">Bowling Innings</h3><div class="event-list">${bowlingHtml}</div></div></div>`;

  modalBody.innerHTML = `<div class="section-head compact">
      <div>
        <span class="eyebrow">${esc(config.title)}</span>
        <h2>${esc(displayPlayerName(player))}</h2>
        <p class="muted">${esc(teamName(player.teamId))} / ${esc(config.note)}</p>
      </div>
      <div class="award-detail-value"><b>${esc(config.value)}</b><small>${esc(config.metric)}</small></div>
    </div>
    ${sections}
    ${overallHtml}`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function liveTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function addAutoCommentary(match, text) {
  match.commentary ||= [];
  match.commentary.unshift({ time: liveTime(), text, auto: true });
}
function sameList(a = [], b = []) {
  return JSON.stringify(a || []) === JSON.stringify(b || []);
}
function selectedBowlerText(bowlers = []) {
  return bowlers.map((bowler) => `${playerName(bowler.playerId)}${bowler.day ? ` for ${shortDay(bowler.day)}` : ""}`).join(", ");
}
function setupCommentaryNotes(match, previousSetups = {}, matchTeams = []) {
  const notes = [];
  matchTeams.forEach((teamId) => {
    const previousSetup = previousSetups?.[teamId] || {};
    const setup = match.teamSetups?.[teamId] || {};
    const previousOpeners = previousSetup.openers || [];
    const currentOpeners = setup.openers || [];
    const previousBowlers = previousSetup.bowlers || [];
    const currentBowlers = setup.bowlers || [];
    if (!sameList(previousOpeners, currentOpeners) && currentOpeners.length) {
      notes.push(`${teamName(teamId)} opening pair confirmed: ${currentOpeners.map(playerName).join(" and ")}.`);
    }
    if (JSON.stringify(previousBowlers) !== JSON.stringify(currentBowlers) && currentBowlers.length) {
      notes.push(`${teamName(teamId)} bowling plan set: ${selectedBowlerText(currentBowlers)}.`);
    }
    if ((previousSetup.battingPowerplayDay || "") !== (setup.battingPowerplayDay || "") && setup.battingPowerplayDay) {
      notes.push(`${teamName(teamId)} batting powerplay day set for ${setup.battingPowerplayDay}.`);
    }
    if ((previousSetup.secretImposterId || "") !== (setup.secretImposterId || "") && setup.secretImposterId) {
      notes.push(`Secret imposter impact is locked for ${teamName(teamId)} and will be revealed after the match.`);
    }
  });
  return notes;
}

async function handleForm(event) {
  const form = event.target.closest("form");
  if (!form) return;
  event.preventDefault();
  const fd = new FormData(form);
  const type = form.dataset.form;
  if (type === "login") {
    if (adminHash(fd.get("password")) === ADMIN_PASSWORD_HASH) {
      unlockAdminSession();
      toast("Admin unlocked");
      render();
    } else toast("Wrong password");
    return;
  }
  if (!requireAdmin()) return;
  rememberAdminLiveExpanded(form.closest(".card")?.id);
  if (type === "match-state") {
    const match = byId(data.matches, fd.get("matchId"));
    const previous = {
      status: match.status,
      battingTeamId: match.battingTeamId,
      bowlingTeamId: match.bowlingTeamId,
      tossWinnerId: match.tossWinnerId,
      tossChoice: match.tossChoice || "bat",
      secretImposterId: match.secretImposterId,
      innings: Number(match.innings || 1),
      powerplay: Boolean(match.powerplay),
      battingPowerplayDay: match.battingPowerplayDay || "Wednesday",
      teamSetups: clone(match.teamSetups || {}),
      openers: [...openersFor(match, match.battingTeamId)],
      selectedBowlers: clone(bowlersFor(match, match.bowlingTeamId)),
      currentDay: match.currentDay || "Wednesday",
      startAt: match.startAt,
      completedAt: match.completedAt,
    };
    const matchTeams = [match.teamAId, match.teamBId].filter(Boolean);
    const battingTeamId = matchTeams.includes(fd.get("battingTeamId")) ? fd.get("battingTeamId") : match.teamAId;
    const bowlingTeamId = matchTeams.includes(fd.get("bowlingTeamId")) && fd.get("bowlingTeamId") !== battingTeamId
      ? fd.get("bowlingTeamId")
      : matchTeams.find((teamId) => teamId !== battingTeamId) || match.teamBId;
    const tossWinnerId = matchTeams.includes(fd.get("tossWinnerId")) ? fd.get("tossWinnerId") : battingTeamId;
    const battingPlayerIds = new Set(teamPlayers(battingTeamId).map((player) => player.id));
    const bowlingPlayerIds = new Set(teamPlayers(bowlingTeamId).map((player) => player.id));
    const teamSetups = {};
    matchTeams.forEach((teamId) => {
      const teamPlayerIds = new Set(teamPlayers(teamId).map((player) => player.id));
      const opponentPlayerIds = new Set(teamPlayers(opponentTeamId(match, teamId)).map((player) => player.id));
      const openers = [fd.get(`opener_${teamId}_0`), fd.get(`opener_${teamId}_1`)]
        .filter((playerId, index, arr) => playerId && teamPlayerIds.has(playerId) && arr.indexOf(playerId) === index)
        .slice(0, 2);
      const bowlers = [0,1,2].map((i) => ({ playerId: fd.get(`bowler_${teamId}_${i}`), day: fd.get(`bowlerDay_${teamId}_${i}`) || ["Wednesday","Thursday","Friday"][i] }))
        .filter((bowler, index, arr) => bowler.playerId && teamPlayerIds.has(bowler.playerId) && arr.findIndex((item) => item.playerId === bowler.playerId) === index)
        .slice(0, 3);
      const imposterId = opponentPlayerIds.has(fd.get(`imposter_${teamId}`)) ? fd.get(`imposter_${teamId}`) : "";
      teamSetups[teamId] = { openers, bowlers, battingPowerplayDay: fd.get(`ppDay_${teamId}`) || (teamId === match.teamAId ? "Wednesday" : "Saturday"), secretImposterId: imposterId };
    });
    const openers = teamSetups[battingTeamId]?.openers || [];
    const selectedBowlers = teamSetups[bowlingTeamId]?.bowlers || [];
    const secretImpostersByTeam = Object.fromEntries(matchTeams.map((teamId) => [teamId, teamSetups[teamId]?.secretImposterId || ""]));
    const secretImposterId = secretImpostersByTeam[bowlingTeamId] || "";
    adminLiveMatchId = match.id;
    sessionStorage.setItem("dpl2-admin-live-match", adminLiveMatchId);
    Object.assign(match, {
      status: fd.get("status"), battingTeamId, bowlingTeamId,
      tossWinnerId, tossChoice: fd.get("tossChoice") === "bowl" ? "bowl" : "bat", secretImposterId, secretImpostersByTeam,
      startAt: fd.get("startAt"), completedAt: fd.get("completedAt"),
      firstInningsRuns: fd.get("firstInningsRuns"),
      innings: Number(fd.get("innings") || 1), currentDay: fd.get("currentDay") || "Wednesday", powerplay: fd.get("powerplay") === "true",
      battingPowerplayDay: teamSetups[battingTeamId]?.battingPowerplayDay || "Wednesday",
      openers,
      selectedBowlers,
      teamSetups,
    });
    const notes = [];
    if (previous.status !== match.status) notes.push(`Match status update: ${matchTitle(match)} is now ${match.status}.`);
    if (previous.startAt !== match.startAt && match.startAt) notes.push(`Match start time locked for ${matchTitle(match)}.`);
    if ((previous.tossWinnerId !== match.tossWinnerId || previous.tossChoice !== match.tossChoice) && match.tossWinnerId) notes.push(`Toss update: ${tossText(match)}.`);
    if (previous.battingTeamId !== match.battingTeamId || previous.bowlingTeamId !== match.bowlingTeamId) {
      notes.push(`Innings setup: ${teamName(match.battingTeamId)} will bat, ${teamName(match.bowlingTeamId)} will bowl.`);
    }
    if (previous.innings !== Number(match.innings)) notes.push(`Innings update: innings ${match.innings} is now live.`);
    if (previous.currentDay !== match.currentDay) notes.push(`Match day update: Week ${match.week} is now on ${match.currentDay}.`);
    if (previous.powerplay !== Boolean(match.powerplay)) notes.push(`Powerplay ${match.powerplay ? "starts now" : "is switched off"}.`);
    notes.push(...setupCommentaryNotes(match, previous.teamSetups, matchTeams));
    if (previous.completedAt !== match.completedAt && match.completedAt) notes.push(`Completion time updated for ${matchTitle(match)}.`);
    notes.forEach((note) => addAutoCommentary(match, note));
    saveData(); toast("Match state saved"); render();
  }
  if (type === "batting-score") {
    const match = byId(data.matches, fd.get("matchId"));
    if (isCurrentTeamAllOut(match)) return toast("Team is all out. No more scoring allowed.");
    const playerId = fd.get("playerId");
    if (!playerId) return toast("Select a batter");
    if (!teamPlayers(match.battingTeamId).some((player) => player.id === playerId)) return toast("Select a player from the batting team");
    const rule = scoringRules.batting.find((r) => r[0] === fd.get("event"));
    const qty = Number(fd.get("qty") || 1);
    const activityDay = fd.get("activityDay") || setupForTeam(match, match.battingTeamId).battingPowerplayDay || "Wednesday";
    const editEventId = fd.get("editEventId");
    if (editEventId) removeBattingAdminEvent(match, editEventId);
    rememberLiveForm(match.id, "batting", { activityDay, playerId, event: fd.get("event"), qty, editEventId: "" });
    const row = ensureBattingRow(match, playerId);
    const battingSetup = setupForTeam(match, match.battingTeamId);
    const powerplayMultiplier = match.powerplay && activityDay === (battingSetup.battingPowerplayDay || match.battingPowerplayDay || "Wednesday") && openersFor(match, match.battingTeamId).includes(playerId) ? 2 : 1;
    const multiplier = (row.out ? 0.5 : 1) * powerplayMultiplier;
    const addedRuns = Math.round(rule[2] * qty * multiplier * 10) / 10;
    const addedBalls = rule[3] * qty * powerplayMultiplier;
    const eventId = editEventId || id("bat");
    row.runs += addedRuns;
    row.balls += addedBalls;
    row.events.unshift({
      id: eventId,
      type: "batting",
      key: rule[0],
      label: rule[1],
      qty,
      baseRuns: rule[2],
      baseBalls: rule[3],
      activityDay,
      multiplier,
      runs: addedRuns,
      balls: addedBalls,
      summary: `+${addedRuns} R / ${addedBalls} B`,
      detail: `${activityDay} / ${qty} x ${rule[2]} run, ${rule[3]} ball rule${row.out ? " / half score after wicket" : ""}${powerplayMultiplier === 2 ? " / opener batting powerplay double runs and balls" : ""}`,
      at: new Date().toISOString(),
    });
    addAutoCommentary(match, `${playerName(playerId)} ${editEventId ? "updates" : "adds"} ${addedRuns} runs from ${addedBalls} balls through ${rule[1]} on ${activityDay}${powerplayMultiplier === 2 ? " with opener batting powerplay double runs and balls" : ""}${row.out ? " after wicket, so half-score applies" : ""}.`);
    saveData(); render();
  }
  if (type === "batting-bonus") {
    const match = byId(data.matches, fd.get("matchId"));
    const matchTeams = [match.teamAId, match.teamBId].filter(Boolean);
    const matchPlayerIds = new Set(matchTeams.flatMap((teamId) => teamPlayers(teamId).map((player) => player.id)));
    const playerId = fd.get("playerId");
    if (!playerId || !matchPlayerIds.has(playerId)) return toast("Select a player from this match");
    const runs = Number(fd.get("runs") || 0);
    const balls = Number(fd.get("balls") || 0);
    const activityDay = fd.get("activityDay") || match.currentDay || "Wednesday";
    const editEventId = fd.get("editEventId");
    if (editEventId) removeBattingAdminEvent(match, editEventId);
    rememberLiveForm(match.id, "battingBonus", { activityDay, playerId, editEventId: "" });
    const reason = fd.get("reason") || "Manual batting bonus";
    const row = ensureBattingRow(match, playerId);
    const eventId = editEventId || id("batbonus");
    row.runs += runs;
    row.balls += balls;
    row.events.unshift({
      id: eventId,
      type: "batting",
      key: "manualBonus",
      label: "Manual batting bonus",
      qty: 1,
      baseRuns: runs,
      baseBalls: balls,
      activityDay,
      multiplier: 1,
      runs,
      balls,
      summary: `+${runs} R / ${balls} B`,
      detail: `${activityDay} / ${reason} / manual bonus ignores all-out and half-score after wicket`,
      reason,
      at: new Date().toISOString(),
    });
    addAutoCommentary(match, `${playerName(playerId)} ${editEventId ? "updates" : "receives"} a manual batting bonus of ${runs} runs${balls ? ` from ${balls} balls` : ""} for ${teamName(byId(data.players, playerId)?.teamId)} on ${activityDay}: ${reason}.`);
    saveData(); render();
  }
  if (type === "bowling-score") {
    const match = byId(data.matches, fd.get("matchId"));
    const targetId = fd.get("targetId");
    const bowlingSetup = bowlersFor(match, match.bowlingTeamId);
    const rule = rules().bowling.find((r) => r[0] === fd.get("event"));
    const requestedBowlerId = fd.get("playerId");
    const bowlingDay = fd.get("bowlingDay") || bowlingSetup.find((bowler) => bowler.playerId === requestedBowlerId)?.day || "";
    const owner = teamOwner(match.bowlingTeamId);
    const bowlerId = rule?.[0] === "absent" && bowlingDay === "Tuesday" && owner ? owner.id : requestedBowlerId;
    if (!bowlerId) return toast(rule?.[0] === "absent" && bowlingDay === "Tuesday" ? "Assign a team owner first" : "Select a bowler");
    const selectedBowlerIds = new Set(bowlingAssignmentsForTeam(match, match.bowlingTeamId).map((bowler) => bowler.playerId).filter(Boolean));
    const validBowler = teamPlayers(match.bowlingTeamId).some((player) => player.id === bowlerId) && (!selectedBowlerIds.size || selectedBowlerIds.has(bowlerId));
    if (!validBowler) return toast("Select a bowler from the bowling team");
    if (targetId && !teamPlayers(match.battingTeamId).some((player) => player.id === targetId)) return toast("Target batter must be from batting team");
    const editEventId = fd.get("editEventId");
    if (editEventId) removeBowlingAdminEvent(match, editEventId);
    rememberLiveForm(match.id, "bowling", { bowlingDay, playerId: bowlerId, targetId, event: fd.get("event"), editEventId: "" });
    const batterPenalty = battingPenaltyForBowlingRule(rule[0], rule[3]);
    if (batterPenalty && !targetId) return toast("Select target batter for Absent/Late penalty");
    if (targetId && ensureBattingRow(match, targetId).out) return toast("This member is already out in this match");
    const row = ensureBowlingRow(match, bowlerId);
    const eventId = editEventId || id("bowl");
    const appliedWickets = Number(rule[2] || 0) > 0 ? 1 : 0;
    row.wickets += appliedWickets;
    row.runs += rule[3];
    row.events.unshift({
      id: eventId,
      type: "bowling",
      key: rule[0],
      label: rule[1],
      wickets: appliedWickets,
      claimWickets: rule[2],
      runs: rule[3],
      balls: 0,
      targetId,
      bowlingDay,
      summary: `+${appliedWickets} W / ${rule[3]} R impact`,
      detail: `${bowlingDay ? `${bowlingDay} / ` : ""}${targetId ? `Target batter: ${playerName(targetId)}` : "No specific target batter selected"} / criteria allows ${rule[2]} total claim${Number(rule[2]) === 1 ? "" : "s"}, applied 1 wicket this time`,
      at: new Date().toISOString(),
    });
    if (rule[0] === "absent" && bowlingDay === "Tuesday" && owner?.id === bowlerId) {
      row.events[0].detail += " / Tuesday absent wicket credited to team owner";
    }
    if (targetId) {
      const targetRow = ensureBattingRow(match, targetId);
      targetRow.out = true;
      targetRow.wicketBy = bowlerId;
      if (batterPenalty) {
        targetRow.runs += batterPenalty.runs;
        targetRow.balls += batterPenalty.balls;
      }
      targetRow.events.unshift({
        id: id("wicket"),
        sourceEventId: eventId,
        type: "wicket",
        label: "Wicket lost",
        summary: `Out by ${playerName(bowlerId)}`,
        detail: `${rule[1]} / future scoring becomes 50%`,
        at: new Date().toISOString(),
      });
      if (batterPenalty) {
        targetRow.events.unshift({
          id: id("batpenalty"),
          sourceEventId: eventId,
          type: "batting",
          key: rule[0],
          label: `${rule[1]} penalty`,
          qty: 1,
          baseRuns: batterPenalty.runs,
          baseBalls: batterPenalty.balls,
          activityDay: bowlingDay,
          multiplier: 1,
          runs: batterPenalty.runs,
          balls: batterPenalty.balls,
          summary: `${batterPenalty.runs} R / ${batterPenalty.balls} B`,
          detail: `${bowlingDay ? `${bowlingDay} / ` : ""}${rule[1]} penalty applied by ${playerName(bowlerId)}`,
          at: new Date().toISOString(),
        });
      }
    }
    addAutoCommentary(match, `${playerName(bowlerId)} ${editEventId ? "updates" : "applies"} ${rule[1]}${bowlingDay ? ` on ${bowlingDay}` : ""}${targetId ? ` and targets ${playerName(targetId)}` : ""}: ${appliedWickets} wicket applied, ${rule[3]} run impact.`);
    saveData(); render();
  }
  if (type === "bowling-tracker") {
    const match = byId(data.matches, fd.get("matchId"));
    const day = fd.get("day") || match.currentDay || "Wednesday";
    const playerId = fd.get("playerId");
    if (!playerId || !teamPlayers(match.bowlingTeamId).some((player) => player.id === playerId)) return toast("Select a member from the bowling team");
    const row = bowlingTrackingRecord(match, match.bowlingTeamId, day, playerId);
    row.oneToOnes = Number(fd.get("oneToOnes") || 0);
    row.referrals = Number(fd.get("referrals") || 0);
    row.paidVisitors = Number(fd.get("paidVisitors") || 0);
    row.tyfcbLakhs = Number(fd.get("tyfcbLakhs") || 0);
    rememberLiveForm(match.id, "bowlingTracker", { day, playerId });
    const claim = bowlingClaimSummary(match, match.bowlingTeamId);
    saveData(); toast(`Tracking saved. Claimable wickets shown: ${claim.totalClaimWickets}`); render();
  }
  if (type === "bowling-bonus") {
    const match = byId(data.matches, fd.get("matchId"));
    const matchTeams = [match.teamAId, match.teamBId].filter(Boolean);
    const matchPlayerIds = new Set(matchTeams.flatMap((teamId) => teamPlayers(teamId).map((player) => player.id)));
    const bowlerId = fd.get("playerId");
    if (!bowlerId || !matchPlayerIds.has(bowlerId)) return toast("Select a player from this match");
    const wickets = Number(fd.get("wickets") || 0);
    const runs = Number(fd.get("runs") || 0);
    const bowlingDay = fd.get("bowlingDay") || match.currentDay || bowlerAssignment(match, bowlerId)?.day || "";
    const editEventId = fd.get("editEventId");
    if (editEventId) removeBowlingAdminEvent(match, editEventId);
    rememberLiveForm(match.id, "bowlingBonus", { bowlingDay, playerId: bowlerId, editEventId: "" });
    const reason = fd.get("reason") || "Manual bowling bonus";
    const row = ensureBowlingRow(match, bowlerId);
    const eventId = editEventId || id("bowlbonus");
    row.wickets += wickets;
    row.runs += runs;
    row.events.unshift({
      id: eventId,
      type: "bowling",
      key: "manualBonus",
      label: "Manual bowling bonus",
      wickets,
      runs,
      balls: 0,
      bowlingDay,
      summary: `+${wickets} W / ${runs} R impact`,
      detail: `${bowlingDay ? `${bowlingDay} / ` : ""}${reason}`,
      reason,
      at: new Date().toISOString(),
    });
    addAutoCommentary(match, `${playerName(bowlerId)} ${editEventId ? "updates" : "receives"} manual bowling impact: ${wickets} wickets, ${runs} run impact. ${reason}.`);
    saveData(); render();
  }
  if (type === "complete-match") {
    const match = byId(data.matches, fd.get("matchId"));
    const matchTeams = [match.teamAId, match.teamBId].filter(Boolean);
    const matchPlayers = new Set(matchTeams.flatMap((teamId) => teamPlayers(teamId).map((player) => player.id)));
    match.winnerId = matchTeams.includes(fd.get("winnerId")) ? fd.get("winnerId") : "";
    match.matchMvpId = matchPlayers.has(fd.get("matchMvpId")) ? fd.get("matchMvpId") : "";
    match.playerOfMatchId = matchPlayers.has(fd.get("playerOfMatchId")) ? fd.get("playerOfMatchId") : "";
    match.startAt = fd.get("startAt") || match.startAt;
    match.completedAt = fd.get("completedAt") || match.completedAt;
    match.status = "completed";
    addAutoCommentary(match, `Match complete: ${teamName(match.winnerId)} win. MVP ${playerName(match.matchMvpId)}, POTM ${playerName(match.playerOfMatchId)}.`);
    saveData(); toast("Match completed"); render();
  }
  if (type === "commentary") {
    const match = byId(data.matches, fd.get("matchId"));
    match.commentary.unshift({ time: fd.get("time") || "Live", text: fd.get("text") || "" });
    saveData(); render();
  }
  if (type === "team") await upsertTeam(fd);
  if (type === "player") upsertPlayer(fd);
  if (type === "match") upsertMatch(fd);
  if (type === "criteria") upsertCriteria(fd);
  if (type === "sponsor-config") {
    data.sponsors ||= clone(seed.sponsors);
    data.sponsors.title = { name: fd.get("titleName"), logo: await logoInputValue(fd, "titleLogo", "titleLogoFile", data.sponsors.title?.logo || ""), note: "Title Sponsor", logoSize: logoSizeValue(fd.get("titleLogoSize")) };
    data.sponsors.poweredBy = { name: fd.get("poweredName"), logo: await logoInputValue(fd, "poweredLogo", "poweredLogoFile", data.sponsors.poweredBy?.logo || ""), note: "Powered By", logoSize: logoSizeValue(fd.get("poweredLogoSize")) };
    saveData(); toast("Main sponsors saved"); render();
  }
  if (type === "sponsor") await upsertSponsor(fd);
  if (type === "awards") {
    Object.keys(data.awards).forEach((key) => data.awards[key] = fd.get(key));
    saveData(); toast("Awards saved"); render();
  }
  if (type === "import-json") {
    try {
      const incoming = JSON.parse(fd.get("json"));
      if (!incoming.teams || !incoming.players || !incoming.matches) throw new Error("Invalid backup");
      data = normalizeData(incoming); saveData(); toast("Backup imported"); render();
    } catch (error) { toast("Invalid JSON backup"); }
  }
}
async function upsertTeam(fd) {
  const existing = byId(data.teams, fd.get("id"));
  const item = { id: fd.get("id") || id("team"), name: fd.get("name"), group: fd.get("group"), color: fd.get("color") || "#ff8a1f", logo: await logoInputValue(fd, "logo", "logoFile", existing?.logo || ""), logoSize: logoSizeValue(fd.get("logoSize")) };
  data.teams = data.teams.some((t) => t.id === item.id) ? data.teams.map((t) => t.id === item.id ? item : t) : [...data.teams, item];
  saveData(); toast("Team saved"); render();
}
function upsertPlayer(fd) {
  const item = { id: fd.get("id") || id("player"), name: fd.get("name"), teamId: fd.get("teamId"), role: fd.get("role") || "" };
  data.players = data.players.some((p) => p.id === item.id) ? data.players.map((p) => p.id === item.id ? item : p) : [...data.players, item];
  saveData(); toast("Player saved"); render();
}
function upsertMatch(fd) {
  const existing = byId(data.matches, fd.get("id"));
  const base = existing || freshMatch(id("match"), Number(fd.get("week") || 1), fd.get("teamAId"), fd.get("teamBId"));
  Object.assign(base, { week: Number(fd.get("week") || 1), status: fd.get("status"), teamAId: fd.get("teamAId"), teamBId: fd.get("teamBId"), venue: fd.get("venue"), startAt: fd.get("startAt"), completedAt: fd.get("completedAt"), firstInningsRuns: fd.get("firstInningsRuns") });
  data.matches = existing ? data.matches.map((m) => m.id === base.id ? base : m) : [...data.matches, base];
  saveData(); toast("Match saved"); render();
}
async function upsertSponsor(fd) {
  data.sponsors ||= clone(seed.sponsors);
  data.sponsors.partners ||= [];
  const existing = (data.sponsors.partners || []).find((sponsor) => sponsor.id === fd.get("id"));
  const item = { id: fd.get("id") || id("sponsor"), name: fd.get("name"), note: fd.get("note"), logo: await logoInputValue(fd, "logo", "logoFile", existing?.logo || ""), logoSize: logoSizeValue(fd.get("logoSize")) };
  data.sponsors.partners = data.sponsors.partners.some((sponsor) => sponsor.id === item.id)
    ? data.sponsors.partners.map((sponsor) => sponsor.id === item.id ? item : sponsor)
    : [...data.sponsors.partners, item];
  saveData(); toast("Sponsor saved"); render();
}
function upsertCriteria(fd) {
  data.criteria ||= clone(scoringRules);
  const type = fd.get("type");
  const key = String(fd.get("key") || "").trim();
  const originalKey = String(fd.get("originalKey") || "").trim();
  const label = String(fd.get("label") || "").trim();
  if (!type || !key || !label) return toast("Criteria needs type, key and label");
  const primary = Number(fd.get("primary") || 0);
  const secondary = type === "extras" ? undefined : Number(fd.get("secondary") || 0);
  const formattedLabel = titleCaseCriteriaLabel(label);
  const rule = type === "extras" ? [key, formattedLabel, primary] : [key, formattedLabel, primary, secondary];
  data.criteria[type] ||= [];
  const matchKey = originalKey || key;
  const exists = data.criteria[type].some((item) => item[0] === matchKey);
  data.criteria[type] = exists
    ? data.criteria[type].map((item) => item[0] === matchKey ? rule : item)
    : [...data.criteria[type], rule];
  saveData(); toast("Criteria saved"); render();
}

function handleChange(event) {
  const battingScoreForm = event.target.closest('form[data-form="batting-score"]');
  if (battingScoreForm && ["playerId", "activityDay", "event"].includes(event.target.name)) {
    if (!requireAdmin()) return;
    const matchId = battingScoreForm.matchId?.value || activeAdminMatch()?.id;
    rememberLiveForm(matchId, "batting", {
      activityDay: battingScoreForm.activityDay?.value || "",
      playerId: battingScoreForm.playerId?.value || "",
      event: battingScoreForm.event?.value || "",
    });
    if (event.target.name === "playerId") render();
    return;
  }
  const bowlingScoreForm = event.target.closest('form[data-form="bowling-score"]');
  if (bowlingScoreForm && ["playerId", "bowlingDay", "event", "targetId"].includes(event.target.name)) {
    if (!requireAdmin()) return;
    const matchId = bowlingScoreForm.matchId?.value || activeAdminMatch()?.id;
    rememberLiveForm(matchId, "bowling", {
      bowlingDay: bowlingScoreForm.bowlingDay?.value || "",
      playerId: bowlingScoreForm.playerId?.value || "",
      targetId: bowlingScoreForm.targetId?.value || "",
      event: bowlingScoreForm.event?.value || "",
      editEventId: bowlingScoreForm.editEventId?.value || "",
    });
    return;
  }
  const bowlingTrackerForm = event.target.closest('form[data-form="bowling-tracker"]');
  if (bowlingTrackerForm && ["day", "playerId"].includes(event.target.name)) {
    if (!requireAdmin()) return;
    const matchId = bowlingTrackerForm.matchId?.value || activeAdminMatch()?.id;
    rememberLiveForm(matchId, "bowlingTracker", {
      day: bowlingTrackerForm.day?.value || "",
      playerId: bowlingTrackerForm.playerId?.value || "",
    });
    render();
    return;
  }
  const battingBonusForm = event.target.closest('form[data-form="batting-bonus"]');
  if (battingBonusForm && ["activityDay", "playerId"].includes(event.target.name)) {
    if (!requireAdmin()) return;
    const matchId = battingBonusForm.matchId?.value || activeAdminMatch()?.id;
    rememberLiveForm(matchId, "battingBonus", {
      activityDay: battingBonusForm.activityDay?.value || "",
      playerId: battingBonusForm.playerId?.value || "",
    });
    return;
  }
  const bowlingBonusForm = event.target.closest('form[data-form="bowling-bonus"]');
  if (bowlingBonusForm && ["bowlingDay", "playerId"].includes(event.target.name)) {
    if (!requireAdmin()) return;
    const matchId = bowlingBonusForm.matchId?.value || activeAdminMatch()?.id;
    rememberLiveForm(matchId, "bowlingBonus", {
      bowlingDay: bowlingBonusForm.bowlingDay?.value || "",
      playerId: bowlingBonusForm.playerId?.value || "",
    });
    return;
  }
  const playerTeamSelect = event.target.closest('[data-action="select-admin-player-team"]');
  if (playerTeamSelect) {
    if (!requireAdmin()) return;
    adminPlayerTeamFilter = playerTeamSelect.value;
    sessionStorage.setItem("dpl2-admin-player-team", adminPlayerTeamFilter);
    render();
    return;
  }
  const statsSelect = event.target.closest('[data-action="select-stats-scope"]');
  if (statsSelect) {
    statsScope = statsSelect.value;
    sessionStorage.setItem("dpl2-stats-scope", statsScope);
    render();
    return;
  }
  const wicketSelect = event.target.closest('[data-action="select-wicket-bowler"]');
  if (wicketSelect) {
    if (!requireAdmin()) return;
    const match = byId(data.matches, wicketSelect.dataset.match);
    const playerId = wicketSelect.dataset.player;
    const row = ensureBattingRow(match, playerId);
    const wasOut = Boolean(row.out);
    row.wicketBy = wicketSelect.value;
    if (wicketSelect.value) {
      if (wasOut) {
        saveData();
        render();
        return;
      }
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
  if (!requireAdmin()) return;
  adminLiveMatchId = select.value;
  sessionStorage.setItem("dpl2-admin-live-match", adminLiveMatchId);
  render();
}

function handleInput(event) {
  const search = event.target.closest('[data-action="search-stats-player"]');
  if (!search) return;
  const scrollY = window.scrollY;
  const cursor = search.selectionStart;
  statsSearch = search.value;
  sessionStorage.setItem("dpl2-stats-search", statsSearch);
  render();
  requestAnimationFrame(() => {
    const nextSearch = document.querySelector('[data-action="search-stats-player"]');
    if (nextSearch) {
      nextSearch.focus();
      nextSearch.setSelectionRange(cursor, cursor);
    }
    window.scrollTo(0, scrollY);
  });
}

function handleKeydown(event) {
  if (!["Enter", " "].includes(event.key)) return;
  const el = event.target.closest('[data-action="open-scorecard"], [data-action="open-scorecard-innings"], [data-action="open-player-detail"], [data-action="open-stats-player-detail"], [data-action="open-award-player-detail"]');
  if (!el) return;
  event.preventDefault();
  if (el.dataset.action === "open-player-detail") openPlayerDetail(el.dataset.match, el.dataset.player);
  else if (el.dataset.action === "open-stats-player-detail") openStatsPlayerDetail(el.dataset.player);
  else if (el.dataset.action === "open-award-player-detail") openAwardPlayerDetail(el.dataset.player, el.dataset.award);
  else if (el.dataset.action === "open-scorecard-innings") openScorecard(el.dataset.id, el.dataset.inningsView);
  else openScorecard(el.dataset.id);
}

function handleClick(event) {
  const adminLiveHeading = event.target.closest(".admin-live-panel .card > h2, .admin-live-panel .card > h3");
  if (adminLiveHeading && window.matchMedia("(max-width: 720px)").matches) {
    const card = adminLiveHeading.closest(".card");
    if (card) {
      card.classList.toggle("admin-live-expanded");
      rememberAdminLiveExpanded(card.id, card.classList.contains("admin-live-expanded"));
      return;
    }
  }
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
  const adminActions = new Set([
    "admin-tab", "add-extra", "toggle-out", "all-out",
    "scroll-admin-section", "toggle-admin-collapse",
    "edit-batting-event", "delete-batting-event", "edit-bowling-event", "delete-bowling-event",
    "edit-team", "edit-player", "edit-match", "edit-criteria", "edit-sponsor",
    "delete-team", "delete-player", "delete-match", "delete-criteria", "delete-sponsor",
    "reset-data", "export-json", "publish-online", "test-firebase",
  ]);
  if (adminActions.has(action) && !requireAdmin()) return;
  if (action === "open-scorecard") openScorecard(el.dataset.id);
  if (action === "open-scorecard-innings") openScorecard(el.dataset.id, el.dataset.inningsView);
  if (action === "open-player-detail") openPlayerDetail(el.dataset.match, el.dataset.player);
  if (action === "open-stats-player-detail") openStatsPlayerDetail(el.dataset.player);
  if (action === "open-award-player-detail") openAwardPlayerDetail(el.dataset.player, el.dataset.award);
  if (action === "admin-tab") { adminTab = el.dataset.tab; render(); }
  if (action === "lock-admin") { lockAdminSession(); render(); }
  if (action === "scroll-admin-section") {
    const target = document.getElementById(el.dataset.target);
    target?.classList.add("admin-live-expanded");
    rememberAdminLiveExpanded(target?.id, true);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "toggle-admin-collapse") {
    adminCollapsed[el.dataset.key] = adminCollapsed[el.dataset.key] === false;
    sessionStorage.setItem("dpl2-admin-collapsed", JSON.stringify(adminCollapsed));
    render();
  }
  if (action === "add-extra") {
    const match = byId(data.matches, el.dataset.match);
    const rule = scoringRules.extras.find((r) => r[0] === el.dataset.key);
    if (isCurrentTeamAllOut(match)) return toast("Team is all out. No more scoring allowed.");
    match.extrasByTeam ||= {};
    match.extrasByTeam[match.battingTeamId] = Number(match.extrasByTeam[match.battingTeamId] || 0) + rule[2];
    match.extras = Number(match.extras || 0) + rule[2];
    addAutoCommentary(match, `${teamName(match.battingTeamId)} collect ${rule[2]} extra runs through ${rule[1]}.`);
    saveData(); render();
  }
  if (action === "edit-batting-event") {
    const match = byId(data.matches, el.dataset.match);
    const found = findBattingAdminEvent(match, el.dataset.event);
    if (!found) return toast("Batting entry not found");
    if (found.event.key === "manualBonus") {
      rememberLiveForm(match.id, "battingBonus", {
        activityDay: found.event.activityDay || match.currentDay || "Wednesday",
        playerId: found.playerId,
        runs: found.event.runs || 0,
        balls: found.event.balls || 0,
        reason: found.event.reason || "",
        editEventId: found.event.id,
      });
      toast("Manual batting bonus loaded for editing");
      render();
      return;
    }
    rememberLiveForm(match.id, "batting", {
      activityDay: found.event.activityDay || match.currentDay || "Wednesday",
      playerId: found.playerId,
      event: found.event.key || "",
      qty: found.event.qty || 1,
      editEventId: found.event.id,
    });
    toast("Batting entry loaded for editing");
    render();
  }
  if (action === "delete-batting-event") {
    const match = byId(data.matches, el.dataset.match);
    const found = removeBattingAdminEvent(match, el.dataset.event);
    if (!found) return toast("Batting entry not found");
    addAutoCommentary(match, `${playerName(found.playerId)} batting entry removed: ${found.event.label || found.event.key}.`);
    saveData(); toast("Batting entry removed"); render();
  }
  if (action === "edit-bowling-event") {
    const match = byId(data.matches, el.dataset.match);
    const found = findBowlingAdminEvent(match, el.dataset.event);
    if (!found) return toast("Bowling entry not found");
    if (found.event.key === "manualBonus") {
      rememberLiveForm(match.id, "bowlingBonus", {
        bowlingDay: found.event.bowlingDay || match.currentDay || "Wednesday",
        playerId: found.playerId,
        wickets: found.event.wickets || 0,
        runs: found.event.runs || 0,
        reason: found.event.reason || "",
        editEventId: found.event.id,
      });
      toast("Manual bowling bonus loaded for editing");
      render();
      return;
    }
    rememberLiveForm(match.id, "bowling", {
      bowlingDay: found.event.bowlingDay || match.currentDay || "Wednesday",
      playerId: found.playerId,
      targetId: found.event.targetId || "",
      event: found.event.key || "",
      editEventId: found.event.id,
    });
    toast("Bowling entry loaded for editing");
    render();
  }
  if (action === "delete-bowling-event") {
    const match = byId(data.matches, el.dataset.match);
    const found = removeBowlingAdminEvent(match, el.dataset.event);
    if (!found) return toast("Bowling entry not found");
    addAutoCommentary(match, `${playerName(found.playerId)} bowling entry removed: ${found.event.label || found.event.key}.`);
    saveData(); toast("Bowling entry removed"); render();
  }
  if (action === "toggle-out") {
    const match = byId(data.matches, el.dataset.match);
    const row = ensureBattingRow(match, el.dataset.player);
    if (row.out && el.textContent.trim() !== "Undo out") return toast("This member is already out in this match");
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
      addAutoCommentary(match, `${playerName(el.dataset.player)} is marked out. Future scoring for this player is now half.`);
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
      addAutoCommentary(match, `${playerName(el.dataset.player)} is restored as not out.`);
    }
    saveData(); render();
  }
  if (action === "all-out") {
    const match = byId(data.matches, el.dataset.match);
    match.allOutByTeam ||= {};
    match.allOutByTeam[match.battingTeamId] = true;
    match.allOut = true;
    teamPlayers(match.battingTeamId).forEach((p) => {
      const row = ensureBattingRow(match, p.id);
      if (row.out) return;
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
    addAutoCommentary(match, `${teamName(match.battingTeamId)} are all out. No more scoring allowed in this innings.`);
    saveData(); toast("Team marked all out"); render();
  }
  if (action === "edit-team") fillTeam(el.dataset.id);
  if (action === "edit-player") fillPlayer(el.dataset.id);
  if (action === "edit-match") fillMatch(el.dataset.id);
  if (action === "edit-criteria") fillCriteria(el.dataset.type, el.dataset.key);
  if (action === "edit-sponsor") fillSponsor(el.dataset.id);
  if (action === "delete-team") { data.teams = data.teams.filter((t) => t.id !== el.dataset.id); saveData(); render(); }
  if (action === "delete-player") { data.players = data.players.filter((p) => p.id !== el.dataset.id); saveData(); render(); }
  if (action === "delete-match") { data.matches = data.matches.filter((m) => m.id !== el.dataset.id); saveData(); render(); }
  if (action === "delete-criteria") { data.criteria[el.dataset.type] = (data.criteria?.[el.dataset.type] || []).filter((rule) => rule[0] !== el.dataset.key); saveData(); render(); }
  if (action === "delete-sponsor") { data.sponsors.partners = (data.sponsors?.partners || []).filter((sponsor) => sponsor.id !== el.dataset.id); saveData(); render(); }
  if (action === "reset-data") resetData();
  if (action === "publish-online") {
    pushFirebaseData().then((published) => {
      toast(published ? "Current data published online" : `Could not publish online: ${firebaseStatusMessage}`);
      render();
    });
  }
  if (action === "test-firebase") {
    initFirebaseSync().then(async (ready) => {
      if (!ready || !firebaseDoc) {
        toast(`Firebase not ready: ${firebaseStatusMessage}`);
        render();
        return;
      }
      try {
        await firebaseDoc.get();
        firebaseConnected = true;
        firebaseStatusMessage = "Read test successful";
        toast("Firebase read test successful");
      } catch (error) {
        firebaseConnected = false;
        firebaseStatusMessage = error.code || error.message || "Read test failed";
        toast(`Firebase test failed: ${firebaseStatusMessage}`);
      }
      render();
    });
  }
  if (action === "export-json") {
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
    toast("Backup JSON copied to clipboard");
  }
}

function trackAdminActivity(event) {
  if (route !== "admin" || !adminUnlocked) return;
  if (event.target.closest('form[data-form="login"]')) return;
  if (isAdminSessionValid()) touchAdminSession();
}
function scrollToAdminForm(formType) {
  if (!window.matchMedia("(max-width: 720px)").matches) return;
  const form = document.querySelector(`form[data-form="${formType}"]`);
  form?.closest(".card")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function fillTeam(teamId) {
  const t = byId(data.teams, teamId), f = document.querySelector('form[data-form="team"]');
  f.id.value = t.id; f.name.value = t.name; f.group.value = t.group; f.color.value = t.color; f.logo.value = editableLogoPath(t.logo || "");
  if (f.logoSize) f.logoSize.value = logoSizeValue(t.logoSize);
  scrollToAdminForm("team");
}
function fillPlayer(playerId) {
  const p = byId(data.players, playerId), f = document.querySelector('form[data-form="player"]');
  f.id.value = p.id; f.name.value = p.name; f.teamId.value = p.teamId; f.role.value = p.role || "";
  scrollToAdminForm("player");
}
function fillMatch(matchId) {
  const m = byId(data.matches, matchId), f = document.querySelector('form[data-form="match"]');
  f.id.value = m.id; f.week.value = m.week; f.status.value = m.status; f.teamAId.value = m.teamAId; f.teamBId.value = m.teamBId; f.venue.value = m.venue; f.firstInningsRuns.value = m.firstInningsRuns || "";
  f.startAt.value = dateTimeInputValue(m.startAt); f.completedAt.value = dateTimeInputValue(m.completedAt);
  scrollToAdminForm("match");
}
function fillSponsor(sponsorId) {
  const sponsor = (data.sponsors?.partners || []).find((item) => item.id === sponsorId);
  const f = document.querySelector('form[data-form="sponsor"]');
  if (!sponsor || !f) return;
  f.id.value = sponsor.id; f.name.value = sponsor.name; f.note.value = sponsor.note || ""; f.logo.value = editableLogoPath(sponsor.logo || "");
  if (f.logoSize) f.logoSize.value = logoSizeValue(sponsor.logoSize);
  scrollToAdminForm("sponsor");
}
function fillCriteria(type, key) {
  const rule = (rules()[type] || []).find((item) => item[0] === key);
  const f = document.querySelector('form[data-form="criteria"]');
  if (!rule || !f) return;
  f.originalKey.value = rule[0];
  f.type.value = type;
  f.key.value = rule[0];
  f.label.value = rule[1];
  f.primary.value = rule[2] ?? 0;
  f.secondary.value = type === "extras" ? 0 : (rule[3] ?? 0);
  scrollToAdminForm("criteria");
}
function toast(message) {
  const node = document.getElementById("toastTemplate").content.firstElementChild.cloneNode(true);
  node.textContent = message;
  document.getElementById("toastStack").appendChild(node);
  setTimeout(() => node.remove(), 2600);
}
function highlightPulseText(text) {
  let html = esc(text || "");
  const activityTerms = [
    ...rules().batting.map((rule) => rule[1]),
    ...rules().extras.map((rule) => rule[1]),
    ...rules().bowling.map((rule) => rule[1]),
  ];
  const terms = [
    ...data.teams.map((team) => ({ value: team.name, type: "team" })),
    ...data.players.map((player) => ({ value: player.name, type: "player" })),
    ...activityTerms.map((value) => ({ value, type: "activity" })),
  ].filter((term) => term.value && term.value.length > 2)
    .sort((a, b) => b.value.length - a.value.length);
  terms.forEach((term) => {
    const safe = esc(term.value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(new RegExp(`\\b${safe}\\b`, "gi"), (match) => `<mark class="pulse-${term.type}">${match}</mark>`);
  });
  return html;
}
function showHomeCommentaryPop() {
  if (homeCommentaryPopShown || route !== "home") return;
  const liveMatches = data.matches.filter((match) => match.status === "live").slice(0, 2);
  const updates = liveMatches.map((match) => {
    const latest = (match.commentary || [])[0];
    if (!latest) return null;
    const score = scoreOf(match);
    return { html: `<article class="commentary-pop-card">
      <span>${esc(matchTitle(match))}</span>
      <strong>${esc(teamName(match.battingTeamId))} ${score.runs}/${score.wickets}</strong>
      <p><b>${esc(latest.time || "Live")}</b> ${highlightPulseText(latest.text || "")}</p>
    </article>` };
  }).filter(Boolean);
  if (!updates.length) return;
  homeCommentaryPopShown = true;
  const pop = document.createElement("div");
  pop.className = "commentary-pop";
  pop.innerHTML = `<div class="commentary-pop-panel">
    <div class="commentary-pop-head"><span class="live-badge">Live Pulse</span><button class="icon-btn" type="button" aria-label="Close live pulse">x</button></div>
    <div class="commentary-pop-grid">${updates[0].html}</div>
  </div>`;
  document.body.appendChild(pop);
  const grid = pop.querySelector(".commentary-pop-grid");
  let index = 0;
  const close = () => {
    clearInterval(interval);
    pop.classList.add("closing");
    setTimeout(() => pop.remove(), 420);
  };
  pop.querySelector("button")?.addEventListener("click", close);
  const interval = setInterval(() => {
    index += 1;
    if (index >= updates.length) {
      clearInterval(interval);
      close();
      return;
    }
    grid.innerHTML = updates[index].html;
  }, 4000);
  if (updates.length === 1) setTimeout(close, 4000);
}
function render() {
  const views = { home: homeView, dashboard: dashboardView, results: resultsView, stats: statsView, points: pointsView, admin: adminView };
  (views[route] || homeView)();
  if (route === "admin") restoreAdminLiveExpanded();
  if (route === "home") setTimeout(showHomeCommentaryPop, 450);
}

document.addEventListener("submit", handleForm);
document.addEventListener("change", handleChange);
document.addEventListener("input", handleInput);
document.addEventListener("keydown", handleKeydown);
document.addEventListener("click", handleClick);
["click", "change", "input", "keydown"].forEach((eventName) => document.addEventListener(eventName, trackAdminActivity, true));
navToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (event) => { if (event.target === modal) modal.classList.remove("open"); });
window.addEventListener("hashchange", () => { route = location.hash.replace("#", "") || "home"; render(); });
render();
initFirebaseSync();
