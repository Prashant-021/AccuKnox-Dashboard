import { Checkbox } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleWidgetVisibility } from "../redux/dashboardSlice";

const WidgetList = ({ widgets, activeCategory }) => {
    const dispatch = useDispatch()

    const handleWidgetVisibility = (e) => {
        dispatch(toggleWidgetVisibility({ categoryId: activeCategory, widgetId: e.target.value }))
    }
    return (
        <div className='h-[25vh] overflow-auto'>{
            widgets.map((widget) => (
                <div
                    key={widget.id}
                    className='bg-white flex gap-2 p-4 mb-2 rounded-xl shadow relative '
                >
                    <Checkbox value={widget.id} title={widget.id} checked={widget.isVisible} onChange={handleWidgetVisibility} />
                    <div>
                        <h3 className='font-bold'>{widget.name}</h3>
                    </div>
                </div>
            ))
        }</div>
    )
}

export default WidgetList