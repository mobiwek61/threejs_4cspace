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

export { KalmanFilter };