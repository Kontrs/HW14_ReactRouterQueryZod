import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { About } from './pages/About';
import { GameDisplay } from './pages/GameDisplay';

export const PageRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/games' element={<Games/>}/>
                <Route path='/games/:id' element={<GameDisplay/>}/>
                <Route path='/about' element={<About/>}/>
            </Routes>
        </Router>
    )
}