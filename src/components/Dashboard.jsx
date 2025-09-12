import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { categories } = useSelector((state) => state.dashboard);
    return (
        <>
            <div>Dashboard</div>
            {categories[0].name}
        </>
    )
}

export default Dashboard