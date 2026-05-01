const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'public' || file === 'supabase') continue;
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (/\.(md|tsx|ts|js|jsx)$/.test(filepath)) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const files = walkSync('.');
// Match href="/...", href='/...', [text](/...)
// Also match absolute URLs.
const absoluteRegex = /https?:\/\/[^\s"'<>\)\]]+/g;
const relativeHrefRegex = /href=["'](\/[^"']*)["']/g;
const markdownLinkRegex = /\[[^\]]*\]\((\/[^\)]*)\)/g;

const absoluteLinks = [];
const relativeLinks = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  let match;
  while ((match = absoluteRegex.exec(content)) !== null) {
    absoluteLinks.push({ url: match[0], file });
  }
  while ((match = relativeHrefRegex.exec(content)) !== null) {
    relativeLinks.push({ url: match[1], file });
  }
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    relativeLinks.push({ url: match[1], file });
  }
}

const brokenRelative = [];

function checkRelativeUrl(url) {
  // strip query and hash
  let cleanUrl = url.split('?')[0].split('#')[0];
  if (cleanUrl === '/') return true;
  
  // check public folder
  const publicPath = path.join('public', cleanUrl);
  if (fs.existsSync(publicPath)) return true;
  
  // check app directory
  let appPath = path.join('app', cleanUrl);
  if (fs.existsSync(appPath) && fs.statSync(appPath).isDirectory()) {
    if (fs.existsSync(path.join(appPath, 'page.tsx')) || fs.existsSync(path.join(appPath, 'page.jsx'))) {
      return true;
    }
  }
  
  // Could be an API route
  if (cleanUrl.startsWith('/api/')) return true; // Hard to check API routes statically
  
  return false;
}

for (const rel of relativeLinks) {
  if (!checkRelativeUrl(rel.url)) {
    brokenRelative.push(rel);
  }
}

async function checkLinks() {
  const uniqueUrls = [...new Set(absoluteLinks.map(l => l.url))];
  console.log(`Found ${uniqueUrls.length} unique absolute URLs. Checking...`);
  const brokenAbsolute = [];
  
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    // skip obvious variables or templates
    if (url.includes('${') || url.includes('localhost') || url.includes('127.0.0.1')) continue;
    
    try {
      let res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok && res.status !== 405 && res.status !== 403) { 
        res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok && res.status !== 403) {
           brokenAbsolute.push({ url, status: res.status });
        }
      }
    } catch (e) {
      brokenAbsolute.push({ url, status: e.message });
    }
    // simple rate limit
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log('\n--- Broken Relative Links ---');
  const uniqueBrokenRel = [...new Set(brokenRelative.map(l => l.url))];
  if (uniqueBrokenRel.length === 0) {
    console.log('None!');
  } else {
    for (const url of uniqueBrokenRel) {
      const filesWithLink = brokenRelative.filter(l => l.url === url).map(l => l.file);
      console.log(`[Missing] ${url}`);
      console.log(`   Found in: ${[...new Set(filesWithLink)].join(', ')}`);
    }
  }

  console.log('\n--- Broken Absolute Links ---');
  if (brokenAbsolute.length === 0) {
    console.log('None!');
  } else {
    for (const b of brokenAbsolute) {
      const filesWithLink = absoluteLinks.filter(l => l.url === b.url).map(l => l.file);
      console.log(`[${b.status}] ${b.url}`);
      console.log(`   Found in: ${[...new Set(filesWithLink)].join(', ')}`);
    }
  }
}

checkLinks();
