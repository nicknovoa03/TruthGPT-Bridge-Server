const fs = require('fs');

function csvToDictionary(filePath) {
  const csv = fs.readFileSync(filePath, 'utf-8');
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const dictionary = {};

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const key = currentLine[0].trim();
    const value = currentLine[1].trim();
    dictionary[key] = value;
  }

  return dictionary;
}

function saveDictionaryAsJson(dictionary, outputPath) {
  const json = JSON.stringify(dictionary, null, 2);
  fs.writeFileSync(outputPath, json, 'utf-8');
  console.log(`Dictionary saved as JSON at: ${outputPath}`);
}

const csvFilePath = 'TruthBscSnapshot.csv';
const dictionary = csvToDictionary(csvFilePath);
const outputFilePath = 'BscSnapshotDictionary.json';
saveDictionaryAsJson(dictionary, outputFilePath);
