// import { Observer, Equator, Body, SiderealTime } from 'astronomy-engine'; 
import * as AstroEngine from 'astronomy-engine'
 
/**
 * Represents celestial object coordinates in hours + minutes for RA, degrees + minutes for DECLIN.  
 * In constrast, **npm astronomy-engine** uses pure decimal hours for RA, degrees for DECLIN
 */
export interface CelestialCoordsUsingMinutes {
    raHours: number; 
    raMinutes: number; 
    declinatDeg: number; declinatMinutes: number; 
}

/**
 * Converts celestial coordinates from a format using minutes to decimal format.
 * Note: Astronomy.EquatorialCoordinates not useful bc has other 
 * @param {CelestialCoordsUsingMinutes} indata - The input object containing RA and Declination with minutes.
 * @returns  An object with RA in decimal hours and Declination in decimal degrees.
 */
export function ConvertCelestialCordsToDecimal(indata:CelestialCoordsUsingMinutes):
        {RaHours:number, DeclinDegrees:number} {
    const raDegreesDecimal = (indata.raHours + indata.raMinutes / 60 ) // nope.. data stays in hours, not degrees  * 15; // 1 hour = 15 degrees
    const sign = indata.declinatDeg < 0 ? -1 : 1;
    const decDegreesDecimal = sign * (Math.abs(indata.declinatDeg) + indata.declinatMinutes / 60 );
    return {RaHours:raDegreesDecimal, DeclinDegrees:decDegreesDecimal}
}

/** should be JSON but this way to remind me how to make a class in typescript. */
export class earthObserverLocations {
    static newYorkCity: AstroEngine.Observer = 
        new AstroEngine.Observer(40.7128, -74.0060, 10)
       
    static london: AstroEngine.Observer = 
        new AstroEngine.Observer(51.5074, 0.1278, 10)
}

export const celestialObjectsFromTables = {
    // https://astropixels.com/stars/brightstars.html
    // https://astropixels.com/messier/messiercat.html
    'andromedaCoordinates': {
        raHours: 0, raMinutes: 41.8,
        declinatDeg: 41, declinatMinutes: 16
    },

    // https://www.hko.gov.hk/en/gts/astronomy/sun_ra_dec.htm
    'sunCoord_snapshot_2025-07-11 noon gmt': {
        raHours: 7, raMinutes: 24, declinatDeg: 22, declinatMinutes: 1 },
    'sunCoord_snapshot_2025-07-15 13:00 gmt': {  
        raHours: 7, raMinutes: 40, declinatDeg: 21, declinatMinutes: 26 },
    'sunCoord_snapshot_2025-12-04 13:00 gmt': { 
        raHours: 16, raMinutes: 45, declinatDeg: -22, declinatMinutes: 19 },
    'siriusCoordinates': {
        raHours: 6, raMinutes: 45,
        declinatDeg: -16.7, declinatMinutes: 0
    }
}



 /** NOT TESTED!
         * 
         * @returns As the Earth rotates, GAST increases from 0 up to 24 sidereal hours, 
         *   then starts over at 0. To convert to degrees, multiply the return value by 15
         *   Result ignores daylight savings time, so it must be corrected if compared with local clock
         */
        // localSiderialTime() { 
        //     // SiderealTime() returns GAST Greenwich Apparent Sidereal Time, from 0 to 24.
        //     const longitudeHours = this.longitude / 15.0; // convert longitudeDegrees to hours
        //     const siderealHoursNOW_greenwich = AstroEn.SiderealTime(new AstroEn.AstroTime(new Date()))
        //     return siderealHoursNOW_greenwich + longitudeHours
        // }

/*
[
  {"M":"M6","NGC":"6405","Type":"Oc","Mag":4.2,"Size":"25","Dist":1600,"RA":"17h 40.1m","Dec":"-32° 13′","Con":"Sco","Season":"summer","Name":"Butterfly Cluster"},
  {"M":"M7","NGC":"6475","Type":"Oc","Mag":3.3,"Size":"80","Dist":800,"RA":"17h 53.9m","Dec":"-34° 49′","Con":"Sco","Season":"summer","Name":"Ptolemy's Cluster"},
  {"M":"M8","NGC":"6523","Type":"Di","Mag":6.0,"Size":"90x40","Dist":5200,"RA":"18h 03.8m","Dec":"-24° 23′","Con":"Sgr","Season":"summer","Name":"Lagoon Nebula"},
  {"M":"M9","NGC":"6333","Type":"Gc","Mag":7.7,"Size":"9.3","Dist":26700,"RA":"17h 19.2m","Dec":"-18° 31′","Con":"Oph","Season":"summer","Name":""},
  {"M":"M10","NGC":"6254","Type":"Gc","Mag":6.6,"Size":"15.1","Dist":14400,"RA":"16h 57.1m","Dec":"-04° 06′","Con":"Oph","Season":"summer","Name":""}
]
[
  {"M":"M11","NGC":"6705","Type":"Oc","Mag":6.3,"Size":"14","Dist":6000,"RA":"18h 51.1m","Dec":"-06° 16′","Con":"Sct","Season":"summer","Name":"Wild Duck Cluster"},
  {"M":"M12","NGC":"6218","Type":"Gc","Mag":6.7,"Size":"14.5","Dist":16000,"RA":"16h 47.2m","Dec":"-01° 57′","Con":"Oph","Season":"summer","Name":""},
  {"M":"M13","NGC":"6205","Type":"Gc","Mag":5.8,"Size":"16.6","Dist":25100,"RA":"16h 41.7m","Dec":"+36° 28′","Con":"Her","Season":"summer","Name":"Great Hercules Globular"},
  {"M":"M14","NGC":"6402","Type":"Gc","Mag":7.6,"Size":"11.7","Dist":29000,"RA":"17h 37.6m","Dec":"-03° 15′","Con":"Oph","Season":"summer","Name":""},
  {"M":"M15","NGC":"7078","Type":"Gc","Mag":6.2,"Size":"12.3","Dist":33600,"RA":"21h 30m","Dec":"+12° 10′","Con":"Peg","Season":"autumn","Name":"Great Pegasus Globular"}
]
[
  {"M":"M16","NGC":"6611","Type":"Oc","Mag":6.4,"Size":"7","Dist":7000,"RA":"18h 18.8m","Dec":"-13° 47′","Con":"Ser","Season":"summer","Name":"Eagle Nebula"},
  {"M":"M17","NGC":"6618","Type":"Di","Mag":7.0,"Size":"11","Dist":5000,"RA":"18h 20.8m","Dec":"-16° 11′","Con":"Sgr","Season":"summer","Name":"Omega Nebula"},
  {"M":"M18","NGC":"6613","Type":"Oc","Mag":7.5,"Size":"9","Dist":4900,"RA":"18h 19.9m","Dec":"-17° 08′","Con":"Sgr","Season":"summer","Name":""},
  {"M":"M19","NGC":"6273","Type":"Gc","Mag":6.8,"Size":"13.5","Dist":28400,"RA":"17h 02.6m","Dec":"-26° 16′","Con":"Oph","Season":"summer","Name":""},
  {"M":"M20","NGC":"6514","Type":"Di","Mag":9.0,"Size":"28","Dist":5200,"RA":"18h 02.6m","Dec":"-23° 02′","Con":"Sgr","Season":"summer","Name":"Trifid Nebula"}
]
[
  {"M":"M21","NGC":"6531","Type":"Oc","Mag":6.5,"Size":"13","Dist":4250,"RA":"18h 04.6m","Dec":"-22° 30′","Con":"Sgr","Season":"summer","Name":""},
  {"M":"M22","NGC":"6656","Type":"Gc","Mag":5.1,"Size":"24","Dist":10400,"RA":"18h 36.4m","Dec":"-23° 54′","Con":"Sgr","Season":"summer","Name":"Sagittarius Cluster"},
  {"M":"M23","NGC":"6494","Type":"Oc","Mag":6.9,"Size":"27","Dist":2150,"RA":"17h 56.8m","Dec":"-19° 01′","Con":"Sgr","Season":"summer","Name":""},
  {"M":"M24","NGC":"-","Type":"MW","Mag":4.6,"Size":"90","Dist":10000,"RA":"18h 16.9m","Dec":"-18° 30′","Con":"Sgr","Season":"summer","Name":"Sagittarius Star Cloud"},
  {"M":"M25","NGC":"IC4725","Type":"Oc","Mag":6.5,"Size":"40","Dist":2000,"RA":"18h 31.6m","Dec":"-19° 15′","Con":"Sgr","Season":"summer","Name":""}
]
[
  {"M":"M26","NGC":"6694","Type":"Oc","Mag":8.0,"Size":"15","Dist":5000,"RA":"18h 45.2m","Dec":"-09° 24′","Con":"Sct","Season":"summer","Name":""},
  {"M":"M27","NGC":"6853","Type":"Pl","Mag":7.4,"Size":"8.0x5.7","Dist":1250,"RA":"19h 59.6m","Dec":"+22° 43′","Con":"Vul","Season":"summer","Name":"Dumbbell Nebula"},
  {"M":"M28","NGC":"6626","Type":"Gc","Mag":6.8,"Size":"11.2","Dist":18600,"RA":"18h 24.5m","Dec":"-24° 52′","Con":"Sgr","Season":"summer","Name":""},
  {"M":"M29","NGC":"6913","Type":"Oc","Mag":7.1,"Size":"7","Dist":4000,"RA":"20h 23.9m","Dec":"+38° 32′","Con":"Cyg","Season":"summer","Name":""},
  {"M":"M30","NGC":"7099","Type":"Gc","Mag":7.2,"Size":"11","Dist":26100,"RA":"21h 40.4m","Dec":"-23° 11′","Con":"Cap","Season":"autumn","Name":""}
]
*/
    


