import { AuthProvider } from './app/context/AuthContext';
import Router from './Routes';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
