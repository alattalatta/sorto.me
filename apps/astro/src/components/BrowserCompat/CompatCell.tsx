import type { BrowserName, SimpleSupportStatement, SupportStatement } from '@mdn/browser-compat-data'

import styles from './CompatCell.module.scss'
import { NonStandard } from './StatusIcon'
import { determineStatus, hasSupportDetail, supportLabel } from './utils'

type Props = {
  browser: BrowserName
  data: SupportStatement
  onClick?: (browser: BrowserName, notes: SupportStatement) => void
}

const CompatCell: React.FC<Props> = ({ browser, data, onClick }) => {
  const sup = hasSupportDetail(data)
  const head = Array.isArray(data) ? data[0] : data

  return (
    <td className={styles.root} data-variant={variantOf(head)}>
      <button
        className={styles.cell}
        title={sup ? '특이사항 있음. 세부사항 열기/닫기' : '세부사항 열기/닫기'}
        type="button"
        onClick={() => onClick?.(browser, data)}
      >
        <SupportIcon support={variantOf(head)} />
        {supportLabel(data)}
        <span aria-hidden>{sup && '*'}</span>
        {head?.alternative_name && <NonStandard title="비표준 이름" />}
        <span className="no-screen">특이사항 있음.</span>
        <span className="no-screen">세부사항 열기/닫기</span>
      </button>
    </td>
  )
}

export default CompatCell

const SupportIcon: React.FC<{ support: 'yes' | 'no' | 'partial' | 'unknown' }> = ({ support }) => {
  switch (support) {
    case 'yes':
      return (
        <>
          <span className="no-screen">지원</span>
          <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </>
      )
    case 'no':
      return (
        <>
          <span className="no-screen">미지원</span>
          <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </>
      )
    case 'partial':
      return (
        <>
          <span className="no-screen">부분지원</span>
          <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </>
      )
    case 'unknown':
      return (
        <>
          <span className="no-screen">데이터 없음</span>
          <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </>
      )
  }
}

function variantOf(statement: SimpleSupportStatement | undefined): 'yes' | 'no' | 'partial' | 'unknown' {
  if (!statement) {
    return 'unknown'
  }

  const status = determineStatus(statement)

  switch (status) {
    case 'removed':
    case 'no':
      return 'no'
    case 'unknown':
      return 'unknown'
    case 'added':
    case 'yes':
      return statement.partial_implementation ? 'partial' : 'yes'
  }
}
