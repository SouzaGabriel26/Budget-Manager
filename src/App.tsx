import { AuthProvider } from './app/Context/AuthContext';
import Router from './Routes';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
