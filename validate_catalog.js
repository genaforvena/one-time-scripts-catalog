const fs = require('fs');
const path = require('path');

const scriptsPath = path.join(__dirname, 'scripts.json');

function validate() {
  console.log('🔍 Validating scripts.json...');
  
  if (!fs.existsSync(scriptsPath)) {
    console.error('❌ Error: scripts.json not found!');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(scriptsPath, 'utf8'));
  
  if (!data.scripts || !Array.isArray(data.scripts)) {
    console.error('❌ Error: scripts.json must have a "scripts" array!');
    process.exit(1);
  }

  const ids = new Set();
  let errors = 0;

  data.scripts.forEach((script, index) => {
    if (!script.id) {
      console.error(`❌ Error at index ${index}: Missing "id"`);
      errors++;
    } else if (ids.has(script.id)) {
      console.error(`❌ Error at index ${index}: Duplicate id "${script.id}"`);
      errors++;
    }
    ids.add(script.id);

    if (!script.name) {
      console.error(`❌ Error in "${script.id}": Missing "name"`);
      errors++;
    }
    if (!script.code) {
      console.error(`❌ Error in "${script.id}": Missing "code"`);
      errors++;
    }
  });

  if (errors === 0) {
    console.log(`✅ Success! ${data.scripts.length} scripts validated.`);
  } else {
    console.error(`\n❌ Total errors found: ${errors}`);
    process.exit(1);
  }
}

validate();
