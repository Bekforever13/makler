import Container from '../shared/Container'
import { FaInstagram, FaPhone } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white border-t-2 border-solid shadow-md md:h-[100px] sm:h-[150px]">
      <Container>
        <div className="flex items-center justify-between p-10">
          <span className="text-gray-500">
            Makler Nukus. Все права защищены. 2024г
          </span>
          <div className="flex items-center gap-5">
            <Link target="_blank" to="https://www.instagram.com/makler_nukus">
              <FaInstagram
                color="c32aa3"
                size="22"
                className="cursor-pointer"
              />
            </Link>
            <Link to="https://t.me/maklerkr">
              <FaTelegram color="229ED9" size="22" className="cursor-pointer" />
            </Link>
            <Link target="_blank" to="tel:+998913851575">
              <FaPhone color="212d5e" size="22" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
