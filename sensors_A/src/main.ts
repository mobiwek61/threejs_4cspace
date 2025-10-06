import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { sensors } from './util/sensorHelper.ts';

document.querySelector<HTMLDivElement>('#divA')!.innerHTML = `
  <div>
    this is divA ${sensors.xyz()}
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
