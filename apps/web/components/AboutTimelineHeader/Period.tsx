import { styled } from 'utils/styler'

const Time = styled('div', {
  fontSize: 14,
  marginTop: 8,
})

type PeriodProps = {
  from: string
  to?: string
}

const Period: React.VFC<PeriodProps> = ({ from, to }) => {
  return (
    <Time>
      <time dateTime={from}>{from}</time>
      {to && (
        <>
          {' ~ '}
          <time dateTime={to}>{to}</time>
        </>
      )}
    </Time>
  )
}

export default Period
