# Project Specification Document
# Real-Time Fact-Verification & Deepfake Audit Engine

**Project Type:** AI-Powered Web Application  
**Development Approach:** MVP → Advanced Features  
**Target:** Codex (AI Coding Agent)

## 1. Project Overview

Build an AI-powered platform that checks the authenticity of online information, images, videos, and audio.
The system should help users identify:
- Fake news and misleading claims.
- AI-generated images and videos.
- Manipulated audio and voice recordings.
- Potentially manipulated or misleading media.
- Sources that may be unreliable.

The application should analyze submitted content, collect supporting evidence from trusted sources, and generate an understandable verification report.

## 2. Core Features
### A. Fact Verification
- Users can enter text, news claims, or URLs.
- Extract important claims from submitted content.
- Search reliable sources for supporting information.
- Compare information across multiple sources.
- Generate a verification result:
  - Supported
  - Contradicted
  - Mixed Evidence
  - Insufficient Evidence
- Display source links and explanations.

### B. Deepfake Image Detection
- Upload JPG, PNG, or WEBP images.
- Analyze image manipulation indicators.
- Detect potential AI-generated content using available detection models.
- Generate a confidence score.
- Display the analysis and its limitations.

### C. Video Verification
- Upload video files.
- Extract selected frames for analysis.
- Analyze frames for potential manipulation.
- Check available metadata.
- Generate a video authenticity report.

### D. Audio Verification
- Upload MP3 or WAV files.
- Analyze audio characteristics.
- Use available AI-generated speech detection models.
- Identify suspicious audio patterns.
- Generate an analysis report.

### E. Verification Dashboard
Display:
- Total verifications.
- Text verification history.
- Image analysis history.
- Video analysis history.
- Audio analysis history.
- Recent reports.
- Verification status distribution.

### F. Audit Reports
Every verification should generate a report containing:
- Submitted content.
- Content type.
- Analysis date.
- Verification status.
- Confidence score.
- Supporting evidence.
- Source references.
- AI analysis explanation.
- Limitations and warnings.

## 3. Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js + React |
| Styling | Tailwind CSS |
| Backend API | Node.js + Express |
| Database | PostgreSQL |
| ORM | Prisma |
| AI Service | Python + FastAPI |
| AI Integration | Gemini API |
| Media Processing | FFmpeg + OpenCV |
| Authentication | JWT |
| File Storage | Supabase Storage |
| Deployment | Vercel + Render |

Use modular architecture so that AI detection providers can be replaced without rewriting the application.

## 4. Application Pages

1. Landing Page
2. Login / Registration
3. Main Dashboard
4. Fact Verification
5. Image Deepfake Detection
6. Video Analysis
7. Audio Analysis
8. Verification Results
9. Audit History
10. User Profile
11. Admin Dashboard

## 5. Database Structure

Create the following database tables:

**Users**
- id
- name
- email
- password_hash
- created_at

**Verifications**
- id
- user_id
- content_type
- submitted_content
- file_url
- verification_status
- confidence_score
- analysis_result
- created_at

**Evidence**
- id
- verification_id
- source_name
- source_url
- evidence_summary
- evidence_type
- created_at

**AnalysisReports**
- id
- verification_id
- report_data
- limitations
- created_at

## 6. System Architecture

The application should follow this workflow:

1. User submits text, URL, image, video, or audio.
2. Frontend sends the request to the backend.
3. Backend validates the input.
4. Backend sends the request to the appropriate AI service.
5. AI service processes the content.
6. Fact verification retrieves relevant evidence from configured sources.
7. Detection models analyze media.
8. Results are combined into a structured report.
9. Backend saves the report in PostgreSQL.
10. Frontend displays the final results.

## 7. UI/UX Requirements

Create a modern, professional AI SaaS interface.

Design direction:
- Clean dashboard layout.
- Dark and light modes.
- Responsive design.
- Professional typography.
- Simple navigation sidebar.
- Clear status indicators.
- Progress indicators during analysis.
- Interactive report cards.
- Charts for dashboard statistics.

The interface should be easy to understand for non-technical users.

## 8. Security Requirements

- Secure authentication.
- Password hashing.
- Input validation.
- File type and file size validation.
- Secure file uploads.
- API rate limiting.
- Environment variables for API keys.
- No API secrets exposed in frontend code.
- User-specific access to verification history.

## 9. Important Implementation Rules

- Build working functionality, not just UI mockups.
- Use real API integrations wherever available.
- Do not generate fake verification results.
- Clearly distinguish AI predictions from independently verified evidence.
- Show confidence scores with explanations.
- If a detection model is unavailable, show an appropriate unavailable status.
- Never claim that an image, video, or audio recording is authentic solely because a detector found no manipulation.
- Keep frontend, backend, and AI services modular.
- Include loading, error, and empty states.
- Include sample test data for development.

## 10. Development Phases

**Phase 1 — Foundation**
- Project setup.
- Database configuration.
- Authentication.
- Dashboard layout.
- Backend API structure.

**Phase 2 — Fact Verification**
- Text and URL submission.
- Claim extraction.
- Source retrieval.
- Evidence comparison.
- Verification reports.

**Phase 3 — Deepfake Detection**
- Image upload and analysis.
- Video frame extraction and analysis.
- Audio analysis.
- Detection result integration.

**Phase 4 — Reporting**
- Verification history.
- Detailed reports.
- Evidence references.
- Dashboard analytics.

**Phase 5 — Testing and Deployment**
- API testing.
- Frontend testing.
- Security checks.
- Production deployment.
- Documentation.

## 11. MVP Acceptance Criteria

The first version is complete when:

- Users can register and log in.
- Users can submit text for verification.
- Users can submit URLs for verification.
- Users can upload images for analysis.
- The application displays actual analysis results.
- Evidence sources are visible.
- Users can view previous reports.
- Reports are saved in PostgreSQL.
- The application works on desktop and mobile.
- All core APIs are connected and tested.

## 12. Final Instructions for Codex

Build this project from scratch using the specification above.

Before coding:

1. Inspect the existing repository.
2. Create a clear folder structure.
3. Prepare the database schema.
4. Set up frontend, backend, and AI services.
5. Create a development roadmap.

Then implement each phase in order.

**Important:** Prioritize a fully functional MVP. Do not attempt to implement every advanced AI capability at once. Use real detection models and APIs, document their limitations, and make sure the core application works end-to-end before adding advanced features.

At the end, provide:
- Complete working source code.
- Database migrations.
- Environment variable example file.
- API documentation.
- Local setup instructions.
- Testing instructions.
- Deployment instructions.
