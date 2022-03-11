import * as styles from './StatusIcon.css'

type Props = Omit<JSX.IntrinsicElements['abbr'], 'ref'>

export const Deprecated: React.VFC<Props> = (props) => {
  return (
    <abbr className={styles.root} title="표준 명세에서 폐기. 더 이상 사용하지 않는 것이 좋습니다." {...props}>
      <svg className={styles.svg} role="img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.4 24.8a3.6 3.6 0 11-7.2 0 3.6 3.6 0 117.2 0zm9 28.8v-36a3.62 3.62 0 00-3.6-3.6H8.6A3.62 3.62 0 005 17.6v36a3.62 3.62 0 003.6 3.6h16.2a3.62 3.62 0 003.6-3.6zm63.51-8.38A13.16 13.16 0 0195 53.6a11 11 0 01-10.8 10.8H68.62a13.47 13.47 0 001.63 3.6c1.46 2.92 3.15 6.19 3.15 10.8 0 4.33 0 14.4-12.6 14.4a3.54 3.54 0 01-2.53-1.07c-2.42-2.36-3.1-5.85-3.71-9.17s-1.3-6.64-3.49-8.83a75.84 75.84 0 01-5.68-6.75c-2.48-3.26-7.88-10-10-10.12a3.76 3.76 0 01-3.39-3.6V17.6a3.71 3.71 0 013.6-3.6c2-.06 5.34-1.24 8.89-2.47C50.56 9.44 58.16 6.8 66.2 6.8h7.26c5 .06 8.66 1.52 11.08 4.39 2.13 2.53 3.09 6 2.75 10.18a11.47 11.47 0 013 5.29 11.87 11.87 0 010 6.58 11.87 11.87 0 012.42 7.7 15.2 15.2 0 01-.84 4.28z" />
      </svg>
    </abbr>
  )
}

export const Experimental: React.VFC<Props> = (props) => {
  return (
    <abbr className={styles.root} title="실험적 기능. 동작이 바뀔 수 있습니다." {...props}>
      <svg className={styles.svg} role="img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M90.72 82.34c4.4 7 1.29 12.66-7 12.66H16.25C8 95 4.88 89.31 9.28 82.34l29.47-46.46V12.5H35A3.75 3.75 0 0135 5h30a3.75 3.75 0 010 7.5h-3.75v23.38zM45.08 39.86L29.14 65h41.72L54.92 39.86l-1.17-1.81V12.5h-7.5v25.55z" />
      </svg>
    </abbr>
  )
}

export const NonStandard: React.VFC<Props> = (props) => {
  return (
    <abbr className={styles.root} title="표준 기능이 아님. 브라우저 지원이 미흡할 수 있습니다." {...props}>
      <svg className={styles.svg} role="img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M96.6,82.1,76.16,46.7,55.72,11.29a6.61,6.61,0,0,0-11.44,0L23.84,46.7,3.4,82.1A6.6,6.6,0,0,0,9.12,92H90.88A6.6,6.6,0,0,0,96.6,82.1ZM50,86.32A6.33,6.33,0,1,1,56.33,80,6.34,6.34,0,0,1,50,86.32Zm0-17S39.92,42.45,39.92,35.91,44.43,24.08,50,24.08s10.08,5.3,10.08,11.83S50,69.31,50,69.31Z" />
      </svg>
    </abbr>
  )
}
