import Groq from 'groq-sdk';

export interface GeneratedPuzzle {
question: string;
hint: string;
answer: string;
}

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

export async function generatePuzzle(
roomCode: string
): Promise<GeneratedPuzzle[]> {
try {
const completion =
await groq.chat.completions.create({
model: 'llama-3.3-70b-versatile',
messages: [
{
role: 'system',
content:
'You generate cybersecurity puzzles. Return ONLY valid JSON.',
},
{
role: 'user',
content: `
Generate EXACTLY 5 UNIQUE cybersecurity challenges.

Topics:

1. Phishing
2. Malware
3. Networking
4. Cryptography
5. Incident Response

Return ONLY JSON array:

[
{
"question":"",
"hint":"",
"answer":""
}
]

Rules:

* One category per question
* No repeated categories
* Answer must be one word or two words maximum
* No markdown
* No explanation
  `,
  },
  ],
  temperature: 0.8,
  });

  const content =
  completion.choices[0]?.message?.content ?? '';

  const cleanContent = content
  .replace(/`json/g, '')
      .replace(/`/g, '')
  .trim();

  const parsed = JSON.parse(cleanContent);

  return parsed;
  } catch (error) {
  console.error('Groq Error:', error);

  return [
  {
  question:
  'What attack uses fake emails to steal credentials?',
  hint: 'Email scam',
  answer: 'Phishing',
  },
  {
  question:
  'What type of malware demands payment?',
  hint: 'Cryptocurrency often requested',
  answer: 'Ransomware',
  },
  {
  question:
  'What device filters network traffic?',
  hint: 'Network security appliance',
  answer: 'Firewall',
  },
  {
  question:
  'What protects data by converting it into unreadable form?',
  hint: 'Cryptography',
  answer: 'Encryption',
  },
  {
  question:
  'Which incident response phase stops attack spread?',
  hint: 'After identification',
  answer: 'Containment',
  },
  ];
  }
  }
