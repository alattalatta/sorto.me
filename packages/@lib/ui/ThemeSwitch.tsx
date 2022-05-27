import { useMounted } from '@lib/functions'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

import * as styles from './ThemeSwitch.css'
import * as noScreen from './noScreen.css'

const ThemeSwitch: React.FC = () => {
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
    <label className={styles.root} title={`클릭하면 ${theme === 'light' ? '어두운' : '밝은'} 테마로 고정합니다.`}>
      <svg className={styles.icon} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.54 12.68A7.54 7.54 0 0 1 7.99 0a8.04 8.04 0 1 0 7.55 12.68Z" />
      </svg>
      <input
        ref={inputRef}
        checked={theme === 'light'}
        className={`${noScreen.root} ${styles.checkbox}`}
        type="checkbox"
        onChange={(e) => (e.target.checked ? setTheme('light') : setTheme('dark'))}
      />
      <span className={styles.switchi} />
      <svg className={styles.icon} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" />
      </svg>
    </label>
  )
}

export { ThemeSwitch }
