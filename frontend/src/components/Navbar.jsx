import { useState, useEffect } from 'react';

import { 
    IonFooter,
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonButton,
    IonMenuButton,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonBadge
} from '@ionic/react';

import {
    home, 
    person,
    heart,
    cart as cartIcon,
    gameController,
    ellipsisHorizontal,
    ellipsisVertical
} from 'ionicons/icons';

// 🛠️ Hooks :
import useDataProvider from '../hooks/useDataProvider';

const Navbar = () => {

    const { cart } = useDataProvider();

    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect( () => {
        let sum = 0;
        cart.map(item => sum += item.quantity);
        setTotalQuantity(sum);
    }, [cart]);

    return (
        <IonFooter>
            <IonToolbar className='glassmorphism'>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <IonButtons>
                        <IonItem
                            className='px-1'
                            routerLink='/home'
                            routerDirection="none"
                            lines="none"
                            detail={false}
                        >
                            <IonIcon
                                ios={home}
                                md={home}
                            />
                        </IonItem>

                        <IonItem
                            className='px-1'
                            routerLink='/explore-games'
                            routerDirection="none"
                            lines="none"
                            detail={false}
                        >
                            <IonIcon
                                ios={gameController}
                                md={gameController}
                            />
                        </IonItem>

                        <IonItem
                            className='px-1'
                            routerLink='/cart'
                            routerDirection="none"
                            lines="none"
                            detail={false}
                        >
                            <IonIcon
                                ios={cartIcon}
                                md={cartIcon}
                            />
                            {totalQuantity > 0 &&
                                <IonBadge
                                    className='py-1 px-2 round'
                                    color='danger'
                                    style={{position: 'absolute', top: 0, left: 15}}>{totalQuantity}
                                </IonBadge>
                            }
                        </IonItem>

                        <IonItem
                            className='px-1'
                            routerLink='/'
                            routerDirection="none"
                            lines="none"
                            detail={false}
                        >
                            <IonIcon
                                ios={person}
                                md={person}
                            />
                        </IonItem>

                        <IonMenuToggle>
                            <IonItem
                                className='px-1'
                                lines="none"
                                detail={false}
                            >
                                <IonIcon
                                    ios={ellipsisHorizontal}
                                    md={ellipsisVertical}
                                />
                            </IonItem>
                        </IonMenuToggle>

                    </IonButtons>
                </div>

            </IonToolbar>
      </IonFooter>
    );
};

export default Navbar;