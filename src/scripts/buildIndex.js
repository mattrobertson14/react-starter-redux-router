const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../components')

const dirContents = fs.readdirSync(dirPath);

const exportCodes = dirContents
  .filter(entry=>(entry!=='index.js'))
  .filter(entry=>(entry!=='buildIndex.js'))
  .map(entry=>{
    if(entry.indexOf('.js') !== -1){
      const name = entry.split('.')[0];
      return 'export {default as ' + name + '} from "./' + entry + '"';
    }else{
      return 'export {default as ' + entry + '} from "./' + entry + '/' + entry + '.js"';
    }
  })

fs.writeFileSync(path.join(dirPath, 'index.js'), exportCodes.join('\n'));
