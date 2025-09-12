import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { categories } = useSelector((state) => state.dashboard);
    return (
        <div className='p-6 space-y-6'>
            <h1 className='text-2xl font-bold mb-4'>CNAAP Dashboard</h1>
            {categories.map((category) => (
                <div key={category.id} className='bg-gray-100 p-4'>
                    <h2 className='text-xl font-semibold mb-4'>{category.name}</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4'>
                        {category.widgets.map((widget) => (
                            <div
                                key={widget.id}
                                className='bg-white p-4 rounded-xl shadow relative'
                            >
                                <h3 className='font-bold'>{widget.name}</h3>
                                <p className='text-sm text-gray-600'>{widget.text}</p>
                            </div>
                        )
                        )}
                        <button className="border-2 border-dashed border-gray-400 rounded-xl p-4 text-gray-500 hover:bg-gray-200"
                        >
                            + Add Widget
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Dashboard