import { Status } from './types';

type Outcome = { status: Status; confidence: number; summary: string; limitations: string; claims?: string[]; evidence: [] };

export async function verifyText(input: string, type: 'TEXT' | 'URL'): Promise<Outcome> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { status: 'ANALYSIS_UNAVAILABLE', confidence: 0, summary: 'No fact-verification provider is configured yet. Your submission was accepted, but no verdict was generated.', limitations: 'Set GEMINI_API_KEY and connect approved retrieval sources before relying on text verification.', evidence: [] };
  const prompt = `You are a careful fact-checking assistant. Analyze this ${type === 'URL' ? 'URL' : 'claim'}: ${input}\nReturn ONLY valid JSON with: status (SUPPORTED|CONTRADICTED|MIXED_EVIDENCE|INSUFFICIENT_EVIDENCE), confidence (0-100), summary, limitations, claims (array). Never invent sources or claim certainty without independent evidence.`;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } }) });
    if (!res.ok) throw new Error('Provider request failed');
    const json = await res.json();
    const parsed = JSON.parse(json.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}');
    const allowed: Status[] = ['SUPPORTED', 'CONTRADICTED', 'MIXED_EVIDENCE', 'INSUFFICIENT_EVIDENCE'];
    return { status: allowed.includes(parsed.status) ? parsed.status : 'INSUFFICIENT_EVIDENCE', confidence: Math.max(0, Math.min(100, Number(parsed.confidence) || 0)), summary: String(parsed.summary || 'The provider returned no usable summary.'), limitations: String(parsed.limitations || 'AI output requires independent source review.'), claims: Array.isArray(parsed.claims) ? parsed.claims.map(String) : [], evidence: [] };
  } catch {
    return { status: 'ANALYSIS_UNAVAILABLE', confidence: 0, summary: 'The configured verification provider could not be reached. No verdict was generated.', limitations: 'Retry later and confirm provider configuration.', evidence: [] };
  }
}

export function inspectMedia(file: File): Outcome {
  return { status: 'ANALYSIS_UNAVAILABLE', confidence: 0, summary: `${file.name} (${Math.round(file.size / 1024)} KB) was validated as an upload, but a media-detection provider is not configured.`, limitations: 'A missing detector result cannot establish authenticity. Configure an image, video, or audio detection provider before treating this as an audit.', evidence: [] };
}
