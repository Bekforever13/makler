import { useTranslation } from 'react-i18next'
import useWindowSize from '../../hooks/useWindowSize'
import bannerImg from '../../images/image/nukus6.jpg'
import Container from '../shared/Container'
import FiterTabs from './FiterTabs'

const HomeBanner = () => {
  const { width } = useWindowSize()
  const { t } = useTranslation()

  return (
    <div className="w-full relative">
      <img
        src={bannerImg}
        className={`object-cover object-center brightness-75 min-w-full ${
          width < 1000 ? 'h-[500px]' : 'h-[360px]'
        }`}
        alt="bg image"
      />
      <div className="absolute top-0 left-0 right-0">
        <Container>
          <h1 className="text-[25px] drop-shadow-lg text-white font-semibold my-6">
            {t('homeBannerTitle')}
          </h1>
          <FiterTabs />
        </Container>
      </div>
    </div>
  )
}

export default HomeBanner
