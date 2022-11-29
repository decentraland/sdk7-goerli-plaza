
const fs = require('fs')
const path = require('path')

const cwd = path.resolve(__dirname, '..')
const workspaceJsonPath = path.resolve(cwd, 'dcl-workspace.json')
const workspaceJson = JSON.parse(fs.readFileSync(workspaceJsonPath))

const parcels = new Map()

for (const project of workspaceJson.folders) {
    const sceneJsonPath = path.resolve(cwd, project.path, 'scene.json')
    const sceneJson = JSON.parse(fs.readFileSync(sceneJsonPath))
    for (const tile of sceneJson.scene.parcels) {
        const arr = parcels.get(tile) || []
        arr.push(project.path)
        parcels.set(tile, arr)
    }
}

const usedParcels = Array.from(parcels.keys()).sort()
console.log(JSON.stringify(usedParcels, null, 2))

let fail = false
for (const [tile, arr] of parcels) {
    if (arr.length > 1) {
        fail = true
        console.log(`Tile ${tile} has two or more scenes assigned: ${arr.join(',')}`)
    }
}
if (fail) {
    process.exit(1)
}