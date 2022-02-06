import { Callout } from './Callout'

const Fixture: React.VFC = () => {
  return (
    <>
      <Callout type="note">주는 갑 용감하고 못할 수 보라. 투명하되 이상을 내려온 별과 봄바람이다.</Callout>
      <Callout type="warning">주는 갑 용감하고 못할 수 보라. 투명하되 이상을 내려온 별과 봄바람이다.</Callout>
      <Callout type="alert">주는 갑 용감하고 못할 수 보라. 투명하되 이상을 내려온 별과 봄바람이다.</Callout>
    </>
  )
}

export default Fixture
