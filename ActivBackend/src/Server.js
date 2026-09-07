import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "..", "data", "site-data.json");

const defaultData = {
  contacts: [],
  socialLinks: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    youtube: "#",
    x: "#",
  },
  adminProfile: {
    name: "ACTIV Administrator",
    email: "adminactiv@gmail.com",
    role: "Super Admin",
  },
};

async function readData() {
  try {
    return JSON.parse(await fs.readFile(dataFile, "utf8"));
  } catch {
    await writeData(defaultData);
    return defaultData;
  }
}

async function writeData(data) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
}

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== "adminactiv@gmail.com" || password !== "Admin@123") {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }
  res.json({ authenticated: true, email, token: "activ-admin-session" });
});

app.get("/api/admin/profile", async (_req, res) => {
  const data = await readData();
  res.json(data.adminProfile || defaultData.adminProfile);
});

app.post("/api/contacts", async (req, res) => {
  const { fullName, email, phone = "", message } = req.body;

  if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Full name, email, and message are required." });
  }

  const data = await readData();
  const contact = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  data.contacts.unshift(contact);
  await writeData(data);
  res.status(201).json(contact);
});

app.get("/api/contacts", async (_req, res) => {
  const data = await readData();
  res.json(data.contacts);
});

app.get("/api/social-links", async (_req, res) => {
  const data = await readData();
  res.json(data.socialLinks);
});

app.put("/api/social-links", async (req, res) => {
  const data = await readData();
  const allowedKeys = Object.keys(defaultData.socialLinks);
  data.socialLinks = Object.fromEntries(
    allowedKeys.map((key) => [key, typeof req.body[key] === "string" ? req.body[key].trim() : data.socialLinks[key]])
  );
  await writeData(data);
  res.json(data.socialLinks);
});

app.get("/admin", async (_req, res) => {
  const data = await readData();
  const contacts = data.contacts.map((contact) => `
    <article class="contact">
      <strong>${escapeHtml(contact.fullName)}</strong>
      <span>${escapeHtml(contact.email)}${contact.phone ? ` | ${escapeHtml(contact.phone)}` : ""}</span>
      <time>${new Date(contact.createdAt).toLocaleString()}</time>
      <p>${escapeHtml(contact.message)}</p>
    </article>`).join("") || "<p>No contact messages yet.</p>";

  res.type("html").send(`<!doctype html><html><head><meta charset="utf-8"><title>ACTIV Admin</title>
    <style>body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;background:#101010;color:#fff}h1{color:#c8f31d}.panel{border:1px solid #394900;border-radius:12px;padding:24px;margin:20px 0}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}input,button{box-sizing:border-box;width:100%;padding:12px;border-radius:8px;border:1px solid #333;background:#1b1d19;color:#fff}button{background:#c8f31d;color:#111;font-weight:bold;cursor:pointer;margin-top:14px}.contact{border-top:1px solid #333;padding:16px 0}.contact span,.contact time{display:block;color:#aaa;font-size:13px;margin-top:5px}.contact p{color:#ddd;white-space:pre-wrap}</style></head><body>
    <h1>ACTIV Admin Panel</h1><section class="panel"><h2>Contact Information</h2>${contacts}</section>
    <section class="panel"><h2>Social Media Links</h2><form method="post" action="/admin/social-links"><div class="grid">${Object.entries(data.socialLinks).map(([key, value]) => `<label>${key}<input name="${key}" value="${escapeHtml(value)}"></label>`).join("")}</div><button>Save links</button></form></section></body></html>`);
});

app.post("/admin/social-links", express.urlencoded({ extended: false }), async (req, res) => {
  const data = await readData();
  data.socialLinks = { ...data.socialLinks, ...req.body };
  await writeData(data);
  res.redirect("/admin");
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
}

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});