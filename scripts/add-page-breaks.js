const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // A simpler regex to find map return divs that are missing break-inside-avoid.
    // e.g. <div key={i} className="group"> -> <div key={i} className="group break-inside-avoid">
    // or <div key={i}> -> <div key={i} className="break-inside-avoid">
    
    // We can target specific map structures.
    const sections = ['workExperience', 'education', 'projects', 'certifications', 'publications', 'volunteerExperience', 'professionalAffiliations', 'references', 'customSections'];

    for (const section of sections) {
        // Find section mapping
        const regex = new RegExp(`${section}(?:\\?\\.)?map\\(([^)]+)\\)\\s*=>\\s*\\(\\s*<([a-zA-Z]+)`, 'g');
        
        let match;
        while ((match = regex.exec(content)) !== null) {
            const index = match.index;
            const openTagLength = match[0].length;
            const tagStart = index + match[0].length - match[2].length;
            
            // Find the end of this tag >
            const endOfTagIndex = content.indexOf('>', tagStart);
            if (endOfTagIndex === -1) continue;
            
            const fullTag = content.substring(tagStart - 1, endOfTagIndex + 1);
            
            if (fullTag.includes('break-inside-avoid')) continue; // Already added
            
            let newTag = fullTag;
            if (fullTag.includes('className="')) {
                newTag = fullTag.replace('className="', 'className="break-inside-avoid ');
            } else if (fullTag.includes("className={cn(")) {
                newTag = fullTag.replace("className={cn(", "className={cn('break-inside-avoid', ");
            } else {
                newTag = fullTag.replace('>', ' className="break-inside-avoid">');
            }
            
            content = content.substring(0, tagStart - 1) + newTag + content.substring(endOfTagIndex + 1);
            // Reset regex because we modified the string
            regex.lastIndex = 0;
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
        modifiedCount++;
    }
}

console.log(`\nFinished! Modified ${modifiedCount} files.`);
