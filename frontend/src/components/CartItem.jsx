// Ionic :
import { 
    IonThumbnail,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption
} from '@ionic/react';

import { close, trash } from 'ionicons/icons';

// React :
import { useState, useEffect, useRef } from 'react';


// 🛠️ Hooks :
import useDataProvider from '../hooks/useDataProvider';


const CartItem = ({ game }) => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;

    const {
        cart,
        addToCart,
    } = useDataProvider();
        
    return (
        <IonItem>
            <IonThumbnail slot="start">
            {game?.attributes?.image?.data ?
                <img
                    className='round'
                    src={`${API_URL}${game.attributes.image.data.attributes.url}`}  
                />
            :
            game?.attributes?.image_url ?
                <img
                    className='round'
                    src={game.attributes.image_url}
                />
            :
                <img
                    className='round'
                    src='assets/unknown_image.png'
                />
            }
            </IonThumbnail>
            <div className='w-100'>

                <div className='d-flex align-items-center justify-content-between'>
                    <IonLabel><sub>{game?.attributes?.title}</sub></IonLabel>
                    <IonLabel><sub>Quantité :</sub></IonLabel>
                </div>

                <div className='d-flex align-items-center justify-content-between'>
                    <IonLabel><span className='text-tertiary'><b>{game?.attributes?.price.toFixed(2)}€</b></span></IonLabel>
                    <IonSelect 
                        interface="action-sheet" 
                        placeholder={game?.quantity}
                        value={game?.quantity}
                        onIonChange={(e) => { addToCart({ id: game?.id, quantity: e.detail.value, attributes: game?.attributes}) }}
                    >
                        <IonSelectOption value={1}>1</IonSelectOption>
                        <IonSelectOption value={2}>2</IonSelectOption>
                        <IonSelectOption value={3}>3</IonSelectOption>
                        <IonSelectOption value={4}>4</IonSelectOption>
                        <IonSelectOption value={5}>5</IonSelectOption>
                        <IonSelectOption value={0}>SUPPRIMER</IonSelectOption>
                    </IonSelect>
                </div>
            </div>
        </IonItem>

    );
  };
  
  export default CartItem;