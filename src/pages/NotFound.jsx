import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-10">
      <h1 className="text-5xl font-bold">404</h1>
      <h4>Страница не найдена</h4>
      <Link to="/" className="text-blue-400">
        Вернуться
      </Link>
    </div>
  )
}

export default NotFound
