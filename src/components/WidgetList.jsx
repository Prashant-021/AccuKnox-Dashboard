import { Button, Checkbox, Popconfirm, Tooltip, Typography } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeWidget, toggleWidgetVisibility } from "../redux/dashboardSlice";
import { DeleteOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;
const WidgetList = ({ widgets, activeCategory, editView = false, searchTerm }) => {
    const dispatch = useDispatch()

    const filteredWidgets =
        searchTerm && !editView
            ? widgets.filter(
                (w) =>
                    w.name.toLowerCase().includes(searchTerm) ||
                    w.text.toLowerCase().includes(searchTerm)
            )
            : widgets;

    const handleWidgetVisibility = (e) => {
        dispatch(toggleWidgetVisibility({ categoryId: activeCategory, widgetId: e.target.value }))
    }

    const handleWidgetDelete = (categoryId, widgetId) => {
        dispatch(removeWidget({ categoryId, widgetId }));
    }
    return (
        <div className='flex-grow flex gap-4 overflow-x-scroll p-0.5'>{
            filteredWidgets.length === 0 ? <p className='text-gray-500'>No widgets available. Please add widgets.</p>
                : filteredWidgets.map((widget) => (
                    (widget.isVisible || editView) && <div
                        key={widget.id}
                        className='bg-white flex  min-w-96 gap-4 p-3 rounded-xl shadow relative'
                    >
                        <Checkbox value={widget.id} title={widget.id} checked={widget.isVisible} onChange={handleWidgetVisibility} />
                        <div className='w-3/4'>
                            <Text className=' font-bold' ellipsis={{
                                rows: 1,
                                expandable: false,
                                expanded: false,
                                // onExpand: (_, info) => setExpanded(info.expanded),
                            }}>{widget.name}</Text>
                            {
                                !editView && <Paragraph ellipsis={{
                                    rows: 1,
                                    expandable: false,
                                    expanded: false,
                                    // onExpand: (_, info) => setExpanded(info.expanded),
                                }} className='text-sm text-gray-600'>
                                    {widget.text}
                                </Paragraph>
                            }

                        </div>
                        <Tooltip title="Delete">
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => handleWidgetDelete(activeCategory, widget.id)}
                                okText="Yes"
                                cancelText="No"
                            >

                                <Button className='' color="danger" variant="outlined" shape="circle" icon={<DeleteOutlined />}/>
                            </Popconfirm>
                        </Tooltip>
                    </div>
                    // <div
                    //     key={widget.id}
                    //     className='bg-white flex gap-2 p-4 mb-2 rounded-xl shadow relative '
                    // >
                    //     <Checkbox value={widget.id} title={widget.id} checked={widget.isVisible} onChange={handleWidgetVisibility} />
                    //     <div>
                    //         <h3 className='font-bold'>{widget.name}</h3>
                    //     </div>
                    // </div>
                ))

        }</div>
    )
}

export default WidgetList