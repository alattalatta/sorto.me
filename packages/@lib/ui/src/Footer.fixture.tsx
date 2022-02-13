import { Footer } from './Footer'

const Fixture: React.VFC = () => {
  const twoWeeksBefore = new Date()
  twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14)

  const fiveDaysBefore = new Date()
  fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5)

  const oneHourBefore = new Date()
  oneHourBefore.setHours(oneHourBefore.getHours() - 1)

  return (
    <>
      <style>@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,400&display=swap');</style>
      <Footer updated={twoWeeksBefore} />
      <Footer mdnSlug="docs/Web/HTML/Element" updated={fiveDaysBefore} />
      <Footer updated={oneHourBefore} />
    </>
  )
}

export default Fixture
