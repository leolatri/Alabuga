import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MissionList from './components/Branches/Mission/list/MisionList.tsx';
import CreateBranch from './pagesAdm/CreateBranches/CreateBranch.tsx';
import BranchesAdm from './pagesAdm/Branches/BranchesAdm.tsx';
import PeopleBord from './pagesAdm/Profile/PeopleBord.tsx';
import useContextData from './hooks/useContextData.tsx';
import DataProvider from './Context/DataProvider.tsx';
import Branches from "./pages/Branches/Branches.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Tabs from "./components/Tabs/Tabs.tsx";
import styles from "./app.module.scss";
import { pathes } from './pathes.tsx';

function App() {
  const isAdmin = useContextData().userPermissions === 1 ? false : true;
  console.log(isAdmin);
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.app__container}>
          <Tabs isAdmin={isAdmin}/>

          {isAdmin ? (
            <Routes>
              <Route path={pathes.admin.branches} element={<BranchesAdm />} />
              <Route path={pathes.admin.profile} element={<PeopleBord />} />
              <Route path={pathes.admin.createBranch} element={<CreateBranch />} />
              <Route path={pathes.admin.missionList} element={<MissionList />} />
              <Route path="*" element={<Navigate to={pathes.admin.branches} replace />} />
              <Route
                path="/branch/:branchId/missionList"
                element={<MissionList />}
              />
            </Routes>
          ) : (
            < Routes >
              <Route path="/branches" element={<Branches />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Profile />} />
              <Route path="/" element={<Profile />} />
              <Route
                path="/branch/:branchId/missionList"
                element={<MissionList />}
              />
            </Routes>
          )
          }
          <div style={{ height: '70px', width: '100%' }} />
        </div>
      </div>
    </Router >
  );
}

const AlabugaApp = () => (
  <DataProvider>
    <App />
  </DataProvider>
)
export default AlabugaApp;