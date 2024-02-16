import { editStore, store } from './store/globalStore';
import Wrapper   from './components/wrapper';



function App() {
    return (
        <Wrapper store={store} editStore={editStore} />
    );
}

export default App;