const fs = require('fs');

const translate = require('./Translate');

module.exports = async (source, target, lang = 'vi', targetFolder = 'dist') => {
  
  const data = await translate(source, lang);

  const file = `
<?php
/**
|--------------------------------------------------------------------------
| General Language Lines of ${target}
| Author: Tri Pham
|--------------------------------------------------------------------------
|
| The following language lines contain the general translation for ${target}
|
*/

return [`
  + 
  data.map(({key, text}) => {
    return `\n    "${key}" => "${text}"`
  }) 
  +
`
];
`;
  const targetFile = `${targetFolder}/${lang}/${target}.php`;

  if (!fs.existsSync(targetFolder)){
    fs.mkdirSync(targetFolder);
  }

  if (!fs.existsSync(`${targetFolder}/${lang}`)){
    fs.mkdirSync(`${targetFolder}/${lang}`);
  }

  fs.writeFile(targetFile, file, err => {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
}