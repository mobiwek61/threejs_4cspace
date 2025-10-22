import * as AstroEngine from 'astronomy-engine'; // Assuming 'astronomy-engine' is the correct module name
import * as RefData from './ReferenceData'

/**
 * Calculates and logs the horizontal coordinates (altitude and azimuth) for a given celestial object
 * from a specified observer's location.
 *
 * @param objectName The (freeform) name of the celestial object (e.g., "The Andromeda Galaxy").
 * @param coordsDecimalNotMinutes The celestial coordinates of the object
 * @param observerLocation The observer's location as an ObserverLocation object.
 * @returns 
 */
function getAltAzimuth(
    date:Date,
    objectName: string,
    coordsDecimalNotMinutes: {RaHours:number, DeclinDegrees:number},
    observerLocation: AstroEngine.Observer
): HorizontalCoordinatesWrapper {
    const horizontalCoords: AstroEngine.HorizontalCoordinates = AstroEngine.Horizon(
        date,
        observerLocation,
        coordsDecimalNotMinutes.RaHours,
        coordsDecimalNotMinutes.DeclinDegrees
    );
    return new HorizontalCoordinatesWrapper(objectName, horizontalCoords, date)
}

class HorizontalCoordinatesWrapper {
  objectName: string;
  hCords: AstroEngine.HorizontalCoordinates;
  date?: Date | null
  constructor(objectName: string, 
              earthHorizonCords: AstroEngine.HorizontalCoordinates, date?:Date) {
    this.objectName = objectName; this.hCords = earthHorizonCords; 
    this.date = date ?? new Date(); // Use current date if null or undefined
  }
  toString() {
    var outs = (`getAltAzimuth: \n  ${this.objectName} `);
    outs += (`\n  Elevation : ${this.hCords.altitude.toFixed(2)} degrees`);
    outs += (`,  Azimuth: ${this.hCords.azimuth.toFixed(2)} degrees`);
    outs += (`,  ${this.date?.toLocaleDateString()}  ${this.date?.getHours()}h`);
    return outs
  }
}

export function getSunHorizCords() {
   var sunNOW:AstroEngine.EquatorialCoordinates = 
       AstroEngine.Equator(AstroEngine.Body.Sun, 
       new AstroEngine.AstroTime(new Date()), 
       new AstroEngine.Observer(0, 0, 0), true, false);
   var foo = getAltAzimuth(new Date(), "Sun NYC", 
        { RaHours:sunNOW.ra, DeclinDegrees:sunNOW.dec}, 
        RefData.earthObserverLocations.newYorkCity );
   console.log(foo.toString())
}

function testMe() {
    // Example usage for the Sun from New York City
    // For precise Sun data, Astronomy.Horizon(date, observer, Astronomy.Body.Sun) is more direct
    // This example uses the CelestialCoordinates object for consistency with other celestial objects
    // https://aa.usno.navy.mil/data/AltAz

    console.log('444 ' + RefData.earthObserverLocations.newYorkCity.constructor.name)
    var foo:HorizontalCoordinatesWrapper = 
      getAltAzimuth(new Date(),  "Sun (sunCoord_snapshot_2025-07-11 noon gmt)", 
        RefData.ConvertCelestialCordsToDecimal(
           RefData.celestialObjectsFromTables['sunCoord_snapshot_2025-07-11 noon gmt']), 
        RefData.earthObserverLocations.newYorkCity );
    console.log(foo.toString())
    foo =  getAltAzimuth(new Date(), "Sun (sunCoord_snapshot_2025-07-15 13:00 gmt)", 
        RefData.ConvertCelestialCordsToDecimal(
           RefData.celestialObjectsFromTables['sunCoord_snapshot_2025-07-15 13:00 gmt']), 
        RefData.earthObserverLocations.newYorkCity );
    console.log(foo.toString())
    // to ai: display alt and azimuth of sun in nyc on dec 4 2025 at 1pm dont show code
    const futureDt = new Date(2025, 11, 4, 12); // -1 for DST
    foo =  getAltAzimuth(futureDt, "Sun (sunCoord_snapshot_2025-12-04 13:00 gmt)", 
        RefData.ConvertCelestialCordsToDecimal(
           RefData.celestialObjectsFromTables['sunCoord_snapshot_2025-12-04 13:00 gmt']), 
        RefData.earthObserverLocations.newYorkCity );
    console.log(foo.toString())
    // date demo (daylight savings??) console.log('bb ' + new Date().toUTCString() + '  ' + new AstroEngine.AstroTime(new Date()).date.toUTCString())

    var sunNOW:AstroEngine.EquatorialCoordinates = 
       AstroEngine.Equator(AstroEngine.Body.Sun, 
       new AstroEngine.AstroTime(new Date()), 
       new AstroEngine.Observer(0, 0, 0), true, false);
    foo = getAltAzimuth(new Date(), "Sun NYC", 
        { RaHours:sunNOW.ra, DeclinDegrees:sunNOW.dec}, 
        RefData.earthObserverLocations.newYorkCity );
    console.log(foo.toString())

    foo = getAltAzimuth(new Date(), "Sun london", 
        { RaHours:sunNOW.ra, DeclinDegrees:sunNOW.dec}, 
        RefData.earthObserverLocations.london );
    console.log(foo.toString())
}

// check using https://phpsciencelabs.com/sidereal-time-calculator/index.php

/**
 * 
 * @param dateParam unix style milliseconds since 1/1/1970
 * @returns 
 */
function getJulianDate(dateParam: Date): number {
  const msecInOneDay = 86400000
  const julianDate1_1_1970 = 2440587.5
  const daysSince1_1_1970 = dateParam.getTime() / msecInOneDay
  return daysSince1_1_1970 + julianDate1_1_1970;
}

export { testMe }

/**
 * This file made using clues from ai, directing them to use npm astronomy-engine. 
 * First used gemini and copilot, but code had nonexistent functions and also failed to show
 * capilalization of S in Astronomy.SiderealTime(new Date()) + longitude/15;
 * This messed me up into thinking the function did not exist.
 * Then used chatgpt and it got it right the first try.
 * "using npm astronomy-engine, make typescript getting local siderial time"
 */
// what is the altitiude and azimuth of astronomical object of ra=7hours and declination of 22degrees
// what is the right ascension and declination of the sun from earth coordinates