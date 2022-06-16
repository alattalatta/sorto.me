import { DiscIcon, GearIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'
import { useTheme } from 'next-themes'

import * as styles from './PrefMenu.css'
import * as noScreen from './noScreen.css'

const PrefMenu: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.trigger} type="button">
          <GearIcon />
          <span className={noScreen.root}>설정</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" className={styles.body}>
          <button
            className={styles.themeButton}
            disabled={theme === 'light'}
            type="button"
            onClick={() => setTheme('light')}
          >
            <SunIcon className={styles.themeIcon} />
            라이트 테마
          </button>
          <button
            className={styles.themeButton}
            disabled={theme === 'dark'}
            type="button"
            onClick={() => setTheme('dark')}
          >
            <MoonIcon className={styles.themeIcon} />
            다크 테마
          </button>
          <button
            className={styles.themeButton}
            disabled={theme === 'system'}
            type="button"
            onClick={() => setTheme('system')}
          >
            <DiscIcon className={styles.themeIcon} />
            시스템 테마 사용
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export { PrefMenu }
