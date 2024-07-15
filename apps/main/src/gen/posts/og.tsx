export function doJSX(title: string, description: string, imageBuffer: ArrayBufferLike): React.ReactElement {
  return (
    <div
      style={{
        background: '#fff',
        color: '#282826',
        display: 'flex',
        height: '100%',
        padding: 16,
        width: '100%',
      }}
    >
      <div
        style={{
          background: '#282826',
          display: 'flex',
          flexGrow: 1,
          margin: '16px 0 0 16px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <img
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            src={imageBuffer as any}
            style={{
              border: '1px solid #282826',
              flexGrow: 1,
              height: 400 - 64 - 32 - 32,
              left: -16,
              objectFit: 'cover',
              top: -16,
              width: 800 - 32,
            }}
          />
          <div
            style={{
              background: '#ffca87',
              border: '1px solid #282826',
              bottom: 16,
              display: 'flex',
              flexDirection: 'column',
              left: 16,
              padding: '0 16px 16px 16px',
              position: 'absolute',
              right: 96,
              wordBreak: 'keep-all',
            }}
          >
            <h1
              style={{
                fontFamily: 'Orbit',
                fontSize: 32,
                fontWeight: 400,
                margin: 0,
                padding: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: 'Orbit',
                fontSize: 18,
                fontWeight: 400,
                margin: '8px 0 0',
                padding: 0,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
