const fs = require('fs')
const path = require('path')
const glob = require('glob')

const projects = glob.sync('*/scene.json', { absolute: true })

const parcels = new Map()

let maxX = -150
let maxY = -150
let minX = 150
let minY = 150

let maxXName = ''
let maxYName = ''
let minXName = ''
let minYName = ''

for (const projectFolder of projects.map(path.dirname)) {
  const sceneJsonPath = path.resolve(projectFolder, 'scene.json')
  const sceneJson = JSON.parse(fs.readFileSync(sceneJsonPath))
  for (let i = 0; i < sceneJson.scene.parcels.length; ++i) {
    const tile = sceneJson.scene.parcels[i]
    const x = parseInt(tile.split(',')[0])
    const y = parseInt(tile.split(',')[1])

    if (!projectFolder.includes('tree')) {
      if (x < minX) {
        minX = x
        minXName = projectFolder
      }
      if (y < minY) {
        minY = y
        minYName = projectFolder
      }
      if (x > maxX) {
        maxX = x
        maxXName = projectFolder
      }
      if (y > maxY) {
        maxY = y
        maxYName = projectFolder
      }
      console.log(projectFolder, x, y)

      sceneJson.scene.parcels[i] = `${x - 91},${y}`
    }

    const arr = parcels.get(tile) || []
    arr.push(projectFolder.path)
    parcels.set(tile, arr)
  }

  if (!projectFolder.includes('tree')) {
    const x = parseInt(sceneJson.scene.base.split(',')[0])
    const y = parseInt(sceneJson.scene.base.split(',')[1])
    sceneJson.scene.base = `${x - 91},${y}`
  }

  sceneJson.display.title = path.basename(projectFolder)
  sceneJson.name = path.basename(projectFolder)
  fs.writeFileSync(sceneJsonPath, JSON.stringify(sceneJson, null, 2))
}

// update workspaces
{
  const packageJsonPath = path.resolve('package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))
  packageJson.workspaces = projects
    .map(path.dirname)
    .map((_) => path.relative(process.cwd(), _))
    .sort()
  packageJson.dependencies['@dcl/sdk'] = 'next'
  packageJson.dependencies['@dcl-sdk/utils'] = 'next'
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

// update dcl-workspace.json
{
  const workspaceJsonPath = path.resolve('dcl-workspace.json')
  const workspaceJson = JSON.parse(fs.readFileSync(workspaceJsonPath))
  workspaceJson.folders = projects
    .map(path.dirname)
    .map((_) => ({ path: path.relative(process.cwd(), _) }))
    .sort()
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

console.log(minX, maxX, minY, maxY)
console.log(minXName, maxXName, minYName, maxYName)
