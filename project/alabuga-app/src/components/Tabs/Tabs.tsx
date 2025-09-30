import { useLocation, useNavigate } from 'react-router-dom';
import cart from '../../imgs/shopping-cart.svg';
import user from '../../imgs/user.svg';
import file from '../../imgs/file.svg';
import st from './tabs.module.scss';
import cx from 'classnames';

const Tabs = ({isAdmin}: {isAdmin: boolean}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: 0, icon: file, path: '/branches' },
        { id: 1, icon: user, path: '/profile'  },
        { id: 2, icon: cart, path: '/profile'  },
    ];

    const tabsAdm = [
        { id: 0, icon: file, path: '/adm/branches'},
        { id: 1, icon: user, path: '/adm/peopleBord'},
        { id: 2, icon: cart, path: '/adm/profile'},
    ];

    const getActiveTab = () => {
    const path = location.pathname;
    
    if (isAdmin) {
        if (path.startsWith('/adm/branches') || path === '/adm') {
            return 0;
        }
        if (path === '/adm/peopleBord') {
            return 1;
        }
        if (path === '/adm/cart') {
            return 2;
        }
    } else {
        if (path.startsWith('/branches') || path === '/') {
            return 0;
        }
        if (path === '/profile'  ||  path === '/') {
            return 1;
        }
        if (path === '/cart') {
            return 2;
        }
    }
    return 1;
};

    const handleTabClick = (path: string) => {
        navigate(path);
    }

    const currentTabs = isAdmin ? tabsAdm : tabs;
    
    return (
        <div className={st.tabs}>
            {currentTabs.map((tab) => (
                <div
                    key={tab.id}
                    className={cx(st.tab, getActiveTab() === tab.id ? st[`tab-active`] : '')}
                    onClick={() => handleTabClick(tab.path)}
                >
                    <img src={tab.icon} alt='' />
                </div>
            ))}
        </div>
    );
};

export default Tabs;