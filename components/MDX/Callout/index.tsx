import clsx from 'clsx'
import React from 'react'

import { Anchor } from 'components/basics'

import styles from './styles.module.scss'

export const CalloutCite: React.VFC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <cite className={styles.cite}>
      <Anchor href={href}>{children}</Anchor>
    </cite>
  )
}

const Callout: React.FC<{ childAs?: React.ElementType; color?: 'warn' | 'alert'; label: React.ReactNode }> = ({
  childAs = 'p',
  children,
  color,
  label,
}) => {
  const Body = childAs
  const variant = color ? (color === 'warn' ? styles.variantWarn : styles.variantAlert) : undefined

  return (
    <figure className={clsx(styles.container, variant)}>
      <figcaption className={styles.caption}>{label}</figcaption>
      <Body className={styles.body}>{children}</Body>
    </figure>
  )
}

export default Callout
