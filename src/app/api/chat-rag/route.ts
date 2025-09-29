// app/api/chat-rag/route.ts
import { NextResponse } from 'next/server';
import { companyData } from '@/app/lib/mockData';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define valid industry keys
type Industry = 'plumber' | 'lawfirm' | 'gym' | 'marketing';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      message, 
      industry, 
      isWelcomeMessage = false, 
      isFallback = false 
    }: { 
      message: string; 
      industry: Industry; 
      isWelcomeMessage?: boolean;
      isFallback?: boolean;
    } = body;

    if (!message || !industry || !companyData[industry]) {
      return NextResponse.json({ error: 'Invalid request: message and industry required' }, { status: 400 });
    }

    // Enhanced keyword-based retrieval with semantic understanding
    const retrieveRelevantData = (query: string, industry: Industry, isWelcome: boolean = false, isFallback: boolean = false) => {
      const data = companyData[industry];
      const queryLower = query.toLowerCase();
      const relevantItems: string[] = [];
      const sources: string[] = [];

      // Always include basic company information
      relevantItems.push(
        `Company: ${data.companyName}\nDescription: ${data.description}\nContact: Phone: ${data.contact.phone}, Email: ${data.contact.email}, Address: ${data.contact.address}`
      );
      sources.push(`${data.companyName} Company Information`);

      // For welcome messages, include key highlights
      if (isWelcome) {
        relevantItems.push("This is a welcome message for a new visitor to the website. Be warm, friendly, and informative about what you can help with.");
        
        // Include top services
        const topServices = data.services.slice(0, 2);
        topServices.forEach(service => {
          relevantItems.push(`Key Service: ${service.name} - ${service.description} (${service.price})`);
          sources.push(service.name);
        });
        
        // Include key FAQ
        if (data.faqs.length > 0) {
          relevantItems.push(`Key FAQ: ${data.faqs[0].question} - ${data.faqs[0].answer}`);
          sources.push(data.faqs[0].question);
        }
        
        return { context: relevantItems.join('\n\n'), sources };
      }

      // For fallback messages
      if (isFallback) {
        relevantItems.push("There was a technical issue. Provide a helpful recovery message explaining the temporary problem and what you can help with.");
        return { context: relevantItems.join('\n\n'), sources };
      }

      // Search through all services with enhanced matching
      data.services.forEach(service => {
        const serviceText = `${service.name} ${service.description}`.toLowerCase();
        
        // Enhanced keyword matching
        const keywords = [
          'price', 'cost', 'how much', 'pricing', 'fee', 'charge', 'expensive',
          'service', 'help', 'offer', 'provide', 'do you',
          'emergency', 'urgent', 'asap', 'now', 'immediate',
          'book', 'schedule', 'appointment', 'availability', 'when',
          'consultation', 'estimate', 'quote', 'free',
          'hours', 'open', 'time', 'operation'
        ];

        const queryWords = queryLower.split(' ');
        const hasRelevantKeyword = keywords.some(keyword => queryLower.includes(keyword));
        const hasServiceMatch = queryWords.some(word => serviceText.includes(word));
        
        if (hasRelevantKeyword || hasServiceMatch || serviceText.includes(queryLower)) {
          relevantItems.push(
            `Service: ${service.name}\nPrice: ${service.price}\nDescription: ${service.description}`
          );
          sources.push(service.name);
        }
      });

      // Search through FAQs with enhanced matching
      data.faqs.forEach(faq => {
        const faqText = `${faq.question} ${faq.answer}`.toLowerCase();
        const queryWords = queryLower.split(' ');
        const hasMatch = queryWords.some(word => word.length > 2 && faqText.includes(word));
        
        if (hasMatch || faqText.includes(queryLower)) {
          relevantItems.push(`FAQ: ${faq.question}\nAnswer: ${faq.answer}`);
          sources.push(faq.question);
        }
      });

      // Add hours information for time-related queries
      if (queryLower.includes('hours') || queryLower.includes('operation') || queryLower.includes('open') || queryLower.includes('time')) {
        const hoursInfo = getHoursInfo(industry);
        relevantItems.push(hoursInfo);
        sources.push(`${data.companyName} Hours of Operation`);
      }

      // Add emergency info for urgent queries
      if (queryLower.includes('emergency') || queryLower.includes('urgent') || queryLower.includes('asap') || queryLower.includes('now')) {
        const emergencyInfo = getEmergencyInfo(industry);
        if (emergencyInfo) {
          relevantItems.push(emergencyInfo);
          sources.push(`${data.companyName} Emergency Services`);
        }
      }

      // If no specific matches, include all services and FAQs for comprehensive response
      if (relevantItems.length === 1) { // Only company info
        data.services.forEach(service => {
          relevantItems.push(
            `Service: ${service.name}\nPrice: ${service.price}\nDescription: ${service.description}`
          );
          sources.push(service.name);
        });
        
        data.faqs.forEach(faq => {
          relevantItems.push(`FAQ: ${faq.question}\nAnswer: ${faq.answer}`);
          sources.push(faq.question);
        });
      }

      return { context: relevantItems.join('\n\n'), sources };
    };

    const { context, sources } = retrieveRelevantData(message, industry, isWelcomeMessage, isFallback);

    // Enhanced prompt for Gemini API
    const prompt = `
You are a friendly customer service representative for ${companyData[industry].companyName}. 

**Your Role**: 
- Provide helpful, direct answers in a conversational tone
- Keep responses concise and focused (1-3 sentences typically)
- Be natural and friendly without being overly formal
- Don't repeat company information unnecessarily
- Focus on answering the specific question asked

**Context Information**:
${context}

**User Query**: "${message}"

**Response Guidelines**:
1. **Be Direct**: Answer the question directly without unnecessary introductions
2. **Stay Conversational**: Write like you're having a friendly chat
3. **Be Concise**: Keep it brief but helpful
4. **Include Action Items**: When relevant, suggest next steps (call, schedule, etc.)
5. **Don't Over-Explain**: Just answer what they asked

${isWelcomeMessage ? '**Special Instructions**: This is a welcome message. Be warm but brief. Mention key services and how you can help.' : ''}

${isFallback ? '**Special Instructions**: Briefly acknowledge the technical issue and offer to help.' : ''}

**Response**: Provide a natural, friendly response (typically 1-3 sentences).
`;

    // Call Gemini API
    const geminiResponse = await callGeminiAPI(prompt);

    return NextResponse.json({
      reply: geminiResponse,
      sources: sources.slice(0, 5) // Limit sources to avoid overwhelming the UI
    });
  } catch (error) {
    console.error('RAG API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// Helper function to get hours information
function getHoursInfo(industry: Industry): string {
  const hoursMap = {
    plumber: 'Hours: Mike\'s Emergency Plumbing is available 24/7 for emergency services with a 45-minute response time guarantee. Non-emergency services are scheduled Monday through Sunday, 8 AM to 6 PM.',
    lawfirm: 'Hours: Johnson & Associates operates Monday through Friday, 9 AM to 5 PM. Free consultations can be scheduled during these hours, and we also offer evening appointments by request.',
    gym: 'Hours: Elite Fitness Center is open Monday through Friday, 5 AM to 10 PM, and Saturday through Sunday, 7 AM to 8 PM. Staff is available during all operating hours.',
    marketing: 'Hours: GrowthMax Digital operates Monday through Friday, 9 AM to 6 PM. Strategy sessions and consultations can be scheduled during these hours, with some flexibility for client needs.'
  };
  return hoursMap[industry];
}

// Helper function to get emergency information
function getEmergencyInfo(industry: Industry): string | null {
  const emergencyMap = {
    plumber: 'Emergency Services: Available 24/7 with guaranteed 45-minute response time. Emergency service calls start at $150 but this fee is waived when you proceed with the repair. We handle burst pipes, major leaks, sewer backups, and all plumbing emergencies.',
    lawfirm: 'Urgent Legal Matters: While we don\'t handle true emergencies, we offer expedited consultations for time-sensitive legal matters. Call our main line and mention it\'s urgent - we can often arrange same-day or next-day consultations.',
    gym: null, // Gyms typically don't have emergency services
    marketing: 'Urgent Marketing Needs: For time-sensitive marketing crises or opportunities, we offer emergency consultation calls. While not 24/7, we can often respond within a few hours during business days for critical situations.'
  };
  return emergencyMap[industry];
}

// Real Gemini API call with enhanced error handling
async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    // Get the Gemini model (using gemini-2.5-flash-lite)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        temperature: 0.7, // Balanced creativity and consistency
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 300, // Keep responses concise
      },
    });

    // Generate content with the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    if (!responseText || responseText.trim().length === 0) {
      throw new Error('Empty response from Gemini API');
    }

    // Clean up the response
    const cleanedResponse = responseText.trim();
    
    console.log('Gemini API Success:', { 
      promptLength: prompt.length, 
      responseLength: cleanedResponse.length,
      response: cleanedResponse.substring(0, 100) + '...'
    });
    
    return cleanedResponse;
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Provide more specific error handling
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Gemini API key configuration error');
      } else if (error.message.includes('quota')) {
        throw new Error('Gemini API quota exceeded');
      } else if (error.message.includes('safety')) {
        throw new Error('Content filtered by Gemini safety settings');
      }
    }
    
    throw new Error(`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}