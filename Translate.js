// Imports the Google Cloud client library then
// Instantiates a client
Translate = require('@google-cloud/translate')({
    key: 'AIzaSyDowsa3GOSl-KhXP6owDdFRGoLdKfTa8zE'
});

const translate = async (text, target) => {
  
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  try {
    const results = await Translate.translate(text, target)
    
    let translations = results[0];
    translations = Array.isArray(translations) ? translations : [translations];

    // console.log('Translations:');
    // translations.forEach((translation) => {
    //   console.log(`${text} => (${target}) ${translation}`);
    // });
    return translations;
  }
  catch(err) {
    console.error('ERROR:', err);
    return undefined;
  }
}

module.exports = async (source, lang) => {

  console.log(`Start translating ${source}...`);
  
  const data = require(source, lang);
  let translations = [];

  let arr = Object.keys(data);
  for (let i = 0; i < arr.length; i++) {
    const translation = await translate(data[arr[i]], lang);
    translations = [
      ...translations,
      {
        key: arr[i],
        text: translation
      }
    ];
    console.log(`Translation progession [${i}/${arr.length}]...`);
  }
  return translations;
};
