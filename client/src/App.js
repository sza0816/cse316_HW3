import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
import { useContext } from 'react'
import { GlobalStoreContext } from './store'
/*
    This is our application's top-level component.
    
    @author Zian Shang
*/
const App = () => {
    const {store}=useContext(GlobalStoreContext);
    function handleKeyDown(event){
        store.keyControl(event);
    }
    return (
        <Router > 
            <div className='keyDiv'
            tabIndex={0} 
            onKeyDown={handleKeyDown}>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
            </div>
        </Router>
    )
}

export default App