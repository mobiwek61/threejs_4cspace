
/** basic orientation sensors demo. does not include three.js */
import { sensors } from '../util/sensorHelper.ts';
import { KalmanFilter, QuatAreFun } from '../util/QuatAreFun.ts'
import { asciiBar, asciiBar2 } from '../util/AiGenStuff.ts'

var mainDiv: HTMLDivElement
function sensorDemo(args:Object): HTMLElement {
  mainDiv = document.createElement('div'); mainDiv.id = 'mainDiv';
  // put style into doc. with ai helping..
  const style = document.createElement('style');
  style.textContent = '.fontX { font-size: 30px; } '+
      '#mainDiv { width: 100vw; font-size: 4.8vw;position: absolute;top: 20px;font-weight: bold;}';
  document.head.appendChild(style);
  updateDisplay(mainDiv, 'starting sensor demo...') 
  startupDemo()
  return mainDiv;
}
// document.querySelector<HTMLDivElement>('#divA')!.innerHTML = 'this is divA'; 
// setDisp('hello2')
// updateDisplay(sensors.xyz())
function updateDisplay(target:HTMLElement, str:string) {
  target.innerHTML = str
}

var sensorOrien:{ quaternion: Float32Array }
var kalmanPitch:KalmanFilter, kalmanYaw:KalmanFilter, kalmanRoll:KalmanFilter
/**
 * setup motion sensor from web api.
 * Call this ONCE but no more per page activation. 
 * It uses addEventListener() to setup callbacks when sensor detect change, 
 * which typically redraw the page using new orientation.
 * ref: https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor
 */
function startupDemo() {
        kalmanPitch = KalmanFilter.okDamped()//.slowDamped()
        kalmanYaw = KalmanFilter.okDamped(); kalmanRoll = KalmanFilter.okDamped()
        try {
          // call addEventListener inside useEffect() OR ELSE ADDS hundreds of times!!
          sensorOrien = new AbsoluteOrientationSensor({ frequency: 22, referenceFrame: "device" });
          updateDisplay(mainDiv, "adfasdffd)");
          sensorOrien.addEventListener("reading", () => {
              var eulAngles:any = QuatAreFun.quatEuler(sensorOrien.quaternion)
              var filtPit = Math.round(kalmanPitch!.update(eulAngles.pitch))
              var filtYaw = Math.round(kalmanYaw!.update(eulAngles.yaw))
              var filtRoll = Math.round(kalmanRoll!.update(eulAngles.roll))
              updateDisplay(mainDiv, '<br/>pit:' + asciiBar2(-200, 200, eulAngles.pitch, filtPit) +
                      '<br/>yaw:' + asciiBar2(-180, 180, eulAngles.yaw, filtYaw) + 
                      '<br/>roll:' + asciiBar2(-90, 90, eulAngles.roll, filtRoll)  )
                // + ' sensorOrien3 ' + sensorOrien.toString() )
          });
          sensorOrien.start();
        } catch (ex) { updateDisplay(mainDiv, JSON.stringify(ex))} 
      }
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
export { sensorDemo }
