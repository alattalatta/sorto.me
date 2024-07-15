export function doJSX(title: string, description: string): React.ReactElement {
  return (
    <div
      style={{
        background: '#282826',
        color: '#ffca87',
        display: 'flex',
        height: '100%',
        padding: '16px 24px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1
          style={{
            fontSize: 48,
            lineHeight: 1.2,
            margin: 0,
            textOverflow: 'ellipsis',
            wordBreak: 'keep-all',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            borderLeft: '4px solid #ffca87',
            color: '#fff',
            display: 'block',
            fontFamily: 'Nanum Gothic Coding',
            fontSize: 32,
            lineHeight: 1.4,
            lineClamp: 3,
            margin: '16px 0 0',
            overflow: 'hidden',
            padding: '0 16px',
            wordBreak: 'keep-all',
          }}
        >
          {description}
        </p>
        <div
          style={{
            background: '#ffca87',
            bottom: 8,
            display: 'flex',
            padding: '8px 16px',
            position: 'absolute',
            right: 0,
          }}
        >
          <svg
            style={{
              height: 58,
              width: 200,
            }}
            viewBox="0 0 650.5 188"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117 4h10l75 180h30V4h2l90 180h10M279 4h30l75 180h3V4h30l75 180h2V4h3l75 180h75M4 184h75V4h3l75 180h10"
              fill="none"
              stroke="#282826"
              strokeLinecap="square"
              strokeWidth="8"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
