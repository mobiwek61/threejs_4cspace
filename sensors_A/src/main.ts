// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.ts'
import { sensors } from './util/sensorHelper.ts';
import { QuatAreFun } from './util/QuatAreFun.ts'

// document.querySelector<HTMLDivElement>('#divA')!.innerHTML = 'this is divA'; 
// setDisp('hello2')
setDisp(sensors.xyz())
function setDisp(str:string) {
  //console.log(str)
  document.querySelector<HTMLDivElement>('#divA')!.innerHTML = 'ff ' + str
}
setupOrien()
var sensorOrien:any
// //var currQuat = useRef(new Quaternion())
function setupOrien() {
        //kalmanFilter_ref.current = KalmanFilter.okDamped()//.slowDamped()
        try {
          // ct.current++ // make sure get here only once
          // addEventListener inside useEffect() OR ELSE ADDS hundreds of times!!
          sensorOrien = new AbsoluteOrientationSensor({ frequency: 22, referenceFrame: "device" });
          sensorOrien.addEventListener("reading", () => {
              var eulAngles:any = QuatAreFun.quatEuler(sensorOrien.quaternion)
              //currQuat.current = sensorOrien.quaternion
              //var filtElev = Math.round(kalmanFilter_ref.current!.update(eulAngles.pitch))
              setDisp(eulAngles.pitch)
          });
          sensorOrien.start();
        } catch (ex) { setDisp(JSON.stringify(ex))} 
      }
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
