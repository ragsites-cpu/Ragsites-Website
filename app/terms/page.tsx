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
    title: '1. Agreement to Terms',
    content: (
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
          and Ragsites (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) governing your access to and use of the
          website{' '}
          <a href="https://ragsites.com" className="text-[#40c9ff] hover:underline">ragsites.com</a>{' '}
          and all related services, including our AI-powered automation, Voice AI receptionists,
          and lead generation systems (collectively, the &quot;Services&quot;).
        </p>
        <p className="mt-3">
          By accessing or using our Services, you agree to be bound by these Terms. If you do
          not agree to these Terms, you must not use our Services.
        </p>
      </>
    ),
  },
  {
    title: '2. Description of Services',
    content: (
      <>
        <p>
          Ragsites provides AI-powered automation services designed for local businesses. Our
          Services include, but are not limited to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Voice AI receptionists that answer calls, book appointments, and handle customer inquiries 24/7.</li>
          <li>Automated lead generation, qualification, and follow-up systems.</li>
          <li>CRM integrations and workflow automation.</li>
          <li>Custom AI agent development and deployment.</li>
          <li>Website demos and interactive AI experiences.</li>
        </ul>
        <p className="mt-3">
          We reserve the right to modify, suspend, or discontinue any aspect of our Services at
          any time, with or without notice.
        </p>
      </>
    ),
  },
  {
    title: '3. Eligibility',
    content: (
      <p>
        You must be at least 18 years of age and have the legal capacity to enter into a
        binding agreement to use our Services. By using our Services, you represent and warrant
        that you meet these requirements. If you are using our Services on behalf of a
        business or organization, you represent that you have the authority to bind that entity
        to these Terms.
      </p>
    ),
  },
  {
    title: '4. User Accounts',
    content: (
      <>
        <p>
          Some features of our Services may require you to create an account. You are
          responsible for:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Providing accurate, current, and complete information during registration.</li>
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>Notifying us immediately of any unauthorized use of your account.</li>
        </ul>
        <p className="mt-3">
          We reserve the right to suspend or terminate your account if any information provided
          is found to be inaccurate, misleading, or in violation of these Terms.
        </p>
      </>
    ),
  },
  {
    title: '5. Acceptable Use',
    content: (
      <>
        <p>You agree not to use our Services to:</p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Violate any applicable law, regulation, or third-party rights.</li>
          <li>Transmit harmful, threatening, abusive, defamatory, or otherwise objectionable content.</li>
          <li>Attempt to gain unauthorized access to our systems, networks, or data.</li>
          <li>Interfere with or disrupt the integrity or performance of our Services.</li>
          <li>Use automated scripts, bots, or scrapers to access our Services without our express written permission.</li>
          <li>Reverse engineer, decompile, or disassemble any part of our Services.</li>
          <li>Misrepresent your identity or affiliation with any person or entity.</li>
          <li>Use our Voice AI systems for illegal robocalling, spam, or harassment.</li>
        </ul>
      </>
    ),
  },
  {
    title: '6. Intellectual Property',
    content: (
      <>
        <p>
          All content, features, and functionality of our Services &mdash; including but not
          limited to text, graphics, logos, icons, images, audio, video, software, and AI models
          &mdash; are owned by or licensed to Ragsites and are protected by copyright,
          trademark, patent, and other intellectual property laws.
        </p>
        <p className="mt-3">
          You may not reproduce, distribute, modify, create derivative works of, publicly
          display, or otherwise exploit any of our content without our prior written consent.
        </p>
      </>
    ),
  },
  {
    title: '7. Payment Terms',
    content: (
      <>
        <p>
          Certain Services require payment. By purchasing a paid Service, you agree to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Pay all fees associated with your selected plan or service package.</li>
          <li>Provide accurate and complete billing information.</li>
          <li>Authorize us to charge your designated payment method on a recurring basis, if applicable.</li>
        </ul>
        <p className="mt-3">
          All fees are non-refundable unless otherwise stated in a separate written agreement.
          We reserve the right to change our pricing at any time, with reasonable notice provided
          to existing customers.
        </p>
      </>
    ),
  },
  {
    title: '8. Limitation of Liability',
    content: (
      <>
        <p className="uppercase text-xs tracking-wide">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, RAGSITES AND ITS OFFICERS,
          DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
          LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE OF OR INABILITY TO USE OUR SERVICES.
        </p>
        <p className="uppercase text-xs tracking-wide mt-3">
          OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS
          OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO US IN THE TWELVE (12)
          MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
        </p>
      </>
    ),
  },
  {
    title: '9. Disclaimer of Warranties',
    content: (
      <>
        <p className="uppercase text-xs tracking-wide">
          OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
          EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
          WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF
          VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>
        <p className="mt-3">
          While our AI systems are designed to perform reliably, we do not guarantee the
          accuracy, completeness, or reliability of any AI-generated responses, voice
          interactions, or automated actions.
        </p>
      </>
    ),
  },
  {
    title: '10. Indemnification',
    content: (
      <p>
        You agree to indemnify, defend, and hold harmless Ragsites and its officers, directors,
        employees, agents, and affiliates from and against any and all claims, liabilities,
        damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out
        of or relating to your use of our Services, your violation of these Terms, or your
        violation of any rights of a third party.
      </p>
    ),
  },
  {
    title: '11. Termination',
    content: (
      <>
        <p>
          We may suspend or terminate your access to our Services at any time, with or without
          cause, and with or without notice. Upon termination:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>Your right to use our Services will immediately cease.</li>
          <li>We may delete your account and any associated data, subject to applicable data retention obligations.</li>
          <li>Any provisions of these Terms that by their nature should survive termination will remain in effect, including intellectual property, limitation of liability, indemnification, and dispute resolution provisions.</li>
        </ul>
        <p className="mt-3">
          You may terminate your account at any time by contacting us at the email address below.
        </p>
      </>
    ),
  },
  {
    title: '12. Governing Law',
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the
        United States, without regard to its conflict of law provisions. Any disputes arising
        out of or relating to these Terms or our Services shall be resolved through binding
        arbitration or in the courts of competent jurisdiction, as determined by applicable law.
      </p>
    ),
  },
  {
    title: '13. Modifications to Terms',
    content: (
      <p>
        We reserve the right to update or modify these Terms at any time. When we make
        changes, we will update the &quot;Last updated&quot; date at the top of this page. Your
        continued use of our Services after any changes constitutes your acceptance of the
        revised Terms. We encourage you to review these Terms periodically.
      </p>
    ),
  },
  {
    title: '14. Severability',
    content: (
      <p>
        If any provision of these Terms is found to be unenforceable or invalid by a court of
        competent jurisdiction, that provision shall be limited or eliminated to the minimum
        extent necessary, and the remaining provisions shall remain in full force and effect.
      </p>
    ),
  },
  {
    title: '15. Contact Us',
    content: (
      <>
        <p>
          If you have any questions or concerns about these Terms of Service, please contact us
          at:
        </p>
        <div className="mt-4 p-5 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white font-medium">Ragsites</p>
          <p className="mt-1">
            Email:{' '}
            <a href="mailto:ragsites@gmail.com" className="text-[#40c9ff] hover:underline">
              ragsites@gmail.com
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

export default function TermsOfService() {
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
            Terms of Service
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
