import { getUserData } from '~system/UserIdentity'
export let userId: undefined | string = undefined
getUserData({})
  .then((data) => (userId = data.data?.userId))
  .catch(console.error)
