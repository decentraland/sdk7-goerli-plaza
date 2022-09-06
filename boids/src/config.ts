import { isPreviewMode, PreviewModeResponse } from '~system/EnvironmentAPI'


//set in preview mode from env, local == preview
isPreviewMode( {} ).then(function(val:PreviewModeResponse){
  setInPreview(val.isPreview);
})

//using search service 
//https://github.com/decentraland/decentrally-service
const SERVICES_DOMAIN = 
  //"http://localhost:5001"
  "https://decentrally-service.decentraland.net"

export class Config{
  IN_PREVIEW = false // can be used for more debugging of things, not meant to be enabled in prod
 
  //shows 2d ui debug buttons
  TEST_CONTROLS_ENABLE = true


}

export const CONFIG = new Config()


export function setInPreview(val: boolean) {
  log("setInPreview " + val)
  CONFIG.IN_PREVIEW = val

  //var console: any
}


