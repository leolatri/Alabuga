import { useEffect, useState, useCallback } from 'react';
import st from './table.module.scss';
import useContextData from '../../hooks/useContextData.tsx';
import EmptyPage from '../EmptyPage/EmpytyPage.tsx';
import { leaders } from '../../test.tsx';

const Table = ({ value }: { value: string }) => {
    const data = useContextData().profileData?.leaderBord;
    // const data = leaders;
    const [peopleData, setPeopleData] = useState(data);
    
    const filterData = useCallback((searchValue: string) => {
        if (!data) return;
        
        if (searchValue.trim() === '') {
            setPeopleData(data);
        } else {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setPeopleData(filtered);
        }
    }, [data]);

    useEffect(() => {
        if (value.length === 0) {
            filterData(value);
            return;
        }

        const timeoutId = setTimeout(() => {
            filterData(value);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, filterData]);

    if (!peopleData) return <EmptyPage />;

    return (
        <table className={st.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Опыт</th>
                </tr>
            </thead>
            <tbody>
                {peopleData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.experience}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;