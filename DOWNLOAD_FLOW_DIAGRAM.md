# Download Feature - Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER AUTHENTICATION                          │
├─────────────────────────────────────────────────────────────────────┤
│  1. User logs in via Supabase Auth                                  │
│  2. Session stored in cookies                                       │
│  3. Dashboard shows user's documents                                │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      RESUME EDITOR ACCESS                           │
├─────────────────────────────────────────────────────────────────────┤
│  URL: /editor/[documentId]                                          │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  fetchResume(documentId)                                      │ │
│  │    ↓                                                          │ │
│  │  Server Action with Supabase Client                          │ │
│  │    ↓                                                          │ │
│  │  RLS Check: Does user own this document?                     │ │
│  │    ↓                                                          │ │
│  │  ✓ Authorized → Return ResumeDocument                        │ │
│  │  ✗ Unauthorized → Return null                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      EDITOR UI STRUCTURE                            │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  HEADER (Top Bar)                                           │   │
│  │  ┌─────────┬─────────┬──────────┬─────────────────────┐    │   │
│  │  │ Back    │ Title   │ ATS      │ Save | DOCX | PDF   │    │   │
│  │  │ Button  │         │ Score    │                     │    │   │
│  │  └─────────┴─────────┴──────────┴─────────────────────┘    │   │
│  │                    ↑ DownloadButtons (header variant)      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────┬────────────────────────────────────────┐   │
│  │  FORM EDITOR       │  PREVIEW PANEL                         │   │
│  │  ┌──────────────┐  │  ┌──────────────────────────────────┐ │   │
│  │  │ Personal Info│  │  │ ResumeControlBar                 │ │   │
│  │  ├──────────────┤  │  │ ┌────────────────────────────────┤ │   │
│  │  │ Summary      │  │  │ │ Font | Margin | Spacing | Size │ │   │
│  │  ├──────────────┤  │  │ │                                │ │   │
│  │  │ Experience   │  │  │ │ [Maximized? → DOCX | PDF]      │ │   │
│  │  ├──────────────┤  │  │ │                     ↑          │ │   │
│  │  │ Education    │  │  │ └─────────────────────┼──────────┘ │   │
│  │  ├──────────────┤  │  │          DownloadButtons (toolbar)│ │   │
│  │  │ Skills       │  │  │                                   │ │   │
│  │  └──────────────┘  │  │  ┌─────────────────────────────┐ │   │
│  │                    │  │  │  Template Preview           │ │   │
│  │                    │  │  │  (HTML or PDF mode)         │ │   │
│  │                    │  │  └─────────────────────────────┘ │   │
│  └────────────────────┴────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      DOWNLOAD FLOW                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────┐              ┌────────────────┐                │
│  │  PDF DOWNLOAD  │              │  DOCX DOWNLOAD │                │
│  └────────┬───────┘              └───────┬────────┘                │
│           │                               │                         │
│           ├─ usePDF() hook                ├─ ResumeDOCX.download()  │
│           │                               │                         │
│           ├─ <ResumePDF data={data} />    ├─ new Document(...)     │
│           │                               │                         │
│           ├─ @react-pdf/renderer          ├─ docx library          │
│           │                               │                         │
│           ├─ Generate Blob                ├─ Packer.toBlob()       │
│           │                               │                         │
│           ├─ Create Blob URL              ├─ saveAs(blob, name)    │
│           │                               │                         │
│           └─ Download via <a> tag         └─ file-saver triggers   │
│                                               download               │
│                                                                     │
│  Filename: {firstName}_{lastName}.pdf                               │
│  Filename: {firstName}_{lastName}.docx                              │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
EditorPage
├── Header
│   ├── Navigation (Back Button)
│   ├── Title Display
│   ├── ATSScore
│   ├── Templates Button
│   ├── Preview Mode Toggle (HTML/PDF)
│   ├── Fullscreen Toggle
│   ├── Save Button
│   └── DownloadButtons ← NEW COMPONENT
│       ├── DOCX Button
│       └── PDF Button
│
├── Form Editor Panel
│   └── ResumeForm
│       ├── PersonalInfoForm
│       ├── SummaryForm
│       ├── ExperienceForm
│       ├── EducationForm
│       ├── SkillsForm
│       └── ... other sections
│
└── Preview Panel
    ├── ResumeControlBar ← ENHANCED
    │   ├── Font Size Controls
    │   ├── Margin Controls
    │   ├── Spacing Controls
    │   ├── Paper Size Toggle
    │   ├── [When Maximized]
    │   │   └── DownloadButtons (toolbar variant) ← NEW
    │   └── Window Controls (Minimize, Maximize, Close)
    │
    └── Preview Area
        ├── TemplateRenderer (HTML mode)
        └── PDFPreview (PDF mode)
```

## Data Flow Diagram

```
┌──────────┐
│  User    │
└────┬─────┘
     │ Clicks Download Button
     ↓
┌────────────────┐
│ DownloadButtons│
│   Component    │
└────┬───────────┘
     │
     ├─── PDF Path ──→ ┌─────────────────────┐
     │                 │ usePDF()            │
     │                 │   ↓                 │
     │                 │ ResumePDF Component │
     │                 │   ↓                 │
     │                 │ @react-pdf/renderer │
     │                 │   ↓                 │
     │                 │ Blob URL            │
     │                 │   ↓                 │
     │                 │ <a download>        │
     │                 │   ↓                 │
     │                 │ Browser Download    │
     │                 └─────────────────────┘
     │
     └─── DOCX Path ──→ ┌─────────────────────┐
                        │ ResumeDOCX.download │
                        │   ↓                 │
                        │ new Document()      │
                        │   ↓                 │
                        │ docx library        │
                        │   ↓                 │
                        │ Packer.toBlob()     │
                        │   ↓                 │
                        │ file-saver saveAs() │
                        │   ↓                 │
                        │ Browser Download    │
                        └─────────────────────┘
```

## Security Flow

```
┌─────────────┐
│ User Action │
└──────┬──────┘
       │
       ↓
┌──────────────────┐      ┌─────────────────────┐
│ Editor Page      │─────→│ fetchResume()       │
│ (Client)         │      │ Server Action       │
└──────────────────┘      └──────┬──────────────┘
                                 │
                                 ↓
                          ┌─────────────────┐
                          │ getSupabase()   │
                          │ + Session       │
                          └────────┬────────┘
                                   │
                                   ↓
                          ┌─────────────────────┐
                          │ Supabase Query      │
                          │ WHERE user_id = ?   │
                          └────────┬────────────┘
                                   │
                                   ↓
                          ┌─────────────────────┐
                          │ RLS Policy Check    │
                          │ • User owns doc?    │
                          └────────┬────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ↓                             ↓
            ┌───────────────┐            ┌────────────────┐
            │ ✓ Authorized  │            │ ✗ Unauthorized │
            │ Return Data   │            │ Return null    │
            └───────┬───────┘            └────────┬───────┘
                    │                             │
                    ↓                             ↓
            ┌───────────────┐            ┌────────────────┐
            │ Downloads     │            │ No Downloads   │
            │ Available     │            │ No Editor      │
            └───────────────┘            └────────────────┘
```

## State Management

```
EditorPage State:
├── data: ResumeDocument | null
├── loading: boolean
├── saving: boolean
├── lastSaved: Date | null
├── showTemplates: boolean
├── isMaximized: boolean
├── previewMode: 'html' | 'pdf'
└── scale: number

DownloadButtons State:
├── downloadingDocx: boolean
└── pdfInstance: { loading, url, error }
    └── From usePDF() hook
```
