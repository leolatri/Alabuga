import Profile from "./pages/Profil/Profile.tsx";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.app__container}>
      <Profile />
      </div>
    </div>
  );
}

export default App;
