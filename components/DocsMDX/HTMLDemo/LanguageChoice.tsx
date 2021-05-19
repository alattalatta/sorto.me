import { styled } from 'utils/styler'

import * as DemoProvider from '../DemoProvider'

type Props = {
  codeBlocks: DemoProvider.CodeBlocks['main']
  onChange: (language: DemoProvider.Language) => void
}

const Root = styled('form', {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 8,
})

const HTMLDemoLanguageChoice: React.VFC<Props> = ({ codeBlocks, onChange }) => {
  return (
    <Root onChange={(event) => onChange((event.target as HTMLInputElement).value as DemoProvider.Language)}>
      <p>언어 선택:</p>
      {!!codeBlocks.html.size && (
        <label>
          <input type="radio" name="language" value="html" defaultChecked />
          HTML
        </label>
      )}
      {!!codeBlocks.css.size && (
        <label>
          <input type="radio" name="language" value="css" />
          CSS
        </label>
      )}
      {!!codeBlocks.js.size && (
        <label>
          <input type="radio" name="language" value="js" />
          JavaScript
        </label>
      )}
    </Root>
  )
}

export default HTMLDemoLanguageChoice
