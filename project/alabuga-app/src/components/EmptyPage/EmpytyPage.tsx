import st from './empty.module.scss';
import emtyImg from '../../imgs/empty.svg';

const EmptyPage = () => (
    <div className={st.empty}>
        <img src={emtyImg} alt=''/>
        <p>Здесь пока пусто, как на Марсе</p>
    </div>
);

export default EmptyPage;