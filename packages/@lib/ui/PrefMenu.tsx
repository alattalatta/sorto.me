import { GearIcon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'

import * as styles from './PrefMenu.css'
import { ThemeSwitch } from './ThemeSwitch'
import * as noScreen from './noScreen.css'

const PrefMenu: React.FC = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.trigger} type="button">
          <GearIcon />
          <span className={noScreen.root}>설정</span>
        </button>
      </Popover.Trigger>
      <Popover.Content align="end" className={styles.body}>
        <ThemeSwitch />
      </Popover.Content>
    </Popover.Root>
  )
}

export { PrefMenu }
