'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, XCircle } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function AuditForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const submitData = new FormData();
        submitData.append("access_key", "a9e80fab-4da4-44c6-b31f-3369557abdbe");
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("message", formData.message);
        submitData.append("subject", `New Lead from ${formData.name}`);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submitData
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status === 'error') setStatus('idle');
    };

    if (status === 'success') {
        return (
            <div className="w-full max-w-2xl mx-auto">
                <div className="glass-card p-8 md:p-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-brand-primary">
                        Message Sent!
                    </h2>
                    <p className="text-slate-600 mb-8">
                        Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="px-6 py-3 rounded-xl border border-slate-200 text-brand-primary font-semibold hover:bg-slate-50 transition-colors"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass-card p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-8 text-center text-brand-primary">
                    We will respond within 24 hours
                </h2>

                {status === 'error' && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                Name *
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                                placeholder="John Smith"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                                placeholder="john@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-slate-700">
                            How can we help? *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors resize-none"
                            placeholder="Tell us about where you're wasting time and money the most..."
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full mt-4 group px-8 py-4 rounded-xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-sm disabled:opacity-70 disabled:hover:bg-brand-accent flex items-center justify-center gap-2"
                    >
                        {status === 'submitting' ? (
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
