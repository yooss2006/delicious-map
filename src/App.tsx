import AppProvider from '@/providers/app';
import AppRouters from '@/routes';

function App() {
  return (
    <AppProvider>
      <AppRouters />
    </AppProvider>
  );
}

export default App;
