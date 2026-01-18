'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function AuditForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        website: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append("access_key", "a9e80fab-4da4-44c6-b31f-3369557abdbe");
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("business_name", formData.businessName);
        submitData.append("website", formData.website);
        submitData.append("message", formData.message);
        submitData.append("subject", `New Lead from ${formData.businessName}`);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submitData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Thanks! We will be in touch shortly.");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    website: '',
                    message: '',
                });
            } else {
                alert("Error: " + data.message);
            }
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass-card p-8 md:p-10 cyber-glow">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    <span className="gradient-text">We will respond within 24 hours</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300">
                                Name *
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
                                placeholder="John Smith"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
                                placeholder="john@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                                Phone *
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
                                placeholder="(555) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="businessName" className="text-sm font-medium text-gray-300">
                                Business Name *
                            </label>
                            <input
                                id="businessName"
                                name="businessName"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
                                placeholder="Your Business"
                                value={formData.businessName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="website" className="text-sm font-medium text-gray-300">
                            Business Website
                        </label>
                        <input
                            id="website"
                            name="website"
                            type="url"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
                            placeholder="https://yourbusiness.com"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300">
                            How can we help? *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors resize-none"
                            placeholder="Tell us about where you're wasting time and money the most..."
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 group px-8 py-4 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg hover:scale-[1.02] transition-transform duration-200 shadow-xl disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Book Free Call
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
