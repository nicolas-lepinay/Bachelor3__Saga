// Ionic :
import {
    IonImg,
    IonButton,
    IonContent,
    IonPage
} from '@ionic/react';

// React :
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import CartConfirmationModal from '../modals/CartConfirmationModal';

// 🛠️ Hooks :
import useFetchGames from '../hooks/useFetchGames';
import useDataProvider from '../hooks/useDataProvider';


const Game = () => {

    const { id } = useParams();

    const page = useRef(null);

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;

    // 🎮 Fetch game by id :
    const {
        data: game,
        setData: setGame } = useFetchGames({ filters: `&filters[id]=${id}`, isUnique: true });

    const {
        cart,
        addToCart,
    } = useDataProvider();

    const [quantity, setQuantity] = useState(1);

    console.log(game)

    useEffect( () => {
        setQuantity(1);
    }, [id]);

    return (
        <IonPage ref={page}>

            <Header page={game?.attributes?.title}/>

            <IonContent fullscreen>

                {game?.attributes?.image?.data ?
                    <IonImg
                        src={`${API_URL}${game.attributes.image.data.attributes.url}`}  
                    />
                :
                game?.attributes?.image_url ?
                    <IonImg
                        src={game.attributes.image_url}
                    />
                :
                    <IonImg
                        src='assets/unknown_image.png'
                    />
                }

                <div className="px-4 py-3">
                    <h2 className='font-family-sofia'>{game?.attributes?.title}</h2>
                    <p className='text-tertiary'>{game?.attributes?.developer}</p>
                    <h1 className='py-3-top'><strong>{game?.attributes?.price.toFixed(2)}€</strong></h1>
                    {game?.attributes?.description ? 
                        <p className='font-size-14'>{game?.attributes?.description}</p> 
                        : 
                        <p>Si vous êtes à la recherche d'un jeu captivant, alors voici l'offre que vous ne pouvez pas manquer ! Les équipes de {game?.attributes?.developer || 'dévelopeurs'} ont produit ensemble {game?.attributes?.title}. Conçu avec le plus grand soin et le plus grand souci du détail, le jeu célèbre le triomphe d'un travail acharné et d'une perspective novatrice sur le jeu. Achetez {game?.attributes?.title} pour vivre une riche expérience d'action et économiser vos fonds à un prix plus avantageux. Que peut-on rêver de mieux qu'une soirée tranquille passée avec un jeu passionnant qui vous réserve des moments inoubliables dans le monde virtuel ?</p>
                    }

                {game?.attributes?.logo?.data &&
                    <div className='center py-5'>
                        <IonImg
                            src={`${API_URL}${game.attributes.logo.data.attributes.url}`}
                            className='w-50'
                            >
                        </IonImg>
                    </div>
                }

                    <div>
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <IonButton
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    fill="clear"
                                    size="large">-</IonButton>
                                <IonButton
                                    fill="clear"
                                    size="default">{quantity}</IonButton>
                                <IonButton
                                    onClick={() => quantity < 5 && setQuantity(quantity + 1)}
                                    fill="clear"
                                    size="large">+</IonButton>
                            </div>

                            <IonButton
                                onClick={ () => addToCart({ id: game?.id, quantity: quantity, attributes: game?.attributes}) }
                                id="open-modal"
                                className='gradient'
                                expand="block"
                                shape="round"
                                size="default">Ajouter
                            </IonButton>
                        </div>
                    </div>
                </div>

            </IonContent>

            <CartConfirmationModal/>
            
            <Navbar />

      </IonPage>
    );
  };

  export default Game;