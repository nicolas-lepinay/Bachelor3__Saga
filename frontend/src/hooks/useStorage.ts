import { Storage } from '@ionic/storage';
import { useState, useEffect } from 'react';

const CART_KEY = 'cart';;

interface CartItem {
    id: string;
    quantity: number;
}

const useStorage = () => {
    const [store, setStore] = useState<Storage>();
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async(gameId: string, quantity: number) => {
        const newItem = {
            id: gameId,
            quantity: quantity
        }

        const updatedCart = [...cart, newItem];
        setCart(updatedCart);
        store && store.set(CART_KEY, updatedCart);
    }

    useEffect( () => {

        const initStorage = async () => {
            const newStorage = new Storage({
                name: 'nicolasdb'
            });
            const storage = await newStorage.create();
            const storedCart = await storage.get(CART_KEY) || [];
            setStore(storage);
        }
        initStorage();
        console.log(store)


    } );

    return { 
        cart,
        addToCart
    }
}

export default useStorage;