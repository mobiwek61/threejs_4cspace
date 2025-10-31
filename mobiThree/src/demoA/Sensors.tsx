
import React, { useEffect, useState, useRef } from 'react';
// project created using:   npm create vite@latest sensorThreeA -- --template react-ts
import devProjCSS from './devProject.module.css'
import { QuatAreFun } from './ThreeD/quaternionsAreFun.ts'
import { DoThreejs_textDemoA } from './ThreeD/Threejs_textDemo.tsx';
import { Quaternion } from 'three'; // npm install --save-dev @types/three
// using lib is overkill. use code lifted from ai below...    npm install kalmanjs  //import KalmanFilter from 'kalmanjs';

export interface DisplaySpec {    text:string, elevation:number}

function DoOrientTest() {
    // addEventListener inside useEffect() OR ELSE ADDS hundreds of times!!
    var sensorOrien:AbsoluteOrientationSensor
    var currQuat = useRef(new Quaternion())
    const oldElev = useRef(0), oldQuatDisp = useRef('')
    const kalmanFilter_ref = useRef<KalmanFilter | null>(null) // notation prevents warnings about null
    var ct = useRef(0)
    /** IMPORTANT! crashes occur if dispSpec is an object (versus a string), AND sensorOrien.stop() is never 
     * called when leaving page! page-exit logic is in "return()" thing within useEffect()  */
    const [dispSpec, setdispSpec] = useState<DisplaySpec>({text:'123456', elevation:0}); 
    useEffect(() => { 
        kalmanFilter_ref.current = KalmanFilter.okDamped()//.slowDamped()
        try {
          // ct.current++ // make sure get here only once
          // addEventListener inside useEffect() OR ELSE ADDS hundreds of times!!
          sensorOrien = new AbsoluteOrientationSensor({ frequency: 22, referenceFrame: "device" });
          sensorOrien.addEventListener("reading", () => {
              var eulAngles:any = QuatAreFun.quatEuler(sensorOrien.quaternion)
              currQuat.current = sensorOrien.quaternion
              var filtElev = Math.round(kalmanFilter_ref.current!.update(eulAngles.pitch))
              if (oldElev.current != filtElev) {
                setdispSpec( // even if data is same, new object created and redraw triggered
                  { text: filtElev.toString(), elevation: filtElev })
                oldElev.current = filtElev
              }
              if (oldQuatDisp.current != QuatAreFun.showQuat(sensorOrien.quaternion)) {
                //console.log('afweefwe')
                oldQuatDisp.current = QuatAreFun.showQuat(sensorOrien.quaternion)
                // to get rid of TS warnings, use the non-null assertion operator (!)
                document.querySelector('#yaw')!.textContent = ''+ +eulAngles.yaw
                document.querySelector('#pitch')!.textContent = ''+eulAngles.pitch
                document.querySelector('#roll')!.textContent = ''+eulAngles.roll
                document.querySelector('#quat')!.textContent = oldQuatDisp.current
              }
          });
          sensorOrien.addEventListener("error", (err:any) => { 
            console.log('sensor error: ' + err.error); 
            throw new Error(err.error) 
          })
          sensorOrien.start();
          // NOTE: very important to stop the sensor, else weird crashes occur upon unmount
          // NOTE2: crashes only happen when 
          return () => {  // INVOKED WHEN COMPONENT UNMOUNTED!
              sensorOrien.stop()
          };
        } catch (ex) { 
          console.log("sensor problem: " + ex)
        }
    }, []); 
     
    function calc_width_usingborder(bwidth: string, borderSpec: string) {
        return {border: bwidth + ' ' + borderSpec, 
          width:'calc(100% - ' + bwidth + ' * 2)', height:'calc(100% - ' + bwidth + ' * 2.5)'}
    }
    //const gr1 = { border:'2px dotted red'}, gr2 = { width:'3em' }

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.textContent = 
    `.gr1 {border: 12px dotted red; padding: 4px; font-weight: bold;}
     .gr2 {background-color: lightyellow;  margin-left: 10px; } `;
    document.head.appendChild(style);

    return(<div style={ calc_width_usingborder('9px', 'dotted green') }>
      <div style={{ width:'100%', height:'100%'}}>
        < DoThreejs_textDemoA dispSpec={dispSpec} deviceOrienQuatArray={currQuat.current} />
      </div>
      {/* useState causes refresh of this component */}
      {/* NOTE: because of 90 rotate, bottom is right */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 3fr', 
             position:'absolute', bottom:'0px', fontSize: '1.5em',
             // transform:'rotateZ(90deg)' right:'10px', width:'80vw', gap:'10px',
             }} >
              {/* ///////////////////////////// */}
        {/* <div style={gr1}>Yaw</div><div id='yaw' style={{...gr1, ...gr2}}>-</div>
        <div style={gr1}>Pitch</div><div id='pitch' style={{...gr1, ...gr2}}>-</div>
        <div style={gr1}>Roll</div><div id='roll' style={{...gr1, ...gr2}}>-</div>
        <div style={gr1}>quat</div><div id='quat' style={gr1}>-</div> */}
        <div className="gr1">Yaw</div>
        <div id="yaw" className="gr1 gr2">-</div>

        <div className="gr1">Pitch</div>
        <div id="pitch" className="gr1 gr2">-</div>

        <div className="gr1">Roll</div>
        <div id="roll" className="gr1 gr2">-</div>

        <div className="gr1">quat</div>
        <div id="quat" className="gr1">-</div>

      </div></div>)
  }


  
  class KalmanFilter {
    q: number;  r: number;  x: number;  p: number;  k: number;
    /**
     * Creates a new KalmanFilter instance with slow damping settings.
     * @returns {KalmanFilter} A new instance of KalmanFilter with predefined parameters.
     */
    static slowDamped() { return new KalmanFilter(.004, 11, 0, 1, 0.05) }
    static okDamped() { return new KalmanFilter(1, 33, 0, 1, 0.05); }

    /**  code and descripition from AI
      Parameters Explanation  
      q (Process Noise Covariance)  
        This controls how much the filter trusts the prediction model.  
        A low value means the filter assumes little change between measurements.  
        A high value allows the filter to be more adaptive to changes.  
      r (Measurement Noise Covariance)  
        This defines how much noise the sensor readings are expected to have.  
        A low value makes the filter trust the sensor data more.  
        A high value makes the filter smooth out noisy measurements aggressively.  
        x Initial state  
        p Initial estimation error covariance  
        k Kalman gain  
    */
    constructor(q: number, r: number, x: number, p: number, k: number) {
        this.q = q; // Process noise covariance
        this.r = r; // Measurement noise covariance
        this.x = x; // Initial state
        this.p = p; // Initial estimation error covariance
        this.k = k; // Kalman gain
    }

    update(measurement: number) : string {
        this.p += this.q; // Prediction step
        this.k = this.p / (this.p + this.r); // Update step
        this.x += this.k * (measurement - this.x);
        this.p *= (1 - this.k);
        return this.x.toFixed(0);
    }
}
  
  // function quaternionToPitchYaw(quaternionIn) { // Copilot!
  //   const [ x, y, z, w ] = quaternionIn;
  //   let pitch = Math.asin(2 * (w * x - y * z));
  //   let yaw = Math.atan2(2 * (w * y + x * z), 1 - 2 * (x * x + y * y));
  //   // Convert radians to degrees
  //   pitch = pitch * (180 / Math.PI);
  //   yaw = yaw * (180 / Math.PI);
  //   return { yaw: yaw, pitch: pitch };
  // }
  
  export { DoOrientTest } ;

  // function zzzDoOrientTest() {
  //   const sensor = new AbsoluteOrientationSensor();
  //   sensor.start();
  //   sensor.addEventListener("error", (error) => {
  //       console.log(error)
  //       if (event.error.name === "SecurityError")
  //         console.log("No permissions to use AbsoluteOrientationSensor.");
  //       }); 
    
  //   let gyro = new Gyroscope({ frequency: 60 });

  //   gyro.addEventListener("reading", (e) => {
  //     if (Math.abs(gyro.x) + Math.abs(gyro.y) + Math.abs(gyro.z) > 0.8) {
  //       console.log(`Angular velocity along the X-axis ${gyro.x}`);
  //       console.log(`Angular velocity along the Y-axis ${gyro.y}`);
  //       console.log(`Angular velocity along the Z-axis ${gyro.z}`);
  //     }
  //   });
  //   gyro.start();

  //   return(
  //     <><div className={devProjCSS.divInMiddle}>Orientation test!</div></>
  //   )
  // }


   // sensorOrien.addEventListener("error", sensorErrorHandler)
        // sensorOrien.addEventListener("error", (err) => { 
        //     console.log('sensor!: ' + err); 
        //     throw new Error(err.error) 
        // })

        // const xxborderInFrameStyle = {border: bwidth + ' dotted green', 
        //   width:'calc(100% - ' + bwidth + ' * 2)', height:'calc(100% - ' + bwidth + ' * 2)'}