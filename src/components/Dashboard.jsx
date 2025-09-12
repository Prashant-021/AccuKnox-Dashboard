import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddWidgetModal from './AddWidgetModal';
import { Button, Card, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { addWidget, removeWidget } from '../redux/dashboardSlice';
const Dashboard = () => {
    const { categories } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch()
    const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)

    const handleOpenAddWidgetModal = (categoryId) => {
        setActiveCategory(categoryId)
        setIsAddWidgetModalOpen(true)
    }
    const handleCloseAddWidgetModal = () => {
        setIsAddWidgetModalOpen(false)
        setActiveCategory(null)
    }
    const handleWidgetDelete = (categoryId, widgetId) => {
        dispatch(removeWidget({ categoryId, widgetId }));
    }
    return (
        <div className='p-6 space-y-6'>
            <h1 className='text-2xl font-bold mb-4'>CNAAP Dashboard</h1>
            {categories.map((category) => (
                <div key={category.id} className='bg-gray-100 p-4'>
                    <h2 className='text-xl font-semibold mb-4'>{category.name}</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4' >
                        {category.widgets.map((widget) => (
                            widget.isVisible && <div
                                key={widget.id}
                                className='bg-white flex p-4 rounded-xl shadow relative'
                            >
                                <div className='flex-grow'>

                                    <h3 className='font-bold'>{widget.name}</h3>
                                    <p className='text-sm text-gray-600'>{widget.text}</p>
                                </div>
                                <Tooltip title="Delete">
                                    <Button className='' color="danger" variant="outlined" shape="circle" icon={<DeleteOutlined />} onClick={() => handleWidgetDelete(category.id, widget.id)} />
                                </Tooltip>
                            </div>
                        )
                        )}
                        <div className='bg-white p-4 rounded-xl shadow relative flex justify-center'>
                            <button onClick={() => handleOpenAddWidgetModal(category.id)} className="border-2 p-2 border-gray-400 rounded-xl text-gray-500 hover:bg-gray-200"
                            >
                                + Add Widget
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <AddWidgetModal
                isOpen={isAddWidgetModalOpen}
                onClose={handleCloseAddWidgetModal}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
        </div>
    )
}

export default Dashboard