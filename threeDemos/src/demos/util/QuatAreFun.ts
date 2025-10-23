
const BRIGHTRED='\x1b[91m' // see showAsciiColors.js
const BRIGHTYELLOW='\x1b[93m';const BRIGHTGREEN='\x1b[92m';const COLRESET='\x1b[0m';const WHITE='\x1b[37m'; const REDBACKGRND='\x1b[41m'
import * as THREE from 'three';

class QuatAreFun {
    /* expects x, y, z, w   returns euler x, y, z in degrees to 2 decimals  */
    static quatEuler(arrayOf_XYZW_floats):Object {
      var quaternion = new THREE.Quaternion()
      quaternion.fromArray(arrayOf_XYZW_floats)
      quaternion.normalize()
      const eul = new THREE.Euler();
      // order of ZXY determined by experimentation!
      eul.setFromQuaternion( quaternion, 'ZXY' )
      return { yaw:   QuatAreFun.rnd(eul.z * (180/Math.PI)), 
               pitch: QuatAreFun.rnd(eul.x * (180/Math.PI)), 
               roll:  QuatAreFun.rnd(eul.y * (180/Math.PI)) };
   }

    static rnd(floatVal:number):number { 
      return Math.round(floatVal)
      // return Math.round(floatVal * 100) / 100; 
    }

    static showQuat(arr:Array<number>):string {
      // const [x, y, z, w] = array;
      // return { x:arr[0].toFixed(2), y:arr[1].toFixed(2), z:arr[2].toFixed(2), w:arr[3].toFixed(2) };
      return ('x:' + arr[0].toFixed(2) + 'y:' + arr[1].toFixed(2) + '\n' +
             'z:' + arr[2].toFixed(2) + 'w:' + arr[3].toFixed(2))
    }

    static rotateOnZaxisBy90(quatToModify:THREE.Quaternion) {
        quatToModify.multiply(
            new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, -1), Math.PI / 2))
        //quatToModify.normalize()
    }

    /* In Three.js, a THREE.Mesh by default faces down the positive Z-axis
     * mesh.lookAt(new THREE.Vector3(0, 0, -1));
     * This rotates the mesh so that its +Z axis now points toward the origin from (0, 0, –1).
     */
    static quatPointingAlongXaxis(doLandscape:boolean):THREE.Quaternion {
      /** me to copilot: "make a THREE.Quaternion pointing along x axis"
       * response: You're trying to rotate an object that by default faces +Z, 
       * and you want it to face +X instead. That means you want to rotate it 
       * around the Y axis, so its forward direction is spun from Z → X. */
      /** copilot response: "For most mesh objects in Three.js — like THREE.Mesh, 
       * THREE.Object3D, and cameras — their local “forward” axis 
       * (the direction they point by default) is: +Z (positive Z axis)" */
      /** this creates Quaternion with no direction, then makes it rotate 
       * along the y axis by -90, effectively setting a z direction to lie
       * along the x axis.     */
      const qqCopilot = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0), // Y axis
          Math.PI / 2                // Rotate -90 degrees (in radians)
      );
      if (doLandscape) QuatAreFun.rotateOnZaxisBy90(qqCopilot)
      return qqCopilot
    }

  /** to copilot: "use THREE.js to make a quaternion from altitude, azimuth"
   * Converts altitude & azimuth to a THREE.Quaternion
   * @param altitudeDeg - Vertical angle above horizon in degrees
   * @param azimuthDeg - Horizontal angle from North, clockwise, in degrees
   * @returns Quaternion facing toward the given spherical direction
   */
  static quaternionFromAltAz(altitudeDeg: number, azimuthDeg: number, doLandscape:boolean): THREE.Quaternion {
      const altitudeRad = THREE.MathUtils.degToRad(altitudeDeg);
      const azimuthRad = THREE.MathUtils.degToRad(azimuthDeg);
      const euler = new THREE.Euler(
          Math.PI / 2 - altitudeRad,  // rotate from zenith downward
          azimuthRad,                 // compass direction
          0,                          // no roll
          'YXZ'                       // yaw-pitch-roll order
      );
      var ret:THREE.Quaternion = new THREE.Quaternion().setFromEuler(euler);
      if (doLandscape) QuatAreFun.rotateOnZaxisBy90(ret)
        console.log('asdf')
      return ret
  }

}

  class KalmanFilter {
    /**
     * Creates a new KalmanFilter instance with slow damping settings.
     * @returns {KalmanFilter} A new instance of KalmanFilter with predefined parameters.
     */
    q:number; r:number; x:number; p:number; k:number;
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
    constructor(q:number, r:number, x:number, p:number, k:number) {
        this.q = q; // Process noise covariance
        this.r = r; // Measurement noise covariance
        this.x = x; // Initial state
        this.p = p; // Initial estimation error covariance
        this.k = k; // Kalman gain
    }

    update(measurement:any) {
        this.p += this.q; // Prediction step
        this.k = this.p / (this.p + this.r); // Update step
        this.x += this.k * (measurement - this.x);
        this.p *= (1 - this.k);
        return this.x.toFixed(0);
    }
}

//   export { quatEuler, showQuat }  
// export default QuatAreFun // import QuatAreFun from './ThreeD/quaternionsAreFun.ts'
export { QuatAreFun, KalmanFilter } // import { QuatAreFun } from './ThreeD/quaternionsAreFun.ts'

  //   function quaternionToEulerDegrees2(array):Object {
  //     const [x, y, z, w] = array;
  //     let yaw = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
  //     let roll = Math.asin(2 * (w * y - z * x));
  //     let pitch = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
  //     // radians to degrees
  //     yaw = yaw * (180 / Math.PI); pitch = pitch * (180 / Math.PI); roll = roll * (180 / Math.PI);
  //     return { yaw: round2(yaw), pitch: round2(pitch), roll: round2(roll) };
  // }