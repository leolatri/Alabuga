import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./pages/Profil/Profile.tsx";
import styles from "./app.module.scss";
import Branches from "./pages/Branches/Branches.tsx";
import Tabs from "./components/Tabs/Tabs.tsx";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.app__container}>
          <Tabs />

          <Routes>
            <Route path="/branches" element={<Branches />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Profile />} />
            <Route path="/" element={<Profile />} />
          </Routes>
          <div style={{ height: '70px', width: '100%' }} />
        </div>
      </div>
    </Router>
  );
}

export default App;