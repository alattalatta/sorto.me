import { styled } from 'utils/styler'

import * as DemoProvider from '../DemoProvider'

type Props = {
  codeStrings: DemoProvider.CodeStrings['main']
  onChange: (language: DemoProvider.Language) => void
}

const Root = styled('form', {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 8,
})

const HTMLDemoLanguageChoice: React.VFC<Props> = ({ codeStrings, onChange }) => {
  if (!(codeStrings.css.length || codeStrings.js.length)) {
    return null
  }

  return (
    <Root onChange={(event) => onChange((event.target as HTMLInputElement).value as DemoProvider.Language)}>
      <p>언어 선택:</p>
      <label>
        <input type="radio" name="language" value="html" defaultChecked />
        HTML
      </label>
      {!!codeStrings.css.length && (
        <label>
          <input type="radio" name="language" value="css" />
          CSS
        </label>
      )}
      {!!codeStrings.js.length && (
        <label>
          <input type="radio" name="language" value="js" />
          JavaScript
        </label>
      )}
    </Root>
  )
}

export default HTMLDemoLanguageChoice
