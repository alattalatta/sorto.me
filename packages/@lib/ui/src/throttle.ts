// [todo] Move to functions

type Options = {
  leading?: boolean
  trailing?: boolean
}

function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  interval: number,
  options?: Readonly<Options>,
): (...args: A) => void {
  let handle: number | null = null
  const leading = options?.leading ?? true
  const trailing = leading ? false : options?.trailing ?? !leading

  const throttled = (...args: A): void => {
    let callNow = leading && !handle

    if (!handle) {
      handle = window.setTimeout(() => {
        handle = null

        if (trailing) {
          fn(...args)
        }
      }, interval)
    }

    if (callNow) {
      callNow = false
      fn(...args)
    }
  }

  return throttled
}

export { throttle }
