import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { store } from './store'
import { Provider } from 'react-redux'
import './i18next.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
)
