import { Provider } from 'react-redux'
import { store } from './store/store'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearMessages } from './store/messageSlice'  // Импортируем действие для очистки сообщений

function App() {
  const dispatch = useDispatch()

  // Функция для очистки сообщений
  const handleClearMessages = () => {
    dispatch(clearMessages())
  }

  return (
    <div className='font-quicksand'>
      <Provider store={store}>
        <Header />
        
        {/* Кнопка очистки сообщений */}
        <div>
          <button
            onClick={handleClearMessages}
            style={{
              margin: '10px',
              padding: '8px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Очистить всё
          </button>
        </div>

        {/* Контент страницы */}
        <Outlet />
        <Footer />
      </Provider>
    </div>
  )
}

export default App
