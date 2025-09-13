import { Button, Divider, Drawer, Form, Input, Select, Tabs } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWidget } from "../redux/dashboardSlice";
import WidgetList from './WidgetList';

const AddWidgetModal = ({ isOpen, onClose, activeCategory, setActiveCategory }) => {
    const categories = useSelector((state) => state.dashboard.categories);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const categoryItems = categories.map((category) => ({ key: category.id, label: category.name, children: <WidgetList widgets={category.widgets} activeCategory={activeCategory} editView={true} /> }))
    const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }))
    const handleTabChange = (key) => {
        setActiveCategory(key);
    };

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                dispatch(addWidget(values.widgetCategory, values.widgetName, values.widgetText));
                form.resetFields();
            }).catch(info => {
                console.log("validation failed:", info);
            })

    }

    const handleDrawerClose = () => {
        form.resetFields();
        onClose();
    }

    return (
        <Drawer
            title="Add Widget"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={handleDrawerClose}
            open={isOpen}
            width={800}
        >
            <p className='font-semibold'>Personalise your dashboard by adding following widgets</p>
            <Tabs activeKey={activeCategory} items={categoryItems} onChange={handleTabChange} />
            <Divider />
            <p className='font-semibold mb-4'>Add New Widget</p>
            <Form form={form} layout="vertical">
                <Form.Item label="Widget Category"
                    name="widgetCategory"
                    rules={[{ required: true, message: "Please select widget category!" }]}>
                    <Select allowClear options={categoryOptions} placeholder="Select Widget Category" />

                </Form.Item>
                <Form.Item label="Widget Name"
                    name="widgetName"
                    rules={[{ required: true, message: "Please enter a widget name!" }]}>
                    <Input placeholder="Enter Widget Name" />

                </Form.Item>
                <Form.Item
                    label="Widget Text"
                    name="widgetText"
                    rules={[{ required: true, message: "Please enter widget text!" }]}
                >
                    <Input.TextArea placeholder="Enter Widget Text" rows={3} />
                </Form.Item>
                <div className="flex justify-end gap-2">
                    <Button type="primary" onClick={handleSave}>
                        Save Widget
                    </Button>
                </div>
            </Form>

        </Drawer>
    )
}

export default AddWidgetModal