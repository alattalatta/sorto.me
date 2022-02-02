export type TimelineID = 'Woowa' | 'Yanolja' | 'URBAN'

export type TimelineData = {
  id: TimelineID
  from: string
  name: string
  position: string | JSX.Element
  to?: string
}

export const WOOWA: TimelineData = {
  id: 'Woowa',
  name: 'Woowa Brothers Corp.',
  from: '2020-12',
  position: '"B Mart" Service Team, Web front-end',
}

export const YANOLJA: TimelineData = {
  id: 'Yanolja',
  name: 'Yanolja Co., Ltd.',
  from: '2018-10',
  to: '2020-11',
  position: (
    <>
      <abbr title="Customer Experience">CX</abbr> Service Team, Web front-end
    </>
  ),
}

export const URBAN: TimelineData = {
  id: 'URBAN',
  name: 'URBANPLAY',
  from: '2018-04',
  to: '2018-09',
  position: 'Creator Group, Web development',
}

export const TIMELINE: readonly TimelineData[] = [WOOWA, YANOLJA, URBAN]
