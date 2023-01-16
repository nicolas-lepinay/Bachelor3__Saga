import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from 'react';

const useCart = () => {

    const [cart, setCart] = useState([]);

    const initCart = async () => {
        const { storageCart } = await Preferences.get({ key: 'cart' });
        console.log("INIT CART :")
        console.log((storageCart));
        storageCart && setCart(JSON.parse(storageCart));

        console.log("CART :")
        setTimeout(() => {
            console.log(cart);
          }, "1000")
          
    };

    const updateCart = async () => {
        await Preferences.set(
            {
                key: 'cart',
                value: JSON.stringify(cart)
            }
        );
    };

    const updateState = (gameId, quantity) => {
        const newState = cart.map(obj => {
            // If id === gameId, update quantity property:
            if (obj.id === gameId) {
                return {...obj, quantity: quantity};
            }
            // Otherwise, return object as is:
            return obj;
        });
    
        setCart(newState);
      };

    const addToCart = async (gameId, quantity) => {

        let item = cart.find(item => item?.id === gameId)
        //let item = storageCart.find(item => item?.id === gameId)

        if(item) {
            console.log("ITEM EXISTS")
            // Updates item's quantity:
            item.quantity = quantity;

            // Updates cart with updated item:
            // setCart(prev => {
            //     prev.map((oldItem) => { 
            //         return oldItem.id === gameId ? item : oldItem; 
            //     })
            // })
            updateState(gameId, quantity);

            // storageCart.map( oldItem => {
            //     return oldItem.id === gameId ? item : oldItem;
            // })

        } else {
            console.log("ITEM DOES NOT EXIST")
            // Creates new item:
            const newItem = {
                id: gameId,
                quantity: quantity
            }

            // Updates cart with new item:
            setCart(prev => [...prev, newItem]);
        }

        await updateCart();
    };


    useEffect(() => {

        initCart();

    }, [cart]);

    return {
        cart,
        addToCart
    }

}


export default useCart;