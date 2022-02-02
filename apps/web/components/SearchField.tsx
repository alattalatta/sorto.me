import { styled } from 'utils/styler'

const TextField = styled('input', {
  width: 'auto',
  minWidth: 0,
  height: 52,
  background: '$base100',
  border: '1px solid $base70',
  borderRadius: '$cornerRadius',
  color: '$base40',
  flex: 1,
  fontSize: 20,
  fontFamily: '$mono',
  padding: '16px 24px',
  '&::placeholder': {
    color: '$base60',
  },
})

const SubmitButton = styled('button', {
  height: 52,
  background: '$accentY',
  border: 0,
  borderRadius: '$cornerRadius',
  color: '$base40',
  flexGrow: 0,
  flexShrink: 1,
  fontSize: 20,
  marginLeft: 16,
  padding: '16px 24px',
  whiteSpace: 'nowrap',
})

const Container = styled('form', {
  display: 'flex',
})

type Props = {
  initialValue?: string
  placeholder?: string
  targetUrl: string
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}
const SearchField: React.VFC<Props> = ({ initialValue, placeholder, targetUrl, onSubmit }) => {
  return (
    <Container action={targetUrl} role="search" onSubmit={onSubmit}>
      <TextField defaultValue={initialValue} name="q" placeholder={placeholder} title={placeholder} type="search" />
      <SubmitButton type="submit">검색</SubmitButton>
    </Container>
  )
}

export default SearchField
