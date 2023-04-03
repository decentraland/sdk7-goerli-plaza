
const fs = require('fs')
const path = require('path')
const glob = require('glob')

const projects = glob.sync('*/scene.json', { absolute: true })

const parcels = new Map()

for (const projectFolder of projects.map(path.dirname)) {
  const sceneJsonPath = path.resolve(projectFolder, 'scene.json')
  const sceneJson = JSON.parse(fs.readFileSync(sceneJsonPath))
  for (const tile of sceneJson.scene.parcels) {
    const arr = parcels.get(tile) || []
    arr.push(projectFolder.path)
    parcels.set(tile, arr)
  }
  sceneJson.name = path.basename(projectFolder)
  fs.writeFileSync(sceneJsonPath, JSON.stringify(sceneJson, null, 2))
}

// update workspaces
{
  const packageJsonPath = path.resolve('package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))
  packageJson.workspaces = projects.map(path.dirname).map(_ => path.relative(process.cwd(), _))
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

// update dcl-workspace.json
{
  const workspaceJsonPath = path.resolve('dcl-workspace.json')
  const workspaceJson = JSON.parse(fs.readFileSync(workspaceJsonPath))
  workspaceJson.folders = projects.map(path.dirname).map(_ => ({ path: path.relative(process.cwd(), _) }))
  fs.writeFileSync(workspaceJsonPath, JSON.stringify(workspaceJson, null, 2))
}

const usedParcels = Array.from(parcels.keys()).sort()
console.log(JSON.stringify(usedParcels, null, 2))

let fail = false
for (const [tile, arr] of parcels) {
  if (arr.length > 1) {
    fail = true
    console.error(`❌🔴 Tile ${tile} has two or more scenes assigned: ${arr.join(',')}`)
  }
}

if (fail) {
  process.exit(1)
}