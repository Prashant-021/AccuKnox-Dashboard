import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    categories: [
        {
            id: "cspm",
            name: "CSPM Executive Dashboard",
            widgets: [
                { id: "widget-1", name: "Cloud Accounts", text: "Sample data for Cloud Accounts" },
                { id: "widget-2", name: "Cloud Account Risk Assessment", text: "Sample data for Risk Assessment" }
            ]
        },
        {
            id: "cwpp",
            name: "CWPP Dashboard",
            widgets: [
                { id: "widget-3", name: "Top 5 Namespace Specific Alerts", text: "Sample data for Namespace Alerts" },
                { id: "widget-4", name: "Workload Alerts", text: "Sample data for Workload Alerts" }
            ]
        },
        {
            id: "registry",
            name: "Registry Scan",
            widgets: [
                { id: "widget-5", name: "Image Risk Assessment", text: "Sample data for Image Risk Assessment" },
                { id: "widget-6", name: "Image Security Issues", text: "Sample data for Image Security Issues" }
            ]
        }

    ]
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        addWidget: {
            reducer(state, action) {
                const { categoryId, widget } = action.payload;
                const category = state.categories.find(cat => cat.id === categoryId);
                if (category){
                    category.widgets.push(widget)
                }
            },
            prepare(categoryId, name, text){
                return {
                    payload: {
                        categoryId,
                        widget: {
                            id: nanoid(),
                            name,
                            text
                        }
                    }
                }
            },
            removeWidget(state,action) {
                const { categoryId, widgetId} = action.payload
                const category = state.categories.find(cat => cat.id === categoryId);
                if(category){
                    category.widgets = category.widgets.filter(widget => widget.id !== widgetId)
                }
            }
        }
    }
})

export const { addWidget, removeWidget } = dashboardSlice.actions;  
export default dashboardSlice.reducer;