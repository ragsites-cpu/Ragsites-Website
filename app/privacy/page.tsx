'use client';

import { motion } from 'framer-motion';
import { Outfit, Rubik } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-outfit' });
const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-rubik' });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    title: '1. Introduction',
    content: (
      <>
        <p>
          Ragsites (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{' '}
          <a href="https://ragsites.com" className="text-[#40c9ff] hover:underline">ragsites.com</a>{' '}
          and provides AI-powered automation services for local businesses, including Voice AI
          receptionists and lead generation systems. This Privacy Policy explains how we collect,
          use, disclose, and protect your personal information when you visit our website or use
          our services.
        </p>
        <p className="mt-3">
          By accessing or using our website and services, you agree to the terms of this Privacy
          Policy. If you do not agree, please do not use our website or services.
        </p>
      </>
    ),
  },
  {
    title: '2. Information We Collect',
    content: (
      <>
        <h3 className="text-lg font-medium text-white mt-2 mb-2">2.1 Information You Provide</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Name, email address, phone number, and business information submitted through contact forms, demo requests, or account registration.</li>
          <li>Payment and billing information when you purchase our services.</li>
          <li>Communications you send to us, including support requests and feedback.</li>
        </ul>

        <h3 className="text-lg font-medium text-white mt-6 mb-2">2.2 Information Collected Automatically</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Device information (browser type, operating system, device identifiers).</li>
          <li>Usage data (pages visited, time on page, scroll depth, click behavior, referring URLs).</li>
          <li>IP address and approximate geolocation.</li>
          <li>Voice interaction data when you use our Voice AI demo, including call recordings and transcripts where applicable.</li>
        </ul>

        <h3 className="text-lg font-medium text-white mt-6 mb-2">2.3 Information from Third Parties</h3>
        <p>
          We may receive information from third-party platforms, advertising partners, and
          publicly available sources to supplement the data we collect directly.
        </p>
      </>
    ),
  },
  {
    title: '3. Cookies and Tracking Technologies',
    content: (
      <>
        <p>
          We use cookies, pixels, and similar tracking technologies to analyze website traffic,
          understand user behavior, and improve our services. The following third-party analytics
          and tracking tools are active on our website:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>
            <span className="text-white font-medium">Google Analytics</span> &mdash; Tracks
            website traffic, user demographics, and behavior patterns. Google may use this data
            in accordance with its own privacy policy.
          </li>
          <li>
            <span className="text-white font-medium">Meta Pixel (Facebook)</span> &mdash;
            Tracks conversions from ads, builds targeted audiences, and enables remarketing
            across Meta platforms.
          </li>
          <li>
            <span className="text-white font-medium">Microsoft Clarity</span> &mdash; Records
            session replays, heatmaps, and user interaction data to help us understand how
            visitors use our website.
          </li>
        </ul>
        <p className="mt-3">
          You can manage cookie preferences through your browser settings. Most browsers allow
          you to block or delete cookies, though this may affect website functionality. You may
          also opt out of Google Analytics by installing the{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#40c9ff] hover:underline"
          >
            Google Analytics Opt-Out Browser Add-on
          </a>.
        </p>
      </>
    ),
  },
  {
    title: '4. How We Use Your Information',
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Provide, operate, and maintain our website and services.</li>
          <li>Process transactions and send related communications.</li>
          <li>Respond to your inquiries, support requests, and feedback.</li>
          <li>Personalize your experience and deliver relevant content.</li>
          <li>Analyze usage trends to improve our website and services.</li>
          <li>Send marketing and promotional communications (with your consent where required).</li>
          <li>Detect, prevent, and address fraud, abuse, or technical issues.</li>
          <li>Comply with legal obligations and enforce our terms.</li>
        </ul>
      </>
    ),
  },
  {
    title: '5. Sharing of Information',
    content: (
      <>
        <p>We do not sell your personal information. We may share your data with:</p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>
            <span className="text-white font-medium">Service Providers</span> &mdash;
            Third-party vendors who assist with hosting, analytics, payment processing,
            email delivery, and customer support.
          </li>
          <li>
            <span className="text-white font-medium">AI and Voice Technology Partners</span> &mdash;
            Providers that power our Voice AI systems, including speech-to-text and
            text-to-speech services.
          </li>
          <li>
            <span className="text-white font-medium">Advertising Partners</span> &mdash;
            Platforms such as Meta and Google for ad targeting and conversion measurement.
          </li>
          <li>
            <span className="text-white font-medium">Legal and Compliance</span> &mdash;
            When required by law, regulation, legal process, or governmental request.
          </li>
          <li>
            <span className="text-white font-medium">Business Transfers</span> &mdash;
            In connection with a merger, acquisition, reorganization, or sale of assets.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '6. Data Retention',
    content: (
      <p>
        We retain your personal information for as long as necessary to fulfill the purposes
        outlined in this Privacy Policy, unless a longer retention period is required or
        permitted by law. When we no longer need your information, we will securely delete or
        anonymize it. Specific retention periods vary depending on the type of data and the
        purpose for which it was collected.
      </p>
    ),
  },
  {
    title: '7. Data Security',
    content: (
      <p>
        We implement commercially reasonable technical and organizational measures to protect
        your personal information from unauthorized access, loss, misuse, or alteration.
        However, no method of transmission over the internet or electronic storage is 100%
        secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    title: '8. Your Rights',
    content: (
      <>
        <p>
          Depending on your jurisdiction, you may have the right to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Access and receive a copy of the personal information we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of your personal information.</li>
          <li>Object to or restrict the processing of your data.</li>
          <li>Withdraw consent at any time where processing is based on consent.</li>
          <li>Lodge a complaint with a supervisory authority.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, please contact us at the email address provided below.
        </p>
      </>
    ),
  },
  {
    title: '9. Third-Party Links',
    content: (
      <p>
        Our website may contain links to third-party websites or services that are not
        operated by us. We have no control over and assume no responsibility for the content,
        privacy policies, or practices of any third-party sites or services. We encourage you
        to review the privacy policies of any third-party sites you visit.
      </p>
    ),
  },
  {
    title: '10. Children\u2019s Privacy',
    content: (
      <p>
        Our services are not directed to individuals under the age of 18. We do not knowingly
        collect personal information from children. If we become aware that we have collected
        data from a child without parental consent, we will take steps to delete that
        information promptly.
      </p>
    ),
  },
  {
    title: '11. Changes to This Policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we make changes, we will
        update the &quot;Last updated&quot; date at the top of this page. We encourage you to review
        this Privacy Policy periodically to stay informed about how we are protecting your
        information.
      </p>
    ),
  },
  {
    title: '12. Contact Us',
    content: (
      <>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices,
          please contact us at:
        </p>
        <div className="mt-4 p-5 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white font-medium">Ragsites</p>
          <p className="mt-1">
            Email:{' '}
            <a href="mailto:admin@ragsites.com" className="text-[#40c9ff] hover:underline">
              admin@ragsites.com
            </a>
          </p>
          <p className="mt-1">
            Website:{' '}
            <a href="https://ragsites.com" className="text-[#40c9ff] hover:underline">
              ragsites.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <main className={`min-h-screen bg-black text-white ${outfit.variable} ${rubik.variable}`} style={{ fontFamily: 'var(--font-rubik), sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1e3d]/80 via-black/60 to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#40c9ff]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-[#40c9ff] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Legal
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Last updated: March 2026
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>{section.title}</h2>
              <div className="text-slate-300 leading-relaxed">{section.content}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
