import './App.css';
import Table from './components/table/Table';
import { QueryClient, QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Table/>
      </div>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
