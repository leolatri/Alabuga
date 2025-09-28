import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./pages/Profile/Profile.tsx";
import styles from "./app.module.scss";
import Branches from "./pages/Branches/Branches.tsx";
import Tabs from "./components/Tabs/Tabs.tsx";
import MissionList from './components/Branches/Mission/list/MisionList.tsx';
import { ProfileData, BranchData } from './test.tsx';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.app__container}>
          <Tabs />

          <Routes>
            <Route path="/branches" element={<Branches branches={BranchData}/>} />
            <Route path="/profile" element={<Profile data={ProfileData}/>} />
            <Route path="/cart" element={<Profile />} />
            <Route path="/" element={<Profile />} />
            <Route 
              path="/branch/:branchId/missionList" 
              element={<MissionList branches={BranchData} />} 
            />
          </Routes>
          <div style={{ height: '70px', width: '100%' }} />
        </div>
      </div>
    </Router>
  );
}

export default App;