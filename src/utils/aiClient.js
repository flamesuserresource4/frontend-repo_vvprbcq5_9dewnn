const USE_AI = import.meta.env.VITE_ENABLE_AI === 'true' && !!import.meta.env.VITE_AI_API_URL

const mockQuestions = [
  'Tell me about yourself and your experience relevant to this role.',
  'Walk me through a challenging project you led. What was your approach?',
  'How do you handle tight deadlines and competing priorities?',
  'Explain a time you optimized performance in your code.',
  'Implement a function to debounce another function. What are the tradeoffs?',
]

export async function fetchNextQuestion(role) {
  if (!USE_AI) {
    const q = mockQuestions[Math.floor(Math.random() * mockQuestions.length)]
    return `${role ? `[${role}] ` : ''}${q}`
  }
  const res = await fetch(`${import.meta.env.VITE_AI_API_URL}/question?role=${encodeURIComponent(role||'')}`)
  const data = await res.json()
  return data.question || mockQuestions[0]
}

export async function fetchFollowUp(question) {
  if (!USE_AI) {
    return `Can you elaborate more on: "${question}"?`
  }
  const res = await fetch(`${import.meta.env.VITE_AI_API_URL}/followup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question }) })
  const data = await res.json()
  return data.question
}
