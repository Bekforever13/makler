import bannerImg from '../images/image/banner3.jpg'
import Container from './Container'
import FiterTabs from './FiterTabs'

const HomeBanner = () => {
  return (
    <div className="w-full relative">
      <img
        src={bannerImg}
        className="object-cover brightness-75 min-w-full max-h-[360px] min-h-[360px]"
        alt=""
      />
      <div className="absolute top-0 left-0 right-0">
        <Container>
          <h1 className="text-[25px] drop-shadow-lg text-white font-semibold my-6">
            Jurip izlegenshe jatip izle
          </h1>
          <FiterTabs />
        </Container>
      </div>
    </div>
  )
}

export default HomeBanner
