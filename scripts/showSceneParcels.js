const fs = require('fs');
const path = require('path');

function readJSONFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function processFolders(directory) {
    const folders = fs.readdirSync(directory).filter(file => fs.statSync(path.join(directory, file)).isDirectory());
    const results = [];

    folders.forEach(folder => {
        const sceneFilePath = path.join(directory, folder, 'scene.json');
        if (fs.existsSync(sceneFilePath)) {
            const sceneData = readJSONFile(sceneFilePath);
            if (sceneData.scene && Array.isArray(sceneData.scene.parcels)) {
                const parcels = sceneData.scene.parcels.join('\n   ');
                const result = `Scene Name: ${folder}\nLink: https://github.com/decentraland/sdk7-goerli-plaza/tree/main/${folder}\n   ${parcels}`;
                results.push(result);
            }
        }
    });

    return results;
}

// Main execution
const parentDirectory = path.join(__dirname, '..');
const scenes = processFolders(parentDirectory);

// Output results
const outputFilePath = path.join(__dirname, 'scene-parcels-list.txt');
const output = scenes.join("\r\n\r\n");
fs.writeFileSync(outputFilePath, output, 'utf8');

scenes.forEach(scene => console.log(output));

console.log("\n\r This information has been output to: " + outputFilePath);
