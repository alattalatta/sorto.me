import type { Tween } from 'framer-motion'
import type { Easing } from 'framer-motion/types/types'

export const STANDARD_EASE: Easing = [0.4, 0, 0.2, 1]

/** Returns a standard easing definition object. */
export function easeStandard(duration: number): Tween {
  return {
    type: 'tween',
    ease: STANDARD_EASE,
    duration,
  }
}
