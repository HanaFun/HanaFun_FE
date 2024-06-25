import { Outlet } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Keypad from './components/common/Keypad';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Keypad />
      </QueryClientProvider>
    </>
  );
}

export default App;
