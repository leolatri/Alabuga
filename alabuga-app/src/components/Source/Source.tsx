import st from './source.module.scss'; 

const Source = ({ num, img }: { num: number; img: string }) => (
  <div className={st.source}> 
    <img src={img} alt="" />
    {num}
  </div>
);

export default Source;