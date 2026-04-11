// via51-beta/src/core/index.ts

import { Via51BlackBox } from './engine/blackBox';

/**
 * PROTOCOLO DE SELLADO (Black Box)
 * Solo se permite la interacción a través de drivers controlados.
 */
const CoreInstance = Object.freeze(new Via51BlackBox());

export default CoreInstance;