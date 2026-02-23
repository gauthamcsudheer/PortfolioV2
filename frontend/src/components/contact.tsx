"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle2 } from 'lucide-react';

// --- Import the dynamic base URL configuration ---
import { API_BASE_URL } from "@/lib/api";

interface ContactSectionProps {
  title?: string;
  mainMessage?: string;
  contactEmail?: string;
  backgroundImageSrc?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Ready to architect your next digital breakthrough?",
  mainMessage = "Let's connect! ⚡",
  contactEmail = "csgautham091003@gmail.com", 
  backgroundImageSrc = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: [] as string[],
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Updated to use the dynamic API_BASE_URL constant
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', projectType: [] });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    }
  };

  const projectTypeOptions = [
    'Web App', 'Full Stack', 'Machine Intelligence', 'UI/UX Design', 'System Design', 'Other'
  ];

  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-bg-page transition-colors duration-300 mt-6 py-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 grayscale"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-6 md:p-12 lg:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl">
          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main leading-tight tracking-tighter uppercase mb-8">
              {title}
            </h1>
            <div className="space-y-4">
              <p className="text-text-muted font-mono uppercase tracking-widest text-sm">Reach out directly</p>
              <a href={`mailto:${contactEmail}`} className="text-2xl font-bold text-brand-primary hover:underline">
                {contactEmail}
              </a>
            </div>
          </div>

          <div className="bg-navbar-bg/80 backdrop-blur-md p-8 rounded-3xl border border-border-subtle shadow-2xl">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in">
                <CheckCircle2 size={64} className="text-brand-primary mb-4" />
                <h2 className="text-2xl font-bold text-text-main mb-2">Request Transmitted</h2>
                <p className="text-text-muted">Architecture specs received. I'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-text-main mb-8">{mainMessage}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-text-main font-bold uppercase text-[10px] tracking-widest">Name</Label>
                      <Input id="name" name="name" className="bg-bg-page/50 border-border-subtle" placeholder="Gautham Sudheer" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-text-main font-bold uppercase text-[10px] tracking-widest">Email</Label>
                      <Input id="email" name="email" type="email" className="bg-bg-page/50 border-border-subtle" placeholder="name@domain.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-text-main font-bold uppercase text-[10px] tracking-widest">Project Intent</Label>
                    <Textarea id="message" name="message" className="min-h-[100px] bg-bg-page/50 border-border-subtle" placeholder="Describe the architectural needs..." value={formData.message} onChange={handleChange} required />
                  </div>

                  <div className="space-y-4">
                    <p className="text-text-main font-bold uppercase text-[10px] tracking-widest">I'm looking for...</p>
                    <div className="grid grid-cols-2 gap-3">
                      {projectTypeOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.replace(/\s/g, '-').toLowerCase()}
                            checked={formData.projectType.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                          />
                          <Label htmlFor={option.replace(/\s/g, '-').toLowerCase()} className="text-xs font-medium text-text-muted">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-white font-black uppercase tracking-widest rounded-xl text-md transition-all flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : null}
                    {status === 'loading' ? "Processing..." : "Send Architecture Request"}
                  </Button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-xs font-bold text-center uppercase tracking-tighter">Transmission failed. Please try again or email directly.</p>
                  )}
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};