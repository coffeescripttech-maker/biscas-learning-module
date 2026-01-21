const fs = require('fs');
const path = require('path');

const pages = [
  'app/page.tsx',
  'app/student/dashboard/page.tsx',
  'app/student/vark-modules/page.tsx',
  'app/student/vark-modules/[id]/page.tsx',
  'app/student/classes/page.tsx',
  'app/student/classes/[id]/page.tsx',
  'app/student/profile/page.tsx',
  'app/teacher/dashboard/page.tsx',
  'app/teacher/students/page.tsx',
  'app/teacher/vark-modules/page.tsx',
  'app/teacher/vark-modules/edit/[id]/page.tsx',
  'app/teacher/submissions/page.tsx',
  'app/teacher/classes/page.tsx',
  'app/teacher/profile/page.tsx',
  'app/teacher/lessons/page.tsx',
  'app/teacher/quizzes/page.tsx',
  'app/teacher/settings/page.tsx',
  'app/teacher/activities/page.tsx',
  'app/teacher/analytics/page.tsx',
];

pages.forEach(pagePath => {
  try {
    const fullPath = path.join(__dirname, pagePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if it already has the export
      if (!content.includes("export const dynamic = 'force-dynamic'")) {
        // Add after 'use client';
        content = content.replace(
          "'use client';\n\n",
          "'use client';\n\nexport const dynamic = 'force-dynamic';\n\n"
        );
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Updated: ${pagePath}`);
      } else {
        console.log(`⏭️  Skipped (already has export): ${pagePath}`);
      }
    } else {
      console.log(`❌ Not found: ${pagePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${pagePath}:`, error.message);
  }
});

console.log('\n✨ Done!');
