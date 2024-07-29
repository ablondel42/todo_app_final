import React from "react";
import { Provider } from 'react-redux';
import store from "./store";
import TodoApp from "@/components/TodoApp";

export default function Index() {
  return (
    <Provider store={store}>
        <TodoApp />
    </Provider>
);
}
