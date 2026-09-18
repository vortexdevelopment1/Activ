import { useEffect, useState, type FormEvent } from "react";
import { API } from "../config/api";

type Tab = "messages" | "faqs" | "settings" | "profile";
type Contact = { id: string; fullName: string; email: string; phone: string; message: string; createdAt: string };
type SocialLinks = Record<"instagram" | "linkedin" | "facebook" | "youtube" | "x", string>;
type FaqItemWithCategory = { id: string; category: string; question: string; answer: string };

const emptyLinks: SocialLinks = { instagram: "#", linkedin: "#", facebook: "#", youtube: "#", x: "#" };

export default function Admin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [tab, setTab] = useState<Tab>("messages");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [links, setLinks] = useState<SocialLinks>(emptyLinks);
  const [faqs, setFaqs] = useState<FaqItemWithCategory[]>([]);
  const [newFaq, setNewFaq] = useState({ category: "Players", question: "", answer: "" });
  const [editingFaq, setEditingFaq] = useState<FaqItemWithCategory | null>(null);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    Promise.all([fetch(`${API}/contacts`), fetch(`${API}/social-links`), fetch(`${API}/admin/profile`), fetch(`${API}/faqs`)]).then(async ([contactsResponse, linksResponse, _, faqsResponse]) => {
      if (contactsResponse.ok) setContacts(await contactsResponse.json());
      if (linksResponse.ok) setLinks({ ...emptyLinks, ...(await linksResponse.json()) });
      if (faqsResponse.ok) setFaqs(await faqsResponse.json());
    }).catch(() => setSaved("Backend is unavailable. Start the backend to load admin data."));
  }, []);

  const addFaq = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/faqs`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newFaq) });
    if (res.ok) {
      setFaqs([...faqs, await res.json()]);
      setNewFaq({ category: "Players", question: "", answer: "" });
      setSaved("FAQ added successfully.");
    }
  };

  const deleteFaq = async (id: string) => {
    const res = await fetch(`${API}/faqs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setFaqs(faqs.filter(f => f.id !== id));
      setSaved("FAQ deleted successfully.");
    }
  };

  const updateFaq = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    const res = await fetch(`${API}/faqs/${editingFaq.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingFaq) });
    if (res.ok) {
      const updated = await res.json();
      setFaqs(faqs.map(f => (f.id === updated.id ? updated : f)));
      setEditingFaq(null);
      setSaved("FAQ updated successfully.");
    }
  };

  const saveLinks = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API}/social-links`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(links) });
    setSaved(response.ok ? "Social links saved." : "Could not save social links.");
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c8f31d]">ACTIV control room</p><h1 className="mt-2 text-3xl font-bold">Admin panel</h1><p className="mt-1 text-sm text-white/50">Manage support conversations, footer links, and your profile.</p></div>
          <button onClick={() => onNavigate("home")} className="w-fit rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-[#c8f31d] hover:text-[#c8f31d]">Back to site</button>
        </header>
        <nav className="mt-7 flex gap-2 overflow-x-auto border-b border-white/10 pb-3">
          {(["messages", "faqs", "settings", "profile"] as Tab[]).map((item) => <button key={item} onClick={() => { setTab(item); setSaved(""); }} className={`rounded-lg px-4 py-2 text-sm capitalize ${tab === item ? "bg-[#c8f31d] font-semibold text-black" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>{item}</button>)}
        </nav>
        {saved && <p className="mt-5 rounded-lg border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-4 py-3 text-sm text-[#c8f31d]">{saved}</p>}
        {tab === "messages" && <section className="mt-7"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-xl font-semibold">Messages</h2><p className="mt-1 text-sm text-white/50">Messages submitted through Support contact us.</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{contacts.length} total</span></div><div className="space-y-3">{contacts.length === 0 ? <Empty text="No messages yet." /> : contacts.map((contact) => <article key={contact.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><h3 className="font-semibold">{contact.fullName}</h3><p className="text-sm text-[#c8f31d]">{contact.email}{contact.phone && ` · ${contact.phone}`}</p></div><time className="text-xs text-white/40">{new Date(contact.createdAt).toLocaleString()}</time></div><p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{contact.message}</p></article>)}</div></section>}
        {tab === "faqs" && <section className="mt-7"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-xl font-semibold">FAQs</h2><p className="mt-1 text-sm text-white/50">Manage FAQs shown on the Support page.</p></div></div><form onSubmit={addFaq} className="mb-8 space-y-4 rounded-xl border border-white/10 p-5 bg-white/[0.03]"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><label className="block"><span className="mb-2 block text-sm text-white/70">Category</span><select value={newFaq.category} onChange={e => setNewFaq({...newFaq, category: e.target.value})} className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-[#c8f31d]"><option value="Players">Players</option><option value="Venue partners">Venue partners</option><option value="Platform & Support">Platform & Support</option></select></label><label className="block"><span className="mb-2 block text-sm text-white/70">Question</span><input required value={newFaq.question} onChange={e => setNewFaq({...newFaq, question: e.target.value})} className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-[#c8f31d]" placeholder="e.g. How do I book?" /></label></div><label className="block"><span className="mb-2 block text-sm text-white/70">Answer</span><textarea required rows={3} value={newFaq.answer} onChange={e => setNewFaq({...newFaq, answer: e.target.value})} className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-[#c8f31d] resize-y" placeholder="Answer here..."></textarea></label><button className="rounded-xl bg-[#c8f31d] px-5 py-3 text-sm font-semibold text-black">Add FAQ</button></form><div className="space-y-3">{faqs.length === 0 ? <Empty text="No FAQs yet." /> : faqs.map((faq) => <article key={faq.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">{editingFaq?.id === faq.id ? <form onSubmit={updateFaq} className="space-y-3"><select value={editingFaq.category} onChange={e => setEditingFaq({...editingFaq, category: e.target.value})} className="w-full rounded-lg border border-white/15 bg-black px-3 py-2 text-sm outline-none"><option value="Players">Players</option><option value="Venue partners">Venue partners</option><option value="Platform & Support">Platform & Support</option></select><input required value={editingFaq.question} onChange={e => setEditingFaq({...editingFaq, question: e.target.value})} className="w-full rounded-lg border border-white/15 bg-black px-3 py-2 text-sm outline-none" /><textarea required rows={3} value={editingFaq.answer} onChange={e => setEditingFaq({...editingFaq, answer: e.target.value})} className="w-full rounded-lg border border-white/15 bg-black px-3 py-2 text-sm outline-none resize-y" /><div className="flex gap-2"><button type="submit" className="rounded-lg bg-[#c8f31d] px-4 py-2 text-sm font-semibold text-black">Save</button><button type="button" onClick={() => setEditingFaq(null)} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5">Cancel</button></div></form> : <><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><span className="inline-block rounded-full bg-[#c8f31d]/15 px-3 py-1 text-xs font-semibold text-[#c8f31d] mb-3">{faq.category}</span><h3 className="font-semibold">{faq.question}</h3></div><div className="flex items-start gap-2 h-fit"><button onClick={() => setEditingFaq(faq)} className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-500 hover:bg-blue-500/20">Edit</button><button onClick={() => deleteFaq(faq.id)} className="rounded-lg bg-red-500/10 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/20">Delete</button></div></div><p className="mt-3 text-sm leading-relaxed text-white/70">{faq.answer}</p></>}</article>)}</div></section>}
        {tab === "settings" && <section className="mt-7 max-w-2xl"><h2 className="text-xl font-semibold">Footer social links</h2><p className="mt-1 text-sm text-white/50">Add or edit the links shown in Footer.tsx.</p><form onSubmit={saveLinks} className="mt-6 space-y-4">{Object.keys(links).map((key) => <label key={key} className="block"><span className="mb-2 block text-sm capitalize text-white/70">{key}</span><input value={links[key as keyof SocialLinks]} onChange={(event) => setLinks({ ...links, [key]: event.target.value })} className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-[#c8f31d]" placeholder={`https://${key}.com/activ`} /></label>)}<button className="rounded-xl bg-[#c8f31d] px-5 py-3 text-sm font-semibold text-black">Save social links</button></form></section>}
        {tab === "profile" && <section className="mt-7 max-w-2xl"><h2 className="text-xl font-semibold">Admin profile</h2><div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-6"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8f31d] text-xl font-bold text-black">A</div><div><h3 className="text-lg font-semibold">ACTIV Administrator</h3><p className="text-sm text-white/50">adminactiv@gmail.com</p></div></div><dl className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2"><div><dt className="text-xs uppercase tracking-wider text-white/40">Role</dt><dd className="mt-1 text-sm">Super Admin</dd></div><div><dt className="text-xs uppercase tracking-wider text-white/40">Account status</dt><dd className="mt-1 text-sm text-[#c8f31d]">Active</dd></div></dl></div></section>}
      </div>
    </main>
  );
}

function Empty({ text }: { text: string }) { return <div className="rounded-xl border border-dashed border-white/15 px-5 py-12 text-center text-sm text-white/45">{text}</div>; }
