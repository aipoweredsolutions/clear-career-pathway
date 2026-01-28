# Resume Download Implementation Guide

## Overview
This guide explains how the resume download functionality (PDF & DOCX) is implemented for authenticated users.

## Architecture

### Component Structure
```
components/
├── editor/
│   ├── DownloadButtons.tsx          # Main download component
│   └── ResumeControlBar.tsx         # Control bar with formatting + downloads
├── pdf/
│   ├── PDFDownloadButton.tsx        # Legacy - can be deprecated
│   └── PDFPreview.tsx               # PDF preview in editor
lib/
├── pdf/
│   └── ResumePDF.tsx                # PDF document generator
├── docx/
│   └── ResumeDOCX.ts                # DOCX document generator
└── types/
    └── resume.ts                    # Resume data types
```

## Key Components

### 1. DownloadButtons Component
**Location**: `components/editor/DownloadButtons.tsx`

A unified component that handles both PDF and DOCX downloads with:
- Multiple display variants (`header`, `toolbar`, `standalone`)
- Loading states for both formats
- Error handling
- Automatic filename generation from user's name

**Usage**:
```tsx
import { DownloadButtons } from '@/components/editor/DownloadButtons'

// Default header variant
<DownloadButtons data={resumeData} />

// Toolbar variant (compact, for control bar)
<DownloadButtons data={resumeData} variant="toolbar" />
```

### 2. ResumePDF Component
**Location**: `lib/pdf/ResumePDF.tsx`

Generates PDF using `@react-pdf/renderer`:
- Professional ATS-compliant layout
- A4 paper size optimized
- Includes all resume sections
- Custom fonts (Inter) via Google Fonts

**Key Features**:
- Responsive styling with `StyleSheet.create`
- Automatic page breaks with `wrap` prop
- Hierarchical section rendering
- Bullet points and formatting

### 3. ResumeDOCX Class
**Location**: `lib/docx/ResumeDOCX.ts`

Generates DOCX using `docx` library:
- Static `download()` method
- Structured document with proper headings
- Bullet lists for achievements
- Centered header with contact info

**Usage**:
```typescript
import { ResumeDOCX } from '@/lib/docx/ResumeDOCX'

await ResumeDOCX.download(data, 'filename.docx')
```

## Authentication Flow

### 1. Editor Page Protection
**File**: `app/editor/[documentId]/page.tsx`

The editor page is client-side but fetches data through server actions:
```tsx
const fetchedData = await fetchResume(documentId)
```

### 2. Server Actions
**File**: `app/editor/actions.ts`

Server actions use Supabase authentication:
```typescript
async function getSupabase() {
    const cookieStore = await cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
}
```

### 3. Row Level Security (RLS)
Supabase RLS policies ensure:
- Users can only access their own documents
- Unauthorized access returns null/error
- No need for additional client-side checks

## Data Flow

1. **User Authentication**
   - User logs in via Supabase Auth
   - Session stored in cookies
   - Dashboard shows user's documents

2. **Document Loading**
   - User navigates to `/editor/[documentId]`
   - `fetchResume()` server action called
   - Returns `ResumeDocument` if authorized, null otherwise

3. **Download Trigger**
   - User clicks PDF or DOCX button
   - **PDF**: Generates in-browser using `usePDF` hook
   - **DOCX**: Calls `ResumeDOCX.download()` which generates and triggers download

4. **File Generation**
   - **PDF**: React components → PDF via `@react-pdf/renderer` → Blob URL → Download
   - **DOCX**: Data → `docx` Document → Blob → `file-saver` → Download

## Dependencies

### Production
```json
{
  "@react-pdf/renderer": "^4.3.2",
  "docx": "^8.5.0",
  "file-saver": "^2.0.5"
}
```

### How They Work
- **@react-pdf/renderer**: Converts React components to PDF
- **docx**: Creates Office Open XML documents programmatically
- **file-saver**: Cross-browser file download utility

## File Naming Logic

```typescript
const fileName = `${data.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume'}`
```

- Uses user's full name from resume data
- Replaces spaces with underscores
- Falls back to "resume" if name not available
- Adds appropriate extension (.pdf or .docx)

## Error Handling

### PDF Generation
- Shows loading state while generating
- Disables button during generation
- Relies on `usePDF` hook error handling

### DOCX Generation
```typescript
const handleDocxDownload = async () => {
    setDownloadingDocx(true)
    try {
        await ResumeDOCX.download(data, `${fileName}.docx`)
    } catch (error) {
        console.error('DOCX download failed:', error)
        alert('Failed to download DOCX. Please try again.')
    } finally {
        setDownloadingDocx(false)
    }
}
```

## UI/UX Features

### Loading States
- PDF: Shows spinner and "Generating..." text
- DOCX: Shows spinner and "Generating..." text
- Buttons are disabled during generation

### Hover Effects
- PDF button: Red accent on hover
- DOCX button: Blue accent on hover
- Smooth transitions with Tailwind CSS

### Responsive Design
- Header variant: Full-size buttons with text
- Toolbar variant: Compact buttons for maximized view
- Icons: Lucide React icons (`Download`, `FileText`)

## Testing Checklist

- [ ] User must be logged in to access editor
- [ ] PDF download works with complete resume data
- [ ] DOCX download works with complete resume data
- [ ] Filename includes user's name correctly
- [ ] Loading states show during generation
- [ ] Error handling works (try with network offline)
- [ ] Downloads work in fullscreen/maximized mode
- [ ] Multiple downloads in succession work correctly
- [ ] Files open correctly in respective applications

## Future Improvements

### Planned Features
1. **Custom Templates for Downloads**
   - Allow different PDF templates based on `templateId`
   - Currently uses single default template

2. **Advanced DOCX Styling**
   - Match visual templates more closely
   - Add colors, spacing, and advanced formatting

3. **Download Analytics**
   - Track which formats users prefer
   - Monitor download success/failure rates

4. **Batch Operations**
   - Download multiple resumes at once
   - Create ZIP files with both formats

5. **Cloud Integration**
   - Save directly to Google Drive, Dropbox
   - Email downloads to user

### Code Refactoring Opportunities
1. Extract common download logic to utility functions
2. Create template-specific PDF generators
3. Add TypeScript strict mode validation
4. Implement download queue for multiple files

## Troubleshooting

### Common Issues

**Issue**: PDF shows "Loading forever"
- **Cause**: Large resume with many sections
- **Fix**: Optimize PDF component, reduce font loading time

**Issue**: DOCX has formatting issues
- **Cause**: Complex nested data structures
- **Fix**: Improve mapping in `ResumeDOCX.download()`

**Issue**: Download fails silently
- **Cause**: Network error or auth timeout
- **Fix**: Add better error boundaries and retry logic

### Debug Mode
Add to component for debugging:
```typescript
console.log('PDF Instance:', pdfInstance)
console.log('Resume Data:', data)
```

## Security Considerations

1. **Data Validation**
   - Validate resume data before generation
   - Sanitize user input to prevent XSS

2. **Rate Limiting**
   - Consider adding rate limits for downloads
   - Prevent abuse of generation endpoints

3. **File Size Limits**
   - Monitor generated file sizes
   - Alert if unusually large (potential issue)

4. **Access Control**
   - Always verify user owns the document
   - Use RLS policies consistently
   - Never expose other users' data

## Resources

- [React-PDF Documentation](https://react-pdf.org/)
- [docx Library Guide](https://docx.js.org/)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
