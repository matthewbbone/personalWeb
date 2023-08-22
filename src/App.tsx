import { Home } from './components/home/Home'
import { Tool } from './components/tool/Tool'
import { Header } from './components/header/Header'
import { Submit } from './components/forms/Submit'
import { 
    Route, 
    Routes 
} from 'react-router-dom'

export const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/tool" element={<Tool/>}/>
                <Route path="/submit" element={<Submit/>}/>
            </Routes>
        </div>
    )
}