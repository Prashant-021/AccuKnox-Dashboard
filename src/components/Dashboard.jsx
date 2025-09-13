import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import AddWidgetModal from './AddWidgetModal';
import { Input } from 'antd';

import { debounce } from "lodash";
import WidgetList from './WidgetList';

const Dashboard = () => {
    const { categories } = useSelector((state) => state.dashboard);
    const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");

    const handleOpenAddWidgetModal = (categoryId) => {
        setActiveCategory(categoryId)
        setIsAddWidgetModalOpen(true)
    }
    const handleCloseAddWidgetModal = () => {
        setIsAddWidgetModalOpen(false)
        setActiveCategory(null)
    }
    const handleSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value.toLowerCase());
        }, 300),
        []
    );

    return (
        <div className='p-6 space-y-6'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold mb-2'>CNAAP Dashboard</h1>
                <Input.Search
                    placeholder="Search widgets..."
                    allowClear
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ maxWidth: 400, marginBottom: 20 }}
                />
            </div>
            {categories.map((category) => (
                <div key={category.id} className='bg-gray-100 p-4'>
                    <h2 className='text-xl font-semibold mb-4'>{category.name}</h2>
                    <div className='flex gap-4' >
                        <WidgetList activeCategory={category.id} widgets={category.widgets}
                            searchTerm={searchTerm} />
                        <div className='bg-white min-w-96 p-3 overflow-x-scroll rounded-xl relative flex justify-center'>
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