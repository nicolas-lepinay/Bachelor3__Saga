// React
import { useState, useEffect, useRef } from 'react';

// Ionic :
import { 
    IonModal,
    IonImg,
    IonContent, 
    IonList,
    IonItem,
    IonText,
    IonBackdrop,
    IonButton,
    IonIcon
} from '@ionic/react';

import { close } from 'ionicons/icons';

// 🛠️ Hooks :
import useDataProvider from '../hooks/useDataProvider';

const CartConfirmationModal = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const modal = useRef(null);

    const { cart } = useDataProvider();

    const dismiss = () => {
        modal?.current?.setCurrentBreakpoint(0);
        modal?.current?.dismiss();
    }
    
    return(
        <IonModal
            ref={modal}
            trigger="open-modal"
            initialBreakpoint={0.25}
            breakpoints={[0, 0.25, 0.5, 0.75]}
            handleBehavior="cycle"
        >
            <IonContent className="ion-padding">
                <div className='d-flex align-items-center justify-content-between py-3'>
                    <IonItem
                        onClick={() => dismiss()}
                        routerLink='/cart'
                        routerDirection="none"
                        lines="none"
                        detail={true}
                    >
                    Voir le panier
                    </IonItem>

                    <IonButton 
                        onClick={() => dismiss()}
                        fill='clear' 
                        size='small'>
                        <IonIcon slot="icon-only" icon={close}></IonIcon>
                    </IonButton>
                </div>

                <IonList>
                    {cart.map(game => (
                    <IonItem
                        routerLink={`/games/${game.id}`}
                        onClick={() => dismiss()}
                        key={game.id}
                    >
                            <div className="d-flex align-items-center w-100 py-3">
                                <IonText className='w-15'><sub>⨯ {game.quantity}</sub></IonText>
                                <IonText className='w-60'><sub>{game.attributes.title}</sub></IonText>
                                {game?.attributes?.logo?.data &&
                                <div className='w-25'>
                                    <IonImg
                                        src={`${API_URL}${game?.attributes?.logo?.data?.attributes?.url}`}
                                    />
                                </div>}
                            </div>
                    </IonItem>
                    ))
                    }
                </IonList>
            </IonContent>
        </IonModal>
    )

}


export default CartConfirmationModal;