const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Template.tsx') && !f.includes('CoverLetter'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check if already modified
    if (content.includes('data.documentType === \\\'cover_letter\\\'')) {
        console.log("Already patched", file);
        continue;
    }
    
    // Find </header>
    const headerEnd = content.indexOf('</header>');
    if (headerEnd === -1) {
        console.log("No </header> found in", file);
        continue;
    }
    
    const insertPos = headerEnd + '</header>'.length;
    
    // We need accentColor if it exists, otherwise empty
    const hasAccentColor = content.includes('accentColor');
    const colorProp = hasAccentColor ? 'accentColor' : "''";

    const injection = `
            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="px-8 sm:px-12 pb-12 pt-8">
                    <div className="mb-8 space-y-1 text-[13px] text-neutral-800">
                        <p className="font-bold text-neutral-400 mb-6">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-bold">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold">{data.coverLetter.companyName}</p>}
                    </div>
                    <div className="mb-6"><p className="text-[13px] text-neutral-800">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p></div>
                    <div className="prose prose-neutral max-w-none mb-12">
                        {data.coverLetter?.content?.split('\\n').map((para, i) => (
                            <p key={i} className="text-[13px] leading-relaxed mb-4 text-justify text-neutral-800">{para}</p>
                        )) || <p className="text-neutral-400 italic text-[13px]">Your cover letter will appear here...</p>}
                    </div>
                    <div className="space-y-4 text-neutral-800">
                        <p className="text-[13px]">Sincerely,</p>
                        <p className="font-bold text-[13px]">{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="px-8 sm:px-12 pb-12 pt-8">
                    <h2 className={cn("text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2", ${colorProp})}>Professional References</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="font-bold text-neutral-900 text-[13px]">{ref.referenceName || ref.name}</span>
                                <span className="text-[12px] text-neutral-600 italic">{ref.role || ref.title}{(ref.organization || ref.company) ? \`, \${ref.organization || ref.company}\` : ''}</span>
                                {(ref.contactDetails || ref.contactInfo) && <span className="text-[12px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</span>}
                                {ref.availabilityStatement && <span className="text-[11px] text-neutral-400 italic mt-1">{ref.availabilityStatement}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
`;

    // Close the React Fragment before the LAST </div>
    const lastDiv = content.lastIndexOf('</div>');
    if (lastDiv !== -1) {
        content = content.slice(0, lastDiv) + '\n                </>\n            )}\n            ' + content.slice(lastDiv);
        content = content.slice(0, insertPos) + injection + content.slice(insertPos);
        fs.writeFileSync(path.join(dir, file), content);
        console.log("Patched", file);
    }
}
