# Download Features Documentation

## Overview
Authenticated users can download their resume in both **PDF** and **DOCX** formats directly from the resume editor.

## How to Download Your Resume

### From the Editor Header
1. Navigate to your resume in the editor (`/editor/[documentId]`)
2. Look for the download buttons in the top-right header:
   - **DOCX Button** (blue highlight on hover) - Downloads Microsoft Word format
   - **PDF Button** (red highlight on hover) - Downloads PDF format

### From Fullscreen/Maximized Mode
1. Click the **Full Screen** button in the editor header
2. The download buttons will appear in the control bar at the top of the preview
3. Click either **PDF** or **DOCX** to download in your preferred format

## Download Formats

### PDF (.pdf)
- **Best for**: Job applications, online submissions, final documents
- **Features**:
  - Professional, ATS-compliant layout
  - Fixed formatting that looks the same on all devices
  - Optimized for US Letter or A4 paper size (based on your selection)
  - Includes all resume sections with proper styling

### DOCX (.docx)
- **Best for**: Further editing, customization, or when requested by employers
- **Features**:
  - Editable Microsoft Word format
  - Compatible with Word, Google Docs, and other word processors
  - Maintains structured formatting for easy editing
  - Includes all resume sections

## Authentication Requirements

⚠️ **Important**: You must be logged in to download your resume.

- Downloads are only available to authenticated users
- Your resume data is protected by Row Level Security (RLS) in Supabase
- Only you can access and download your own resumes
- If you're not logged in, you'll be redirected to the login page when trying to access the editor

## File Naming

Downloaded files are automatically named using your full name:
- Format: `[Your_Name].pdf` or `[Your_Name].docx`
- Example: `John_Doe.pdf`, `Jane_Smith.docx`
- Spaces in your name are replaced with underscores

## Technical Implementation

### Components Used
- **DownloadButtons**: Unified component handling both PDF and DOCX downloads
- **ResumePDF**: PDF generation using `@react-pdf/renderer`
- **ResumeDOCX**: DOCX generation using `docx` library

### Libraries
- `@react-pdf/renderer` - PDF generation
- `docx` - Microsoft Word document generation
- `file-saver` - File download functionality

### Security
- Server-side authentication via Supabase
- Row Level Security (RLS) policies ensure users can only access their own documents
- Download functionality is only available within the authenticated editor context

## Troubleshooting

### Download button is disabled or loading
- Wait for the document to finish generating
- This usually takes 1-3 seconds depending on resume length

### Download failed
- Ensure you have a stable internet connection
- Check that you're still logged in
- Try refreshing the page and attempting the download again

### File doesn't open correctly
- **PDF**: Ensure you have a PDF reader installed (Adobe Reader, browser, etc.)
- **DOCX**: Ensure you have Microsoft Word, Google Docs, or compatible software

## Best Practices

1. **Before Downloading**:
   - Review your resume in the preview pane
   - Check the PDF preview mode to see exactly how it will look
   - Save your changes before downloading

2. **Format Selection**:
   - Use PDF for job applications and final submissions
   - Use DOCX if you need to make quick edits outside the platform

3. **File Management**:
   - Download both formats for backup purposes
   - Keep organized folders for different versions
   - Update filename if you create multiple versions

## Future Enhancements

Planned improvements to the download functionality:
- Custom filename options
- Download history
- Batch download of multiple resumes
- Email delivery option
- Cloud storage integration (Google Drive, Dropbox)
