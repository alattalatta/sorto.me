import { styled } from 'utils/styler'

type EntryDetailProps = {
  onShrinkRequest: () => void
}

export type EntryDetailComponent = React.VFC<EntryDetailProps>

export const DetailHeading = styled('h3', {
  marginTop: 24,
})

export const Works = styled('ul', {
  marginTop: 8,
})
