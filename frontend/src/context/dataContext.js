import { useState, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // const [students, setStudents] = useState([]);
    const [cart, setCart] = useState([]);

    // const removeStudent = id => {
    //     setStudents(students.filter(student => student.id !== id));
    // };

    // const getStudent = id => {
    //     return students.find(student => student.id == id);
    // };

    // const updateStudent = data => {
    //     setStudents(
    //         students.map(item => {
    //         if (item.id === data.id) {
    //             return {
    //             ...item,
    //             name: data.name,
    //             section: data.section
    //             };
    //         } else {
    //             return item;
    //         }
    //         })
    //     );
    // };

    const updateItem = data => {
        setCart(
            cart.map(item => {
                if (item.id === data.id) {
                    return {
                    ...item,
                    quantity: data.quantity
                    };
                } else {
                    return item;
                }
            })
        );
        setCart((current) => current.filter((game) => game.quantity > 0));
    };

    // const addStudent = data => {
    //     setStudents([
    //         {
    //             name: data.name,
    //             id: Math.random() * 100 + '',
    //             section: data.section
    //         },
    //         ...students
    //     ]);
    // };

    const addItem = data => {
        setCart([
            {
                id: data.id,
                quantity: data.quantity,
                attributes: data.attributes
            },
            ...cart
        ]);
    };

    const addToCart = data => {
        if(cart.some(item => item.id === data.id)) 
            updateItem(data);
        else
            addItem(data);
    }

    const clearCart = () => {
        setCart([]);
    }

  // the store object
    let state = {
        cart,
        addToCart,
        clearCart
    };

    // wrap the app in the provider with the initialized context
    return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export default DataContext;