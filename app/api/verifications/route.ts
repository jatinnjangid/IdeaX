import { NextRequest, NextResponse } from 'next/server';
import { inspectMedia, verifyText } from '@/lib/verification';
import { getUserId } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
const types = ['TEXT','URL','IMAGE','VIDEO','AUDIO'] as const;
const acceptedMimeTypes: Record<'IMAGE'|'VIDEO'|'AUDIO', string[]> = {
  IMAGE: ['image/jpeg', 'image/png', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/x-wav'],
};
export async function POST(req: NextRequest) {
  const form = await req.formData(); const contentType = String(form.get('contentType') || ''); const content = String(form.get('content') || ''); const file = form.get('file');
  if (!types.includes(contentType as typeof types[number])) return NextResponse.json({ error:'Unsupported verification type.' }, { status:400 });
  if ((contentType === 'TEXT' || contentType === 'URL') && !content.trim()) return NextResponse.json({ error:'Enter content to verify.' }, { status:400 });
  if (contentType === 'URL') { try { new URL(content); } catch { return NextResponse.json({ error:'Enter a valid URL.' }, { status:400 }); } }
  if (!['TEXT','URL'].includes(contentType) && !(file instanceof File)) return NextResponse.json({ error:'Select a media file.' }, { status:400 });
  if (file instanceof File && file.size > 25 * 1024 * 1024) return NextResponse.json({ error:'Files must be 25 MB or smaller for this MVP.' }, { status:400 });
  if (file instanceof File && !acceptedMimeTypes[contentType as 'IMAGE'|'VIDEO'|'AUDIO']?.includes(file.type)) return NextResponse.json({ error:'The selected file type is not supported for this audit.' }, { status:400 });
  const result = file instanceof File ? inspectMedia(file) : await verifyText(content, contentType as 'TEXT'|'URL');
  const payload = { contentType, submittedContent: file instanceof File ? file.name : content, verificationStatus: result.status, confidenceScore: result.confidence, analysisResult: { summary:result.summary, limitations:result.limitations, claims:result.claims }, evidence: result.evidence };
  const userId = await getUserId(req.cookies.get('veritas_session')?.value);
  if (userId) {
    try {
      const saved = await prisma.verification.create({ data: { userId, contentType: contentType as 'TEXT'|'URL'|'IMAGE'|'VIDEO'|'AUDIO', submittedContent: payload.submittedContent, verificationStatus: result.status, confidenceScore: result.confidence, analysisResult: payload.analysisResult, evidence: { create: [] }, report: { create: { reportData: payload.analysisResult, limitations: result.limitations } } } });
      return NextResponse.json({ ...payload, id:saved.id, createdAt:saved.createdAt.toISOString() });
    } catch { /* The audit result remains usable if PostgreSQL is not configured locally. */ }
  }
  return NextResponse.json({ ...payload, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req.cookies.get('veritas_session')?.value);
  if (!userId) return NextResponse.json([]);
  try { const reports = await prisma.verification.findMany({ where:{userId}, include:{evidence:true,report:true}, orderBy:{createdAt:'desc'}, take:30 }); return NextResponse.json(reports); }
  catch { return NextResponse.json([]); }
}
