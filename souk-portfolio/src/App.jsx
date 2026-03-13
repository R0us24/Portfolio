import { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SoukScene from './components/Souk/SoukScene';
import LoadingScreen from './components/UI/LoadingScreen';
import { LanguageProvider } from './i18n/LanguageContext';
import './styles/pixel.css';
import './styles/animations.css';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LanguageProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main>
          <SoukScene />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
