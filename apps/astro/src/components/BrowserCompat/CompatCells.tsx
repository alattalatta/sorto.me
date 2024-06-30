import type { BrowserName, CompatStatement, SupportStatement } from '@mdn/browser-compat-data'

import CompatCell from './CompatCell'

type Props = {
  browsers: (readonly [BrowserName, string])[]
  onClick: (browser: BrowserName, notes: SupportStatement) => void
  supportsMap: CompatStatement['support']
}

const CompatCells: React.FC<Props> = ({ browsers, supportsMap, onClick }) => {
  return (
    <>
      {browsers.map(([browser]) => (
        <CompatCell key={browser} browser={browser} data={supportsMap[browser]!} onClick={onClick} />
      ))}
    </>
  )
}

export default CompatCells

/**
 * Map over a value that can be either an array or a single value.
 *
 * @param fn Mapping function to use.
 * @param maybeArray A value that _can_ be an array.
 * @returns
 * - When the value is an array, returns a result of `maybeArray.map(fn)`.
 * - Otherwise, returns a result of `[fn(maybeArray)]`. Note that it's returned as a single-element array.
 */
export function mapOver<T, U>(maybeArray: T | T[], fn: (val: T, index?: number) => U): U[] {
  return Array.isArray(maybeArray) ? maybeArray.map(fn) : [fn(maybeArray, 0)]
}

// {supportDetail && (
//   <tr>
//     <td colSpan={browsers.length}>
//       <div>
//         {mapOver(supportDetail[1], (support, index) => (
//           <div key={index}>
//             <p>
//               {browsers.find(([browser]) => browser === supportDetail[0])?.[1] || supportDetail[0]}{' '}
//               {supportLabel(support)}
//             </p>
//             {support.flags &&
//               mapOver(support.flags, (flag) => (
//                 <dd>
//                   <p>
//                     <code>{flag.name}</code> 플래그를{' '}
//                     {flag.value_to_set && (
//                       <>
//                         <code>{flag.value_to_set}</code>
//                         {resolve('(으)로', flag.value_to_set)?.[1]}
//                       </>
//                     )}{' '}
//                     설정해야 합니다.
//                   </p>
//                 </dd>
//               ))}
//             {support.alternative_name && (
//               <dd>
//                 <NonStandard /> 다른 이름 사용: <code>{support.alternative_name}</code>
//               </dd>
//             )}
//             {support.prefix && (
//               <dd>
//                 <NonStandard /> 공급자 프리픽스 필요: <code>{support.prefix}</code>
//               </dd>
//             )}
//             {mapOver(support.notes, (note, subindex) => (
//               <dd key={subindex}>
//                 <p dangerouslySetInnerHTML={{ __html: note || '특이사항 없음.' }} />
//               </dd>
//             ))}
//           </div>
//         ))}
//       </div>
//     </td>
//   </tr>
// )}
