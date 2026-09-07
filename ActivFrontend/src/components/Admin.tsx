import { useEffect, useState, type FormEvent } from "react";

type Tab = "messages" | "settings" | "profile";
type Contact = { id: string; fullName: string; email: string; phone: string; message: string; createdAt: string };
type SocialLinks = Record<"instagram" | "linkedin" | "facebook" | "youtube" | "x", string>;

const API = "http://localhost:5000/api";
const emptyLinks: SocialLinks = { instagram: "#", linkedin: "#", facebook: "#", youtube: "#", x: "#" };

export default function Admin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [tab, setTab] = useState<Tab>("messages");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [links, setLinks] = useState<SocialLinks>(emptyLinks);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    Promise.all([fetch(`${API}/contacts`), fetch(`${API}/social-links`), fetch(`${API}/admin/profile`)]).then(async ([contactsResponse, linksResponse]) => {
      if (contactsResponse.ok) setContacts(await contactsResponse.json());
      if (linksResponse.ok) setLinks({ ...emptyLinks, ...(await linksResponse.json()) });
    }).catch(() => setSaved("Backend is unavailable. Start the backend to load admin data."));
  }, []);

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
          {(["messages", "settings", "profile"] as Tab[]).map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-4 py-2 text-sm capitalize ${tab === item ? "bg-[#c8f31d] font-semibold text-black" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>{item}</button>)}
        </nav>
        {saved && <p className="mt-5 rounded-lg border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-4 py-3 text-sm text-[#c8f31d]">{saved}</p>}
        {tab === "messages" && <section className="mt-7"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-xl font-semibold">Messages</h2><p className="mt-1 text-sm text-white/50">Messages submitted through Support contact us.</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{contacts.length} total</span></div><div className="space-y-3">{contacts.length === 0 ? <Empty text="No messages yet." /> : contacts.map((contact) => <article key={contact.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><h3 className="font-semibold">{contact.fullName}</h3><p className="text-sm text-[#c8f31d]">{contact.email}{contact.phone && ` · ${contact.phone}`}</p></div><time className="text-xs text-white/40">{new Date(contact.createdAt).toLocaleString()}</time></div><p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{contact.message}</p></article>)}</div></section>}
        {tab === "settings" && <section className="mt-7 max-w-2xl"><h2 className="text-xl font-semibold">Footer social links</h2><p className="mt-1 text-sm text-white/50">Add or edit the links shown in Footer.tsx.</p><form onSubmit={saveLinks} className="mt-6 space-y-4">{Object.keys(links).map((key) => <label key={key} className="block"><span className="mb-2 block text-sm capitalize text-white/70">{key}</span><input value={links[key as keyof SocialLinks]} onChange={(event) => setLinks({ ...links, [key]: event.target.value })} className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-[#c8f31d]" placeholder={`https://${key}.com/activ`} /></label>)}<button className="rounded-xl bg-[#c8f31d] px-5 py-3 text-sm font-semibold text-black">Save social links</button></form></section>}
        {tab === "profile" && <section className="mt-7 max-w-2xl"><h2 className="text-xl font-semibold">Admin profile</h2><div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-6"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8f31d] text-xl font-bold text-black">A</div><div><h3 className="text-lg font-semibold">ACTIV Administrator</h3><p className="text-sm text-white/50">adminactiv@gmail.com</p></div></div><dl className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2"><div><dt className="text-xs uppercase tracking-wider text-white/40">Role</dt><dd className="mt-1 text-sm">Super Admin</dd></div><div><dt className="text-xs uppercase tracking-wider text-white/40">Account status</dt><dd className="mt-1 text-sm text-[#c8f31d]">Active</dd></div></dl></div></section>}
      </div>
    </main>
  );
}

function Empty({ text }: { text: string }) { return <div className="rounded-xl border border-dashed border-white/15 px-5 py-12 text-center text-sm text-white/45">{text}</div>; }
