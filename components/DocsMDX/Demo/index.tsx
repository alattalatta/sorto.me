import { useEffect, useState } from 'react'

import { FloatClear } from 'components/MDX/Floater'

import LiveExample from '../LiveExample'
import styles from './styles.module.scss'

type Lang = 'css' | 'html' | 'js'
type Props = {
  height?: number
  primary?: Lang
}

const Demo: React.VFC<Props> = ({ height = 240, primary = 'html' }) => {
  const [activeLang, setActiveLang] = useState(primary)
  const [primaryBlocks, setPrimaryBlocks] = useState<Partial<Record<Lang, HTMLElement | null>>>({})

  useEffect(() => {
    setPrimaryBlocks({
      css: getPrimaryLanguageBlock('css'),
      html: getPrimaryLanguageBlock('html'),
      js: getPrimaryLanguageBlock('js'),
    })

    if (primaryBlocks[primary]?.dataset['codeblockSub'] === 'true') {
      console.warn(
        `Active primary lang does not match. Expected ${primary}, but something else is active.`,
        primaryBlocks,
      )
    }

    console.log(primaryBlocks)
  }, [])

  // update primary blocks' sub status
  useEffect(() => {
    for (const val of Object.values(primaryBlocks)) {
      val && (val.dataset['codeblockSub'] = 'true')
    }

    const activePrimaryBlock = primaryBlocks[activeLang]
    if (activePrimaryBlock) {
      activePrimaryBlock.dataset['codeblockSub'] = 'false'
    }
  }, [activeLang])

  const choosableLangs = Object.entries(primaryBlocks).filter(([, val]) => Boolean(val)) as [Lang, HTMLElement][]

  return (
    <div>
      <FloatClear />
      <aside className={styles.floater}>
        <LiveExample height={height} name="demo" />
        {choosableLangs.length > 1 && (
          <div className={styles.buttons}>
            {choosableLangs.map(
              ([lang, val]) =>
                val && (
                  <button
                    key={lang}
                    className={styles.button}
                    type="button"
                    onClick={() => setActiveLang(lang as Lang)}
                  >
                    <span
                      className={activeLang === lang ? styles.buttonHighlightActive : styles.buttonHighlightInactive}
                    >
                      {lang.toUpperCase()}
                    </span>
                  </button>
                ),
            )}
          </div>
        )}
      </aside>
    </div>
  )

  function getPrimaryLanguageBlock(lang: Lang): HTMLElement | null {
    const dataIDSelector = `[data-codeblock-name=demo]`
    const selector = `code${dataIDSelector}[class~="language-${lang}"]:not([hidden])`

    return document.querySelector(selector)
  }
}

export default Demo
