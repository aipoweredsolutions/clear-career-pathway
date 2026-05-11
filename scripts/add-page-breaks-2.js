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
        let searchString1 = `${section}.map(`;
        let searchString2 = `${section}?.map(`;
        
        let index = 0;
        while (true) {
            let i1 = content.indexOf(searchString1, index);
            let i2 = content.indexOf(searchString2, index);
            
            let foundIndex = -1;
            if (i1 !== -1 && i2 !== -1) foundIndex = Math.min(i1, i2);
            else if (i1 !== -1) foundIndex = i1;
            else if (i2 !== -1) foundIndex = i2;
            
            if (foundIndex === -1) break;
            
            // Find the arrow function body start
            let arrowIndex = content.indexOf('=>', foundIndex);
            if (arrowIndex === -1) { index = foundIndex + 10; continue; }
            
            // Find the first '<' after arrow
            let tagStart = content.indexOf('<', arrowIndex);
            if (tagStart === -1) { index = foundIndex + 10; continue; }
            
            // Find the end of this tag '>'
            let tagEnd = content.indexOf('>', tagStart);
            if (tagEnd === -1) { index = foundIndex + 10; continue; }
            
            let fullTag = content.substring(tagStart, tagEnd + 1);
            
            if (!fullTag.includes('break-inside-avoid')) {
                let newTag = fullTag;
                if (fullTag.includes('className="')) {
                    newTag = fullTag.replace('className="', 'className="break-inside-avoid ');
                } else if (fullTag.includes("className={cn(")) {
                    newTag = fullTag.replace("className={cn(", "className={cn('break-inside-avoid', ");
                } else {
                    newTag = fullTag.replace('>', ' className="break-inside-avoid">');
                }
                
                content = content.substring(0, tagStart) + newTag + content.substring(tagEnd + 1);
                // Also assign newTag to properly continue
            }
            
            index = tagStart + 10;
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
        modifiedCount++;
    }
}

console.log(`Finished! Modified ${modifiedCount} files.`);
