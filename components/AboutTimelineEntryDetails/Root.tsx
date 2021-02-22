import { motion as m } from 'framer-motion'
import { useEffect, useRef } from 'react'

import AboutTimelineHeader from 'components/AboutTimelineHeader'
import { Container as ContainerBase, NoScreen } from 'components/basics'
import { TimelineData } from 'data/about'
import { easeStandard, styled } from 'utils/styler'

const Overlay = styled(m.div, {
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  padding: '40px 0',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
})

const Container = styled(ContainerBase, {
  background: '#fff',
  borderRadius: '$cornerRadius',
  padding: '48px 40px',
  '&:focus': {
    outline: 'none',
  },
})

const HeaderWrap = styled('div', {
  display: 'flex',
})

const Body = styled(m.div, {
  fontFamily: '$sans',
  lineHeight: 1.75,
  marginTop: 48,
})

type Props = {
  data: TimelineData
  onShrinkRequest?: () => void
}

const Root: React.FC<Props> = ({ children, data, onShrinkRequest }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    containerRef.current?.focus()
  })

  // shrink iff user clicked the overlay itself, not its descendants.
  const shrinkOnlyWhenSelfClicked: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === overlayRef.current) {
      onShrinkRequest?.()
    }
  }

  return (
    <Overlay
      ref={overlayRef}
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      exit={{ backgroundColor: 'rgba(0, 0, 0, 0)', transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.1 }}
      onClick={shrinkOnlyWhenSelfClicked}
      aria-dialog="true"
      role="dialog"
    >
      <Container
        ref={containerRef}
        as={m.article}
        tabIndex={-1}
        layoutId={data.id}
        transition={easeStandard(0.4)}
        aria-labelledby={`${data.id}-id`}
      >
        <HeaderWrap>
          <AboutTimelineHeader asHeaderElement data={data} />
        </HeaderWrap>
        <Body
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            opacity: easeStandard(0.25),
            y: easeStandard(0.5),
          }}
        >
          {children}
        </Body>
      </Container>
      <NoScreen as="button" type="button" onClick={onShrinkRequest}>
        닫기
      </NoScreen>
    </Overlay>
  )
}

export default Root
