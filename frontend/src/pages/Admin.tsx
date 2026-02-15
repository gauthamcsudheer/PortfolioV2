"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Trash2, GripVertical, Mail, Briefcase, Plus, X, 
  Loader2, Edit2, GraduationCap, History 
} from "lucide-react";

// --- Sortable Item Component ---
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 mb-3 bg-card border border-border-subtle rounded-xl shadow-sm group animate-in fade-in slide-in-from-bottom-2"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-text-muted hover:text-brand-primary transition-colors">
        <GripVertical size={20} />
      </button>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function AdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "timeline" | "messages">("projects");
  
  // Form Control States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Dynamic Form States
  const [projData, setProjData] = useState({ title: "", description: "", tags: "", link: "", imgSrc: "" });
  const [timeData, setTimeData] = useState({ type: "work", year: "", title: "", subtitle: "", description: "", tags: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [p, t, c] = await Promise.all([
        fetch("http://localhost:3000/api/projects"),
        fetch("http://localhost:3000/api/experience"),
        fetch("http://localhost:3000/api/contacts"),
      ]);
      setProjects(await p.json());
      setTimeline(await t.json());
      setContacts(await c.json());
    } catch (err) { console.error("Sync failed:", err); }
  };

  // --- Handlers ---

  const resetForms = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setProjData({ title: "", description: "", tags: "", link: "", imgSrc: "" });
    setTimeData({ type: "work", year: "", title: "", subtitle: "", description: "", tags: "" });
  };

  const handleEdit = (item: any, type: 'projects' | 'timeline') => {
    setEditingId(item._id);
    if (type === 'projects') {
      setProjData({ title: item.title, description: item.description, tags: item.tags.join(", "), link: item.link, imgSrc: item.imgSrc });
    } else {
      setTimeData({ type: item.type, year: item.year, title: item.title, subtitle: item.subtitle, description: item.description, tags: item.tags.join(", ") });
    }
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isProj = activeTab === 'projects';
    
    const url = `http://localhost:3000/api/${isProj ? 'projects' : 'experience'}${editingId ? `/${editingId}` : ''}`;
    const method = editingId ? "PUT" : "POST";
    
    const body = isProj ? {
      ...projData,
      tags: projData.tags.split(",").map(t => t.trim()),
      orderIndex: editingId ? undefined : projects.length
    } : {
      ...timeData,
      tags: timeData.tags.split(",").map(t => t.trim()),
      orderIndex: editingId ? undefined : timeline.length
    };

    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { resetForms(); fetchData(); }
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string, endpoint: string) => {
    if (!window.confirm("Confirm deletion?")) return;
    const res = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const onDragEnd = async (event: DragEndEvent, type: 'projects' | 'experience') => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const list = type === 'projects' ? projects : timeline;
    const oldIdx = list.findIndex(i => i._id === active.id);
    const newIdx = list.findIndex(i => i._id === over.id);
    const newOrder = arrayMove(list, oldIdx, newIdx);

    type === 'projects' ? setProjects(newOrder) : setTimeline(newOrder);

    await fetch(`http://localhost:3000/api/${type}/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders: newOrder.map((item, index) => ({ id: item._id, index })) }),
    });
  };

  return (
    <div className="min-h-screen bg-bg-page text-text-main pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-4 italic">Command Center</h1>
          <div className="flex gap-6 border-b border-border-subtle">
            {["projects", "timeline", "messages"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); resetForms(); }}
                className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab ? "border-b-2 border-brand-primary text-brand-primary" : "text-text-muted hover:text-text-main"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab !== "messages" && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tighter">
                {activeTab === 'projects' ? <Briefcase size={20} /> : <History size={20} />}
                {activeTab}
              </h2>
              {!isFormOpen && (
                <Button size="sm" className="rounded-full gap-2 px-6" onClick={() => setIsFormOpen(true)}>
                  <Plus size={16} /> New Entry
                </Button>
              )}
            </div>

            {isFormOpen && (
              <div className="p-8 border-2 border-brand-primary/20 bg-brand-primary/5 rounded-3xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                    {editingId ? "Modify Existing Data" : "Initialize New Record"}
                  </span>
                  <button onClick={resetForms} className="text-text-muted hover:text-text-main"><X size={20} /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTab === 'timeline' && (
                    <div className="md:col-span-2 flex gap-3">
                      {['work', 'education'].map(t => (
                        <button key={t} type="button" onClick={() => setTimeData({...timeData, type: t})}
                          className={`px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            timeData.type === t ? "bg-brand-primary border-brand-primary text-white" : "border-border-subtle text-text-muted"
                          }`}>{t}</button>
                      ))}
                    </div>
                  )}

                  <Input required placeholder="Main Title" value={activeTab === 'projects' ? projData.title : timeData.title} 
                    onChange={e => activeTab === 'projects' ? setProjData({...projData, title: e.target.value}) : setTimeData({...timeData, title: e.target.value})} />
                  
                  <Input required placeholder={activeTab === 'projects' ? "Tags (CSV)" : "Subtitle / Org"} 
                    value={activeTab === 'projects' ? projData.tags : timeData.subtitle}
                    onChange={e => activeTab === 'projects' ? setProjData({...projData, tags: e.target.value}) : setTimeData({...timeData, subtitle: e.target.value})} />

                  {activeTab === 'projects' ? (
                    <>
                      <Input placeholder="Unsplash URL" value={projData.imgSrc} onChange={e => setProjData({...projData, imgSrc: e.target.value})} />
                      <Input placeholder="Live Link" value={projData.link} onChange={e => setProjData({...projData, link: e.target.value})} />
                    </>
                  ) : (
                    <>
                      <Input placeholder="Duration (e.g. 2026 — Present)" value={timeData.year} onChange={e => setTimeData({...timeData, year: e.target.value})} />
                      <Input placeholder="Skills Tags (CSV)" value={timeData.tags} onChange={e => setTimeData({...timeData, tags: e.target.value})} />
                    </>
                  )}

                  <textarea 
                    className="md:col-span-2 flex w-full rounded-2xl border border-border-subtle bg-transparent px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-brand-primary outline-none"
                    placeholder="Engineering breakdown..."
                    value={activeTab === 'projects' ? projData.description : timeData.description}
                    onChange={e => activeTab === 'projects' ? setProjData({...projData, description: e.target.value}) : setTimeData({...timeData, description: e.target.value})}
                  />
                  
                  <Button type="submit" className="md:col-span-2 rounded-2xl h-12 uppercase font-black tracking-widest" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : editingId ? "Save Modifications" : "Commit Record"}
                  </Button>
                </form>
              </div>
            )}

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, activeTab === 'projects' ? 'projects' : 'experience')}>
              <SortableContext items={(activeTab === 'projects' ? projects : timeline).map(i => i._id)} strategy={verticalListSortingStrategy}>
                {(activeTab === 'projects' ? projects : timeline).map((item) => (
                  <SortableItem key={item._id} id={item._id}>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-4">
                        {activeTab === 'timeline' && (
                          <div className="text-brand-primary">{item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}</div>
                        )}
                        <div>
                          <p className="font-bold text-sm">{item.title} {item.subtitle && <span className="text-text-muted font-normal">@ {item.subtitle}</span>}</p>
                          <p className="text-[10px] font-mono text-text-muted uppercase tracking-tighter">
                            {activeTab === 'projects' ? item.tags.join(" • ") : item.year}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item, activeTab)} className="p-2 text-text-muted hover:text-brand-primary"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(item._id, activeTab === 'projects' ? 'projects' : 'experience')} className="p-2 text-text-muted hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid grid-cols-1 gap-6">
            {contacts.length === 0 && <p className="text-text-muted text-center py-20 font-mono italic">No communication logs found.</p>}
            {contacts.map((msg) => (
              <div key={msg._id} className="p-8 bg-card border border-border-subtle rounded-3xl shadow-sm hover:border-brand-primary/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-black text-xl tracking-tighter uppercase">{msg.name}</h3>
                    <p className="text-xs text-brand-primary font-mono font-bold tracking-widest">{msg.email}</p>
                  </div>
                  <Mail className="text-text-muted" size={20} />
                </div>
                <div className="bg-bg-page/50 p-5 rounded-2xl border border-border-subtle/50 mb-6">
                  <p className="text-sm text-text-muted leading-relaxed italic">"{msg.message}"</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {msg.projectType?.map((type: string) => (
                    <span key={type} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg border border-brand-primary/20">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}