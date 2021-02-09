import { StatusBlock } from '@mdn/browser-compat-data/types'
import deprecatedIcon from '@mdn/dinocons/emojis/thumbs-down.svg'
import experimentalIcon from '@mdn/dinocons/general/flask.svg'
import nonStandardIcon from '@mdn/dinocons/notifications/exclamation-triangle.svg'
import React from 'react'

import { styled, BASE70 } from 'utils/styler'

import { Icon } from './shared'

const StatusIconsWrap = styled('div', {
  minWidth: 1,
  minHeight: 1,
  display: 'flex',
  flexWrap: 'nowrap',
  marginLeft: 'auto',
})

const IconTooltip = styled('abbr', {
  cursor: 'help',
  padding: 2,
  '&:hover': {
    background: BASE70,
  },
})

const SpecStatusIcons: React.VFC<{ status: StatusBlock | undefined }> = ({ status }) => {
  if (!status) {
    return <StatusIconsWrap />
  }

  return (
    <StatusIconsWrap>
      {!status.standard_track && (
        <IconTooltip title="표준 기능이 아님. 크로스 브라우저 지원이 미흡할 수 있습니다.">
          <Icon src={nonStandardIcon} alt="비표준" />
        </IconTooltip>
      )}
      {status.deprecated && (
        <IconTooltip title="표준 명세에서 폐기. 더 이상 사용하지 않는 것이 좋습니다.">
          <Icon src={deprecatedIcon} alt="폐기" />
        </IconTooltip>
      )}
      {status.experimental && (
        <IconTooltip title="실험적 기능. 동작이 바뀔 수 있습니다.">
          <Icon src={experimentalIcon} alt="실험적" />
        </IconTooltip>
      )}
    </StatusIconsWrap>
  )
}

export default SpecStatusIcons
