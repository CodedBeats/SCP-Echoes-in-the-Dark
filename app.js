// === styling ===
// main
import './ui/styles.css'
import './ui/splash/splash.css'
import './ui/menu/menu.css'
import './ui/home/home.css'
import './ui/investigate/investigate.css'
import './ui/investigate/operativeGear.css'
// ==================== //

// === js components === //
import {navigatorComponent} from './ui/navigator'
import {investigateComponent} from './ui/investigate/investigate'
import {themeMusicComponent} from './sfx/background/themeMusic'
import {spawnSCPsComponent} from './SCPs/spawnSCPs'

AFRAME.registerComponent('navigator-component', navigatorComponent)
AFRAME.registerComponent('investigate-component', investigateComponent)
AFRAME.registerComponent('theme-music-component', themeMusicComponent)
AFRAME.registerComponent('spawn-scps-component', spawnSCPsComponent)
// ==================== //
