'use client';

import { useState, useRef, useEffect } from 'react';

interface PersonaPlexDemoProps {
  maxWidth?: string;
  className?: string;
}

type AgentType = 'roofing-lead-qualifier' | 'appointment-setter' | null;

interface AgentOption {
  id: AgentType & string;
  label: string;
  contextPlaceholder: string;
}

const AGENT_OPTIONS: AgentOption[] = [
  {
    id: 'roofing-lead-qualifier',
    label: 'Lead Qualification',
    contextPlaceholder:
      'e.g., Referred by Meta ads, roof damaged in recent storm...',
  },
  {
    id: 'appointment-setter',
    label: 'Appointment Setter',
    contextPlaceholder:
      'e.g., Scheduling a free roof inspection, referred by neighbor...',
  },
];

const INDUSTRIES = [
  'Roofing',
  'HVAC',
  'Plumbing',
  'Solar',
  'Real Estate',
  'Insurance',
  'Healthcare',
  'Other',
];

const API_ENDPOINT = 'https://personaplex-receptionist.fly.dev/api/demo-call';

export default function PersonaPlexDemo({
  maxWidth = '100%',
  className = '',
}: PersonaPlexDemoProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);
  const [industry, setIndustry] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [context, setContext] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  // Scroll form into view on mobile when agent is selected
  useEffect(() => {
    if (selectedAgent && formRef.current) {
      const timeout = setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [selectedAgent]);

  const currentAgent = AGENT_OPTIONS.find((a) => a.id === selectedAgent);

  const handleAgentSelect = (agentId: AgentType) => {
    setSelectedAgent(agentId);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleBack = () => {
    setSelectedAgent(null);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (!phone.trim() || !selectedAgent) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim(),
          name: name.trim(),
          agentType: selectedAgent,
          context: context.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || `Request failed with status ${res.status}`
        );
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong'
      );
    }
  };

  const expanded = selectedAgent !== null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

.pp-wrapper {
  font-family: 'Inter', sans-serif;
  color: #c8d6e5;
  position: relative;
  overflow: hidden;
}

.pp-hero {
  background: linear-gradient(135deg, #0a0e27 0%, #141b3d 50%, #0a0e27 100%);
  padding: 60px 24px 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.pp-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
  animation: pp-subtle-shift 20s ease-in-out infinite;
}

@keyframes pp-subtle-shift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-2%, -1%); }
}

.pp-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 100px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 500;
  color: #a78bfa;
  margin-bottom: 24px;
  position: relative;
}

.pp-hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a78bfa;
  animation: pp-badge-pulse 2s ease-in-out infinite;
}

@keyframes pp-badge-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.pp-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 16px;
  position: relative;
}

.pp-hero-sub {
  font-size: 16px;
  color: #7c8db5;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
  position: relative;
}

.pp-dotted-number {
  font-family: 'Playfair Display', serif;
  font-size: 180px;
  font-weight: 700;
  line-height: 1;
  background: radial-gradient(circle, #0a0e27 2.2px, transparent 2.2px);
  background-size: 9px 9px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: absolute;
  opacity: 0.08;
  user-select: none;
  pointer-events: none;
}

.pp-dotted-1 {
  top: 10px;
  left: 30px;
  color: rgba(99, 102, 241, 0.15);
  -webkit-text-fill-color: rgba(99, 102, 241, 0.15);
}

.pp-dotted-2 {
  top: 10px;
  right: 30px;
  color: rgba(168, 85, 247, 0.15);
  -webkit-text-fill-color: rgba(168, 85, 247, 0.15);
}

.pp-steps {
  display: flex;
  gap: 0;
  padding: 32px 24px;
  background: linear-gradient(180deg, #0d1229 0%, #0a0e27 100%);
  min-height: 420px;
}

.pp-step-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.pp-step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
}

.pp-step-1 {
  flex: 1.2;
  margin-right: 16px;
}

.pp-step-1.pp-collapsed {
  flex: 0.4;
}

.pp-step-2 {
  flex: 0.3;
  opacity: 0.4;
  margin-left: 0;
}

.pp-step-2.pp-expanded {
  flex: 1.5;
  opacity: 1;
}

.pp-step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 16px;
}

.pp-step-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.pp-step-card p {
  font-size: 13px;
  color: #7c8db5;
  margin-bottom: 20px;
  line-height: 1.5;
}

.pp-agent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pp-agent-tag {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #c8d6e5;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.pp-agent-tag:hover {
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.08);
  color: #ffffff;
}

.pp-agent-tag.pp-selected {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.15);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
}

.pp-orb-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.pp-orb {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #6366f1, #8b5cf6 50%, #a78bfa 100%);
  position: relative;
  animation: pp-orb-float 6s ease-in-out infinite;
}

.pp-orb::before {
  content: '';
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%);
  animation: pp-orb-glow 3s ease-in-out infinite;
}

.pp-orb::after {
  content: '';
  position: absolute;
  top: 15%;
  left: 20%;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  filter: blur(8px);
}

@keyframes pp-orb-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pp-orb-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.pp-form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pp-field-label {
  font-size: 12px;
  font-weight: 600;
  color: #7c8db5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  display: block;
}

.pp-field-input,
.pp-field-select,
.pp-field-textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

.pp-field-input::placeholder,
.pp-field-textarea::placeholder {
  color: #4a5578;
}

.pp-field-input:focus,
.pp-field-select:focus,
.pp-field-textarea:focus {
  border-color: rgba(99, 102, 241, 0.5);
  background: rgba(99, 102, 241, 0.05);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.pp-field-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237c8db5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.pp-field-select option {
  background: #0a0e27;
  color: #ffffff;
}

.pp-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.pp-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pp-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.pp-back-link {
  font-size: 13px;
  color: #7c8db5;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  padding: 0;
}

.pp-back-link:hover {
  color: #ffffff;
}

.pp-back-link svg {
  width: 14px;
  height: 14px;
}

.pp-cta-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

.pp-cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.pp-cta-btn:active {
  transform: translateY(0);
}

.pp-cta-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pp-status-msg {
  font-size: 13px;
  text-align: center;
  padding: 12px 24px;
}

.pp-status-success {
  color: #34d399;
}

.pp-status-error {
  color: #f87171;
}

.pp-status-loading {
  color: #a78bfa;
}

/* Responsive */
@media (max-width: 768px) {
  .pp-hero {
    padding: 40px 20px 36px;
  }

  .pp-hero h1 {
    font-size: 30px;
  }

  .pp-hero-sub {
    font-size: 14px;
  }

  .pp-dotted-number {
    font-size: 120px;
  }

  .pp-steps {
    flex-direction: column;
    padding: 20px 16px;
    gap: 16px;
    min-height: auto;
  }

  .pp-step-1 {
    margin-right: 0;
  }

  .pp-step-1.pp-collapsed {
    flex: none;
  }

  .pp-step-2 {
    margin-left: 0;
  }

  .pp-step-2.pp-expanded {
    flex: none;
  }

  .pp-step-card {
    padding: 24px;
  }

  .pp-field-row {
    grid-template-columns: 1fr;
  }

  .pp-bottom-bar {
    flex-direction: column;
    gap: 16px;
  }

  .pp-cta-btn {
    width: 100%;
    text-align: center;
  }

  .pp-orb-container {
    margin-top: 16px;
  }

  .pp-orb {
    width: 60px;
    height: 60px;
  }

  .pp-hero-badge {
    font-size: 12px;
    padding: 6px 16px;
  }
}
`,
        }}
      />
      <div
        className={`pp-wrapper ${className}`}
        style={{ maxWidth, margin: '0 auto', borderRadius: '20px', overflow: 'hidden' }}
      >
        {/* Hero Section */}
        <div className="pp-hero">
          <span className="pp-dotted-number pp-dotted-1">1</span>
          <span className="pp-dotted-number pp-dotted-2">2</span>

          <div className="pp-hero-badge">
            <span className="pp-hero-badge-dot" />
            Live Demo
          </div>

          <h1>Try Our Live Demo</h1>
          <p className="pp-hero-sub">
            Select an agent type, fill in a few details, and receive a live AI
            call in seconds.
          </p>
        </div>

        {/* Step Cards */}
        <div className="pp-steps">
          {/* Step 1: Agent Selection */}
          <div
            className={`pp-step-card pp-step-1${expanded ? ' pp-collapsed' : ''}`}
          >
            <div className="pp-step-number">1</div>
            <h3>Choose Agent Type</h3>
            <p>Select the type of AI agent for your demo call</p>
            <div className="pp-agent-tags">
              {AGENT_OPTIONS.map((agent) => (
                <button
                  key={agent.id}
                  className={`pp-agent-tag${selectedAgent === agent.id ? ' pp-selected' : ''}`}
                  onClick={() => handleAgentSelect(agent.id)}
                  type="button"
                >
                  {agent.label}
                </button>
              ))}
            </div>
            {!expanded && (
              <div className="pp-orb-container">
                <div className="pp-orb" />
              </div>
            )}
          </div>

          {/* Step 2: Form */}
          <div
            ref={formRef}
            className={`pp-step-card pp-step-2${expanded ? ' pp-expanded' : ''}`}
          >
            <div className="pp-step-number">2</div>
            <h3>Your Details</h3>
            <p>
              {expanded
                ? 'Fill in your info to receive the demo call'
                : 'Select an agent type first'}
            </p>
            {expanded && (
              <div className="pp-form-fields">
                <div>
                  <label className="pp-field-label">Industry</label>
                  <select
                    className="pp-field-select"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pp-field-row">
                  <div>
                    <label className="pp-field-label">Name</label>
                    <input
                      type="text"
                      className="pp-field-input"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="pp-field-label">Phone</label>
                    <input
                      type="tel"
                      className="pp-field-input"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="pp-field-label">Context</label>
                  <textarea
                    className="pp-field-textarea"
                    placeholder={currentAgent?.contextPlaceholder ?? ''}
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Message */}
        {status === 'success' && (
          <div className="pp-status-msg pp-status-success">
            You will receive a call shortly from{' '}
            <strong>+1 (650) 667-7016</strong>
          </div>
        )}
        {status === 'error' && (
          <div className="pp-status-msg pp-status-error">
            {errorMessage || 'Something went wrong. Please try again.'}
          </div>
        )}
        {status === 'loading' && (
          <div className="pp-status-msg pp-status-loading">
            Initiating your call...
          </div>
        )}

        {/* Bottom Bar */}
        {expanded && (
          <div className="pp-bottom-bar">
            <button
              className="pp-back-link"
              onClick={handleBack}
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Agent
            </button>
            <button
              className="pp-cta-btn"
              onClick={handleSubmit}
              disabled={!phone.trim() || status === 'loading'}
              type="button"
            >
              {status === 'loading' ? 'Calling...' : 'Get a call'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
