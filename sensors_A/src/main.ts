// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.ts'
import { sensors } from './util/sensorHelper.ts';
import { KalmanFilter, QuatAreFun } from './util/QuatAreFun.ts'
import { asciiBar, asciiBar2 } from './util/AiGenStuff.ts'

// document.querySelector<HTMLDivElement>('#divA')!.innerHTML = 'this is divA'; 
// setDisp('hello2')
setDisp(sensors.xyz())
function setDisp(str:string) {
  document.querySelector<HTMLDivElement>('#divA')!.innerHTML = str
}
setupOrien()
var sensorOrien:{ quaternion: Float32Array }
var kalmanPitch:KalmanFilter, kalmanYaw:KalmanFilter, kalmanRoll:KalmanFilter
/**
 * setup motion sensor from web api.
 * Call this ONCE but no more per page activation. 
 * It uses addEventListener() to setup callbacks when sensor detect change, 
 * which typically redraw the page using new orientation.
 * ref: https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor
 */
function setupOrien() {
        kalmanPitch = KalmanFilter.okDamped()//.slowDamped()
        kalmanYaw = KalmanFilter.okDamped(); kalmanRoll = KalmanFilter.okDamped()
        try {
          // call addEventListener inside useEffect() OR ELSE ADDS hundreds of times!!
          sensorOrien = new AbsoluteOrientationSensor({ frequency: 22, referenceFrame: "device" });
          sensorOrien.addEventListener("reading", () => {
              var eulAngles:any = QuatAreFun.quatEuler(sensorOrien.quaternion)
              var filtPit = Math.round(kalmanPitch!.update(eulAngles.pitch))
              var filtYaw = Math.round(kalmanYaw!.update(eulAngles.yaw))
              var filtRoll = Math.round(kalmanRoll!.update(eulAngles.roll))
              setDisp('<br/>pit:' + asciiBar2(-200, 200, eulAngles.pitch, filtPit) +
                      '<br/>yaw:' + asciiBar2(-180, 180, eulAngles.yaw, filtYaw) + 
                      '<br/>roll:' + asciiBar2(-90, 90, eulAngles.roll, filtRoll)  )
                // + ' sensorOrien3 ' + sensorOrien.toString() )
          });
          sensorOrien.start();
        } catch (ex) { setDisp(JSON.stringify(ex))} 
      }
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
