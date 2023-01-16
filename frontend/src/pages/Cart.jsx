// Ionic :
import { 
    IonButton, 
    IonIcon,
    IonContent, 
    IonPage, 
    IonLabel,
    IonItem,
    IonBadge,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonCardContent,
    IonImg,
    useIonModal
} from '@ionic/react';

import { card } from 'ionicons/icons';

// React :
import { useState, useEffect, useLayoutEffect } from 'react';

// Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import CartItem from '../components/CartItem';

// 🛠️ Hooks :
import useDataProvider from '../hooks/useDataProvider';

// Stripe Checkout :
import StripeCheckout from 'react-stripe-checkout';

const OrderConfirmedModal = ({ onDismiss }) => {

    return (
      <IonPage>
        <IonContent 
            className="ion-padding" 
            //onClick={() => onDismiss()}
        >
            <IonImg src='assets/confirmed_order.png' className='w-60 py-3' style={{margin: 'auto'}}></IonImg>
            <h1 className='center py-3 px-3 font-family-sofia'>Votre commande est confirmée</h1>
            <p className='center px-3' style={{opacity: '0.4'}}>Nous vous avons envoyé un e-mail de confirmation avec les détails de votre achat.</p>
            <IonButton
                routerLink='/home'
                className='gradient center px-5 my-5'
                shape="round" size="default">Retour à l'accueil
            </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  

const Cart = () => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY; // Stripe public key

    const {
        cart,
        clearCart,
    } = useDataProvider();

    const [total, setTotal] = useState(0);

    const [stripeToken, setStripeToken] = useState(null);
    const [stripeData, setStripeData] = useState(null);

    const [present, dismiss] = useIonModal(OrderConfirmedModal, {
        onDismiss: () => dismiss()
    });

    const openConfirmationModal = () => {
        present({
            onWillDismiss: () => {
                // do nothing particular
            },
          });
    }

    const onToken = (token) => {
        setStripeToken(token);
        openConfirmationModal();
    }

    useLayoutEffect( () => {
        let sum = 0;
        cart.map( (item) => (
            sum += (item.attributes.price * item.quantity)
        ));
        setTotal(sum);
    }, [cart]);

    useEffect( () => {
        const makeRequest = async () => {
            try {
                // const res = await axios.post('/checkout/payment', {
                //     tokenId: stripeToken.id,
                //     amount: total * 100,
                // });
                //createOrder(res.data, cart);
                clearCart();
            } catch(err) {
                console.log(err)
            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, total])

    
    const EmptyCart = () => {
        return (
            <div className='' style={{textAlign: 'center'}}>
                <IonImg src='assets/empty_cart.png' className='w-60 py-5' style={{margin: 'auto'}}/>
                <h1 className="center px-3 font-family-sofia">Votre panier est vide</h1>
                <p className='center px-3' style={{opacity: '0.4'}}>Une envie ? Explorez notre catalogue.</p>
                <IonButton shape="round" className='gradient my-5' routerLink='/home' style={{marginLeft: 'auto'}}>Retour à l'accueil</IonButton>
            </div>
        )
    }

    const FullCart = () => {
        return (
            <>
                <IonCard className='py-3 my-4 dark-glassmorphism'>
                    <IonCardHeader>
                        <IonCardTitle className='font-family-sofia'>Mon panier</IonCardTitle>
                        <IonCardSubtitle>Veuillez vérifier votre panier avant de passer au paiement.</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            {cart.map(game => (
                                <CartItem game={game} key={game.id}/>
                            ))}
                        </IonList>
                        <IonList>
                            <IonItem className='py-4'>
                                <IonBadge slot="end" color='dark' className='px-3 py-2'>{total.toFixed(2)}€</IonBadge>
                                <IonLabel>
                                    <h2 className='font-family-sofia bold'>PRIX TOTAL</h2>
                                </IonLabel>
                            </IonItem>
                        </IonList>

                        <StripeCheckout
                            name="Saga Inc."
                            image='assets/saga-inc.png'
                            billingAddress
                            shippingAddress
                            description= {`Le montant à payer est de ${total.toFixed(2)}€.`}
                            amount={total * 100}
                            token={onToken}
                            stripeKey={STRIPE_KEY}
                        >
                            <IonButton
                                shape="round"
                                className='gradient float-right'
                                >
                                <IonIcon slot="start" icon={card} className='mx-3-right'></IonIcon>
                                Confirmer
                            </IonButton>
                        </StripeCheckout>
                    </IonCardContent>
                </IonCard>
            </>
        )
    }
        
    return (
        <IonPage>
            <Header page='Panier'/>
            <IonContent fullscreen>
                <>
                    {cart.length > 0 ? <FullCart/> : <EmptyCart/>}
                </>
            </IonContent>
            <Navbar />
      </IonPage>
    );
  };
  
  export default Cart;