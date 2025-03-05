import { Provider } from 'react-redux'
import { store } from './store/store'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

	return (
		<>
			<div className='font-quicksand'>
				<Provider store={store} >
					<Header />
					<Outlet />
					<Footer />
				</Provider>
			</div>
		</>
	)
}

export default App
