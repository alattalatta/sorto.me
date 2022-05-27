import { useMounted } from '@lib/functions'
import { CircleIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

import * as styles from './ThemeSwitch.css'

interface Props {
  className?: string
}

const ThemeSwitch: React.FC<Props> = ({ className }) => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!mounted) {
      return
    }

    if (inputRef.current && theme === 'system') {
      inputRef.current.indeterminate = true
    }
  }, [theme, mounted])

  if (!mounted) {
    return null
  }

  return (
    <button
      className={clsx(styles.root, className)}
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <span aria-hidden>
        {(() => {
          switch (theme) {
            case 'dark':
              return '라이트 테마로 바꾸기'
            case 'light':
              return '다크 테마로 바꾸기'
            default:
              return '다크 테마로 고정하기'
          }
        })()}
      </span>
      {(() => {
        switch (theme) {
          case 'dark':
            return <SunIcon className={styles.icon} />
          case 'light':
            return <MoonIcon className={styles.icon} />
          default:
            return <CircleIcon className={styles.icon} />
        }
      })()}
    </button>
  )
}

export { ThemeSwitch }
