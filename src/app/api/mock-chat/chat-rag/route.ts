// app/api/chat-rag/route.ts
import { NextResponse } from 'next/server';
import { ragDocuments } from '@/app/lib/ragDocuments';

// Only import and use Gemini if API key is available
let genAI: any = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  } catch (error) {
    console.warn('Google Generative AI package not installed. Install with: npm install @google/generative-ai');
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, industry } = body;

    if (!message || !industry) {
      return NextResponse.json({ 
        error: 'Message and industry are required' 
      }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    // Get relevant documents for the industry
    const industryDocs = ragDocuments[industry as keyof typeof ragDocuments];
    if (!industryDocs) {
      return NextResponse.json({ 
        error: 'Invalid industry' 
      }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    // Check if Gemini is configured
    if (!genAI) {
      console.log('Gemini not configured, using fallback responses');
      // Return a simulated response if Gemini isn't configured
      return NextResponse.json({ 
        reply: generateFallbackResponse(message, industry, industryDocs),
        sources: ['simulated']
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    // Combine all documents into context
    const context = industryDocs.documents
      .map(doc => `[${doc.category}]: ${doc.content}`)
      .join('\n\n');

    // Enhanced prompt for better conversational flow
    const prompt = `You are a helpful AI assistant for ${industryDocs.companyName}. 
    
    Your role:
    - Answer customer questions using the knowledge base below
    - Be conversational, friendly, and helpful like ChatGPT or Claude
    - For greetings (hi, hello, hey), respond warmly and mention how you can help with ${industry} services
    - Focus on converting leads and booking services when appropriate
    - If information isn't in the knowledge base, politely say you'll check with the team
    - Keep responses conversational but informative
    
    Knowledge Base:
    ${context}
    
    Customer Message: ${message}
    
    Response (be natural and conversational):`;

    try {
      // Generate response with Gemini 2.0 Flash
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const reply = response.text();

      // Determine which sources were likely used based on the message
      const sources = determineRelevantSources(message, industryDocs.documents);

      return NextResponse.json({ 
        reply,
        sources
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      
      // Fallback to simulated response if Gemini fails
      return NextResponse.json({ 
        reply: generateFallbackResponse(message, industry, industryDocs),
        sources: ['fallback'],
        warning: 'Using fallback response due to API error'
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

  } catch (error) {
    console.error('API error:', error);
    
    // Always return JSON, even on error
    return NextResponse.json({ 
      reply: "I'm having trouble connecting right now, but I'm still here to help! What specific information are you looking for?",
      sources: ['offline'],
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

// Helper function to determine relevant sources
function determineRelevantSources(message: string, documents: any[]): string[] {
  const msg = message.toLowerCase();
  const sources: string[] = [];
  
  documents.forEach(doc => {
    const content = doc.content.toLowerCase();
    const category = doc.category;
    
    // Check if message keywords match document content
    if (
      (category === 'pricing' && (msg.includes('price') || msg.includes('cost') || msg.includes('how much'))) ||
      (category === 'services' && (msg.includes('service') || msg.includes('what do you') || msg.includes('offer'))) ||
      (category === 'booking' && (msg.includes('book') || msg.includes('schedule') || msg.includes('appointment'))) ||
      (category === 'availability' && (msg.includes('when') || msg.includes('hours') || msg.includes('available'))) ||
      (content.includes(msg.split(' ').filter(w => w.length > 3).join(' ')))
    ) {
      sources.push(category);
    }
  });
  
  return sources.length > 0 ? sources : ['general'];
}

// Enhanced fallback response generator
function generateFallbackResponse(message: string, industry: string, industryDocs: any): string {
  const msg = message.toLowerCase().trim();
  
  // Handle greetings first
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
  const isGreeting = greetings.some(greeting => 
    msg === greeting || 
    msg.startsWith(greeting + ' ') || 
    msg.startsWith(greeting + '!')
  );
  
  if (isGreeting) {
    const greetingResponses = {
      plumber: `Hello! Great to chat with you. I'm the AI assistant for ${industryDocs.companyName}. I can help with emergency plumbing services, pricing information, scheduling repairs, and answering any plumbing questions you have. We offer 24/7 emergency service with fast response times. What can I help you with today?`,
      lawfirm: `Hi there! Nice to meet you. I'm here to help with ${industryDocs.companyName}. I can provide information about our legal services, schedule free consultations, help evaluate your case, and answer questions about personal injury law. We work on contingency, so there are no fees unless we win. How can I assist you today?`,
      gym: `Hey! Welcome to ${industryDocs.companyName}'s chat. I'm excited to help you with your fitness journey! I can provide membership information, class schedules, personal training details, and help you get started with a free trial. We have some great specials running right now. What are your fitness goals?`,
      marketing: `Hi! Great to connect with you. I'm the AI assistant for ${industryDocs.companyName}. I can help with information about our digital marketing services, share case studies, provide pricing details, and schedule strategy sessions. We specialize in helping businesses grow with proven strategies. What marketing challenges can I help you solve?`
    };
    return greetingResponses[industry as keyof typeof greetingResponses] || `Hello! I'm here to help with ${industryDocs.companyName} services. How can I assist you today?`;
  }
  
  // Find relevant document based on keywords
  for (const doc of industryDocs.documents) {
    const content = doc.content.toLowerCase();
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      if (doc.category === 'pricing') {
        // Extract first few sentences about pricing
        const sentences = doc.content.split('.').slice(0, 2).join('.');
        return sentences + " Would you like me to provide more specific pricing details for your needs?";
      }
    }
    
    if (msg.includes('book') || msg.includes('schedule') || msg.includes('appointment')) {
      if (doc.category === 'booking') {
        const sentences = doc.content.split('.').slice(0, 2).join('.');
        return sentences + " What day and time works best for you?";
      }
    }
    
    if (msg.includes('emergency') || msg.includes('urgent')) {
      if (doc.category === 'availability' && industry === 'plumber') {
        return "We offer 24/7 emergency service with guaranteed 45-minute response time! I can dispatch a technician immediately. What's your address and what type of emergency are you experiencing?";
      }
    }
    
    if (msg.includes('service') || msg.includes('what do you') || msg.includes('help')) {
      if (doc.category === 'services') {
        const sentences = doc.content.split('.').slice(0, 2).join('.');
        return sentences + " What specific service are you most interested in?";
      }
    }
  }
  
  // Enhanced default responses by industry
  const defaultResponses = {
    plumber: `I'm here to help with all your plumbing needs at ${industryDocs.companyName}! Whether it's emergency repairs, routine maintenance, installations, or just getting a quote, I can assist you. We're available 24/7 for emergencies. What plumbing issue can I help you with?`,
    lawfirm: `I'm here to help with ${industryDocs.companyName}'s legal services. We specialize in personal injury cases and offer free consultations with no fees unless we win your case. I can help evaluate your situation, schedule a consultation, or answer questions about our services. What brings you here today?`,
    gym: `Welcome to ${industryDocs.companyName}! I'm here to help you achieve your fitness goals. Whether you're looking for membership information, want to try our classes, need personal training, or just want to tour our facility, I can help get you started. What aspect of fitness are you most interested in?`,
    marketing: `I'm here to help grow your business with ${industryDocs.companyName}'s digital marketing expertise! Whether you need SEO, PPC advertising, social media marketing, or a complete digital strategy, I can provide information and schedule a consultation. What marketing challenges is your business facing?`
  };
  
  return defaultResponses[industry as keyof typeof defaultResponses] || `I'd be happy to help you with ${industryDocs.companyName} services. Could you tell me more about what you're looking for?`;
}