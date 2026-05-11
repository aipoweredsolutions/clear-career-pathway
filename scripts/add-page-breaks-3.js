const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const sections = ['workExperience', 'education', 'projects', 'certifications', 'publications', 'volunteerExperience', 'professionalAffiliations', 'references', 'customSections'];

    for (const section of sections) {
        const matches = [...content.matchAll(new RegExp(section + '(?:\\?\\.)?map\\([^=]+=>\\s*\\(\\s*<([a-zA-Z]+)([^>]*)>', 'g'))];
        
        for (const match of matches) {
            const fullTag = match[0];
            if (fullTag.includes('break-inside-avoid')) continue;

            let newTag = fullTag;
            if (fullTag.includes('className="')) {
                newTag = fullTag.replace('className="', 'className="break-inside-avoid ');
            } else if (fullTag.includes('className={cn(')) {
                newTag = fullTag.replace('className={cn(', 'className={cn("break-inside-avoid", ');
            } else if (fullTag.includes("className={cn('")) {
                newTag = fullTag.replace("className={cn('", "className={cn('break-inside-avoid', '");
            } else if (fullTag.includes('className={`')) {
                newTag = fullTag.replace('className={`', 'className={`break-inside-avoid ');
            } else {
                // No className found, add one
                newTag = fullTag.replace(/([a-zA-Z]+)([^>]*)>/, '$1$2 className="break-inside-avoid">');
            }

            content = content.replace(fullTag, newTag);
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
        modifiedCount++;
    }
}

console.log(`Finished! Modified ${modifiedCount} files.`);
