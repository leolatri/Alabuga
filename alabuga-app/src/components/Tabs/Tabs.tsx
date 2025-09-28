import { useLocation, useNavigate } from 'react-router-dom';
import cart from '../../imgs/shopping-cart.svg';
import user from '../../imgs/user.svg';
import file from '../../imgs/file.svg';
import st from './tabs.module.scss';
import cx from 'classnames';

const Tabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: 0, icon: file, path: '/branches' },
        { id: 1, icon: user, path: '/profile'  },
        { id: 2, icon: cart, path: '/profile'  },
    ];

    const getActiveTab = () => {
        switch (location.pathname) {
            case '/branches':
                return 0;
            case '/profile':
                return 1;
            case '/profile':
                return 2;
            default:
                return 1; 
        }
    }; 

    const handleTabClick = (path: string) => {
        navigate(path);
    }
    
    return (
        <div className={st.tabs}>
            {tabs.map((tab) => (
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