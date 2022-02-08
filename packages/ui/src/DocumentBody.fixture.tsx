import { DocumentBody } from './DocumentBody'

const Fixture: React.VFC = () => {
  return (
    <DocumentBody css={{ maxWidth: `${480 / 16}rem` }}>
      <style>@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&display=swap');</style>
      <h2>그들의 장비와 기구는 모두 살아 있다</h2>
      <p>
        새로운 <a href="#">회계연도</a>가 개시될 때까지 예산안이 의결되지 못한 때에는 정부는 국회에서 예산안이 의결될
        때까지 다음의 목적을 위한 경비는 전년도 예산에 준하여 집행할 수 있다.
      </p>
      <h3>그들의 장비와 기구는 모두 살아 있다</h3>
      <p>
        대통령이 임시회의 집회를 요구할 때에는 기간과{' '}
        <code>
          <a href="#" target="_blank">
            집회요구 (demand)
          </a>
        </code>
        의 이유를 명시하여야 한다. 국가는 법률(<code>law</code>)이 정하는 바에 의하여 재외국민을 보호할 의무를 진다.
      </p>
      <h4>그들의 장비와 기구는 모두 살아 있다</h4>
      <p>
        감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다. 정당의 설립은 자유이며, 복수정당제는
        보장된다. 이 헌법시행 당시에 이 헌법에 의하여 <a href="#">새로 설치될 기관의 권한에 속하는 직무</a>를 행하고
        있는 기관은 이 헌법에 의하여 새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다.
      </p>
      <h2>캡션 없는 표</h2>
      <table>
        <thead>
          <tr>
            <th>형식</th>
            <th>MIME 유형</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TrueType</td>
            <td>
              <code>font/ttf</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>OpenType</td>
            <td>
              <code>font/otf</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>Web Open Font Format</td>
            <td>
              <code>font/woff</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>Web Open Font Format 2</td>
            <td>
              <code>font/woff2</code>
            </td>
            <td />
          </tr>
        </tbody>
      </table>
      <h2>윗캡션 표</h2>
      <table>
        <caption>표 1: 글꼴 형식과 MIME 유형</caption>
        <thead>
          <tr>
            <th>형식</th>
            <th>MIME 유형</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TrueType</td>
            <td>
              <code>font/ttf</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>OpenType</td>
            <td>
              <code>font/otf</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>Web Open Font Format</td>
            <td>
              <code>font/woff</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>Web Open Font Format 2</td>
            <td>
              <code>font/woff2</code>
            </td>
            <td />
          </tr>
        </tbody>
      </table>
      <h2>아래 캡션 표</h2>
      <table>
        <caption style={{ captionSide: 'bottom' }}>표 1: 글꼴 형식과 MIME 유형</caption>
        <thead>
          <tr>
            <th>형식</th>
            <th>MIME 유형</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TrueType</td>
            <td>
              <code>font/ttf</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>OpenType</td>
            <td>
              <code>font/otf</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>Web Open Font Format</td>
            <td>
              <code>font/woff</code>
            </td>
            <td />
          </tr>
          <tr>
            <td>Web Open Font Format 2</td>
            <td>
              <code>font/woff2</code>
            </td>
            <td />
          </tr>
        </tbody>
      </table>
    </DocumentBody>
  )
}

export default Fixture
