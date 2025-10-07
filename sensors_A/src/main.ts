// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.ts'
import { sensors } from './util/sensorHelper.ts';
import { KalmanFilter, QuatAreFun } from './util/QuatAreFun.ts'
import { asciiBar } from './util/AiGenStuff.ts'

// document.querySelector<HTMLDivElement>('#divA')!.innerHTML = 'this is divA'; 
// setDisp('hello2')
setDisp(sensors.xyz())
function setDisp(str:string) {
  //console.log(str)
  document.querySelector<HTMLDivElement>('#divA')!.innerHTML = 'ff ' + str
}
setupOrien()
var sensorOrien:any
var kalmanFilter:KalmanFilter
// //var currQuat = useRef(new Quaternion())
var ct:number = 0
function setupOrien() {
        kalmanFilter = KalmanFilter.okDamped()//.slowDamped()
        try {
          // ct.current++ // make sure get here only once
          // addEventListener inside useEffect() OR ELSE ADDS hundreds of times!!
          sensorOrien = new AbsoluteOrientationSensor({ frequency: 22, referenceFrame: "device" });
          sensorOrien.addEventListener("reading", () => {
              var eulAngles:any = QuatAreFun.quatEuler(sensorOrien.quaternion)
              //currQuat.current = sensorOrien.quaternion
              var filtval = Math.round(kalmanFilter!.update(eulAngles.pitch))
              setDisp(eulAngles.pitch + '  kal:' + filtval + '  ct:' + ct++ + '<br/>' + 
                asciiBar(0, 140, eulAngles.pitch) + '<br/>' + asciiBar(0, 140, filtval))
          });
          sensorOrien.start();
        } catch (ex) { setDisp(JSON.stringify(ex))} 
      }
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
