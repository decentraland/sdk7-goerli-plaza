// import { spawn, kill, exit, getPortableExperiencesLoaded } from '@decentraland/PortableExperiences'
// import setTimeout from '../../../helper/setTimeout'

// spawn('urn:decentraland:off-chain:static-portable-experiences:radio')
//   .then((...result) => {
//     dcl.log('PortableExperiences.spawn result ', result)

//     setTimeout(() => {
//       getPortableExperiencesLoaded()
//         .then((...result) => dcl.log('Value of PortableExperiences.getPortableExperiencesLoaded', result))
//         .catch((err) => dcl.error('PortableExperiences.getPortableExperiencesLoaded error', err))
//     }, 1000)

//     setTimeout(() => {
//       kill('urn:decentraland:off-chain:static-portable-experiences:radio')
//         .then((...result) => dcl.log('Value of PortableExperiences.kill', result))
//         .catch((err) => dcl.error('PortableExperiences.kill error', err))
//     }, 5000)
//   })
//   .catch((err) => dcl.error('PortableExperiences.spawn error', err))

// exit()
//   .then((...result) => {
//     dcl.log('PortableExperiences.exit result ', result)
//   })
//   .catch((err) => dcl.error('PortableExperiences.exit error', err))
// // `type PortableExperienceUrn = string
// // type PortableExperienceHandle = {
// //   pid: PortableExperienceUrn
// //   parentCid: string // Identifier of who triggered the PE to allow to kill it only to who created it
// // }
// // type PortableExperienceLoaded = {
// //   portableExperiences: PortableExperienceHandle[]
// // }

// // /**
// //  * Starts a portable experience.
// //  * @param  {SpawnPortableExperienceParameters} [pid] - Information to identify the PE
// //  *
// //  * Returns the handle of the portable experience.
// //  */
// // export function spawn(pid: PortableExperienceUrn): Promise<PortableExperienceHandle>

// // /**
// //  * Stops a portable experience. Only the executor that spawned the portable experience has permission to kill it.
// //  * @param  {string} [pid] - The portable experience process id
// //  *
// //  * Returns true if was able to kill the portable experience, false if not.
// //  */
// // export function kill(pid: PortableExperienceUrn): Promise<boolean>

// // /**
// //  * Stops a portable experience from the current running portable scene.
// //  *
// //  * Returns true if was able to kill the portable experience, false if not.
// //  */
// // export function exit(): Promise<boolean>

// // /**
// //  *
// //  * Returns current portable experiences loaded with ids and parentCid
// //  */
// // export function getPortableExperiencesLoaded(): Promise<PortableExperienceLoaded>
