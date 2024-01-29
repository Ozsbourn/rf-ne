import { store } from './store/globalStore';
import Wrapper   from './components/wrapper';



function App() {
    return (
        <Wrapper store={store} />
    );
}

export default App;