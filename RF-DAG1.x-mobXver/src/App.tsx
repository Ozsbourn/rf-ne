import { 
    editStore, 
    store, 
} from './store/globalStore';
import Wrapper from './components/wrapper';

import 'reactflow/dist/style.css';
import './index.css'



function App() {
    return (
        <Wrapper store={store} editStore={editStore} />
    );
}

export default App;