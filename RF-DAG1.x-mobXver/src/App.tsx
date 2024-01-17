import { SchemeStore } from './store/store';
import Wrapper         from './components/wrapper';

import initialNodes from './initialData/nodes';
import initialEdges from './initialData/edges';



const store = new SchemeStore(initialNodes, initialEdges);



function App() {
    return (
        <Wrapper store={store} />
    );
}

export default App;