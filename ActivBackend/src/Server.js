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
  faqs: [
    { id: "1", category: "Players", question: "When will the ACTIV app be available?", answer: "ACTIV is rolling out across major cities soon. Download the app on iOS or Android to check availability in your area and pre-register your account." },
    { id: "2", category: "Players", question: "How does ACTIV ensure venue quality?", answer: "Every single venue on ACTIV is physically reviewed and verified by our team before listing to ensure real photos, proper equipment, and accurate live availability." },
    { id: "3", category: "Players", question: "What happens if I'm running late for a booking?", answer: "You can view your booking details and directly contact the venue manager through the app to inform them of any minor schedule changes." },
    { id: "4", category: "Players", question: "Can I cancel or get a refund on a booking?", answer: "Yes, cancellations made within the permitted venue window are fully refunded back to your source account instantly." },
    { id: "5", category: "Players", question: "Can I share my booking with friends?", answer: "Absolutely! You can share booking confirmation links directly via WhatsApp or copy details to share with your group instantly." },
    { id: "6", category: "Players", question: "How do I find only verified venues near me?", answer: "All venues listed on ACTIV are pre-vetted. Use location permissions or search by your preferred area to see active spaces immediately." },
    { id: "7", category: "Venue partners", question: "What types of venues can partner with ACTIV?", answer: "Turfs, badminton courts, pickleball arenas, fitness studios, yoga spaces, gyms, and sports complexes of all sizes." },
    { id: "8", category: "Venue partners", question: "What's the commission structure on ACTIV?", answer: "We maintain transparent per-booking models with zero setup costs or hidden subscription overheads." },
    { id: "9", category: "Venue partners", question: "How long does the approval process take?", answer: "Most venues go live within 24 hours following quick verification and slot configuration by our onboarding team." },
    { id: "10", category: "Venue partners", question: "Can I control my pricing and availability?", answer: "Yes, you have full real-time control over slot pricing, peak hours, blackout dates, and court availability via your partner dashboard." },
    { id: "11", category: "Venue partners", question: "How do I receive payments for bookings?", answer: "Payments are processed securely online and settled directly to your registered bank account on a scheduled cycle." },
    { id: "12", category: "Venue partners", question: "What support does ACTIV provide partners?", answer: "Dedicated account management, technical assistance, marketing boost in local search results, and 24/7 operational support." },
    { id: "13", category: "Platform & Support", question: "Which cities is ACTIV launching in?", answer: "We are actively expanding across Mumbai, Bengaluru, Hyderabad, Delhi-NCR, Pune, and major tier-1 sports hubs." },
    { id: "14", category: "Platform & Support", question: "How do I cancel or reschedule a booking?", answer: "Navigate to your bookings tab in the app, select the active reservation, and tap modify or cancel according to venue policy." },
    { id: "15", category: "Platform & Support", question: "What happens if a venue cancels on me?", answer: "In rare cases of venue-side cancellations, you receive an immediate full refund plus priority re-booking options." },
    { id: "16", category: "Platform & Support", question: "How do I reach the ACTIV team?", answer: "You can reach us anytime at Support@activ.live or submit the direct contact form below for prompt assistance." }
  ],
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
    const data = JSON.parse(await fs.readFile(dataFile, "utf8"));
    if (!data.faqs || data.faqs.length === 0) {
      data.faqs = defaultData.faqs;
      await writeData(data);
    }
    return data;
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

app.get("/api/faqs", async (_req, res) => {
  const data = await readData();
  res.json(data.faqs || []);
});

app.post("/api/faqs", async (req, res) => {
  const data = await readData();
  const { category, question, answer } = req.body;
  if (!data.faqs) data.faqs = [];
  const newFaq = { id: crypto.randomUUID(), category, question, answer };
  data.faqs.push(newFaq);
  await writeData(data);
  res.status(201).json(newFaq);
});

app.put("/api/faqs/:id", async (req, res) => {
  const data = await readData();
  if (data.faqs) {
    const index = data.faqs.findIndex(f => f.id === req.params.id);
    if (index !== -1) {
      data.faqs[index] = { ...data.faqs[index], ...req.body };
      await writeData(data);
      return res.status(200).json(data.faqs[index]);
    }
  }
  res.status(404).json({ message: "FAQ not found" });
});

app.delete("/api/faqs/:id", async (req, res) => {
  const data = await readData();
  if (data.faqs) {
    data.faqs = data.faqs.filter(f => f.id !== req.params.id);
    await writeData(data);
  }
  res.status(200).json({ success: true });
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

  const faqsHtml = (data.faqs || []).map(faq => `
    <article class="contact">
      <strong>[${escapeHtml(faq.category)}] ${escapeHtml(faq.question)}</strong>
      <p>${escapeHtml(faq.answer)}</p>
      <form method="post" action="/admin/faqs/${faq.id}/delete" style="display:inline;">
         <button type="submit" style="background:#ff4d4d; color:#fff; width:auto; padding:6px 12px; margin-top:5px; border:none; border-radius:4px;">Delete</button>
      </form>
    </article>`).join("");

  res.type("html").send(`<!doctype html><html><head><meta charset="utf-8"><title>ACTIV Admin</title>
    <style>body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;background:#101010;color:#fff}h1{color:#c8f31d}.panel{border:1px solid #394900;border-radius:12px;padding:24px;margin:20px 0}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}input,select,textarea,button{box-sizing:border-box;width:100%;padding:12px;border-radius:8px;border:1px solid #333;background:#1b1d19;color:#fff}button{background:#c8f31d;color:#111;font-weight:bold;cursor:pointer;margin-top:14px}.contact{border-top:1px solid #333;padding:16px 0}.contact span,.contact time{display:block;color:#aaa;font-size:13px;margin-top:5px}.contact p{color:#ddd;white-space:pre-wrap}</style></head><body>
    <h1>ACTIV Admin Panel</h1>
    <section class="panel">
      <h2>Add New FAQ</h2>
      <form method="post" action="/admin/faqs">
        <label style="display:block;margin-bottom:10px;">Category
          <select name="category" required style="margin-top:5px;">
            <option value="Players">Players</option>
            <option value="Venue partners">Venue partners</option>
            <option value="Platform & Support">Platform & Support</option>
          </select>
        </label>
        <label style="display:block;margin-bottom:10px;">Question
          <input name="question" required style="margin-top:5px;">
        </label>
        <label style="display:block;margin-bottom:10px;">Answer
          <textarea name="answer" required rows="3" style="margin-top:5px;resize:vertical;"></textarea>
        </label>
        <button type="submit">Add FAQ</button>
      </form>
    </section>
    <section class="panel"><h2>Manage FAQs</h2>${faqsHtml}</section>
    <section class="panel"><h2>Contact Information</h2>${contacts}</section>
    <section class="panel"><h2>Social Media Links</h2><form method="post" action="/admin/social-links"><div class="grid">${Object.entries(data.socialLinks).map(([key, value]) => `<label>${key}<input name="${key}" value="${escapeHtml(value)}"></label>`).join("")}</div><button>Save links</button></form></section></body></html>`);
});

app.post("/admin/faqs", express.urlencoded({ extended: false }), async (req, res) => {
  const data = await readData();
  const { category, question, answer } = req.body;
  if (!data.faqs) data.faqs = [];
  data.faqs.push({
    id: crypto.randomUUID(),
    category,
    question,
    answer
  });
  await writeData(data);
  res.redirect("/admin");
});

app.post("/admin/faqs/:id/delete", express.urlencoded({ extended: false }), async (req, res) => {
  const data = await readData();
  if (data.faqs) {
    data.faqs = data.faqs.filter(f => f.id !== req.params.id);
    await writeData(data);
  }
  res.redirect("/admin");
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