import { 
    IonSlides,
    IonSlide,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle,
    IonButton,
    IonImg,
    useIonViewDidEnter
} from '@ionic/react';

// React :
import { useState, useEffect } from 'react';

// 🛠️ Hooks :
import useFetchGames from '../hooks/useFetchGames';
import useDataProvider from '../hooks/useDataProvider';

const CardSlider = () => {

    // Optional parameters to pass to the swiper instance. See https://swiperjs.com/swiper-api for valid options.
    const slideOpts = {
        initialSlide: 0,
        loop: true,
        speed: 800,
    };

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;

    // 🎮 Fetch all games :
    const { data: games, setData: setGames, fetchData } = useFetchGames();

    const { addToCart } = useDataProvider();

    //Reload data upon IonView's entering :
    useEffect(() => {
        fetchData();
    });

    return (

        <IonSlides pager={false} options={slideOpts}>

            {games.map(game => (
                <IonSlide key={game.id}>
                    <IonCard routerLink={`/games/${game.id}`} className='custom-card'>
                        <div className='card-img-wrapper'>
                            {game?.attributes?.image?.data ?
                            <img
                                className='card-slider-img'
                                src={`${API_URL}${game.attributes.image.data.attributes.url}`}  />
                            :
                            <img
                                className='card-slider-img'
                                src='assets/unknown_image.jpg'  />
                            }
                        </div>
                        <IonCardHeader>
                            <IonCardTitle>{game.attributes.title}</IonCardTitle>
                            <IonCardSubtitle className=''>{game.attributes.developer}</IonCardSubtitle>
                        </IonCardHeader>
    
                        <IonCardContent>
                            {game.attributes.description ? 
                                <p>{game.attributes.description.slice(0, 85)} ...</p> 
                                : 
                                <p>Here's a small text description for the game's synopsis. Nothing more, nothing less.</p>
                            }
                            <h1 className='text-tertiary py-4 float-left'><strong>{game.attributes.price.toFixed(2)}€</strong></h1>
                            <IonButton 
                                onClick={() => addToCart({ id: game.id, quantity: 1, attributes: game?.attributes }) }
                                size='small'
                                className="gradient my-4 float-right"
                            >
                                Ajouter
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                </IonSlide>
            ))}

        </IonSlides>
    );
};

export default CardSlider;
