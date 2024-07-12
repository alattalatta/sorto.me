import { useCallback, useEffect, useRef } from 'react'

const Starry: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) {
      return
    }

    const { width, height } = ctx.canvas
    ctx.clearRect(0, 0, width, height)

    const gridSize = 60
    const cols = Math.ceil(width / gridSize)
    const rows = Math.ceil(height / gridSize)

    // dots
    ctx.fillStyle = '#DBA866'
    drawAtGrid(gridSize, cols, rows, (x, y) => {
      const rand = splitmix32(x + y * rows)

      if (irand(rand, 0, 4) === 0) {
        return
      }

      const s = irand(rand, 0, 100)
      const radius = (() => {
        switch (true) {
          case s < 3:
            return 2
          case s < 23:
            ctx.fillStyle = '#DBA866'
            return 1
          default:
            return 0.5
        }
      })()

      ctx.beginPath()
      ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI)
      ctx.fill()
    })

    drawAtGrid(gridSize * 4, Math.ceil(cols / 4), Math.ceil(rows / 4), (x, y) => {
      const armSize = 15

      const rand = splitmix32(x + y * Math.ceil(rows / 4))

      if (irand(rand, 0, 5) > 2) {
        return
      }

      ctx.fillStyle = '#DBA866'
      ctx.beginPath()

      ctx.moveTo(x - armSize, y)
      ctx.lineTo(x - 1, y - 1)
      ctx.lineTo(x, y - armSize)
      ctx.lineTo(x + 1, y - 1)
      ctx.lineTo(x + armSize, y)
      ctx.lineTo(x + 1, y + 1)
      ctx.lineTo(x, y + armSize)
      ctx.lineTo(x - 1, y + 1)

      ctx.fill()

      ctx.fillStyle = '#ffca87'
      ctx.beginPath()

      ctx.ellipse(x, y, 2, 2, 0, 0, 2 * Math.PI)
      ctx.fill()
    })

    function drawAtGrid(gs: number, cc: number, rr: number, drawer: (x: number, y: number) => void) {
      for (let c = 0; c < cc; c++) {
        for (let r = 0; r < rr; r++) {
          const cxs = c * gs
          const cys = r * gs

          const cxe = (c + 1) * gs
          const cye = (r + 1) * gs

          const rand = splitmix32(c + r * rr)

          const x = irand(rand, cxs, cxe)
          const y = irand(rand, cys, cye)

          drawer(x, y)
        }
      }
    }

    function splitmix32(a: number): () => number {
      return function () {
        a |= 0
        a = (a + 0x9e3779b9) | 0
        let t = a ^ (a >>> 16)
        t = Math.imul(t, 0x21f0aaad)
        t = t ^ (t >>> 15)
        t = Math.imul(t, 0x735a2d97)
        return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296
      }
    }

    function irand(rand: () => number, min: number, max: number): number {
      return Math.floor(rand() * (max - min) + min)
    }
  }, [])

  const rescale = useCallback((w: number, h: number) => {
    if (!ref.current) {
      return
    }

    ref.current.width = w
    ref.current.height = h
  }, [])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      rescale(entries[0].contentRect.width, entries[0].contentRect.height)
      draw()
    })
    resizeObserver.observe(ref.current)

    const { width, height } = ref.current.getBoundingClientRect()
    rescale(width, height)
    draw()
  }, [draw, rescale])

  return (
    <canvas
      ref={ref}
      style={{ width: '100%', height: '100%', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
    />
  )
}

export default Starry
