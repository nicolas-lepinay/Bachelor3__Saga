import { 
    IonContent, 
    IonPage, 
    IonSlides,
    IonSlide,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle,
    IonButton,
    useIonViewDidEnter,
    IonImg
} from '@ionic/react';

import Navbar from '../components/Navbar';
import AdSlider from '../components/AdSlider';
//import CardSlider from '../components/CardSlider';

// 🛠️ Hooks :
import useFetchGames from '../hooks/useFetchGames';
import useDataProvider from '../hooks/useDataProvider';

const Home = () => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;

    // 🎮 Fetch games :
    const { 
        data: games,
        fetchData
    } = useFetchGames({ sort: true });

    // 🎮 Fetch games :
    const { 
        data: games2,
        fetchData: fetchData2
    } = useFetchGames({ unsort : true });

    const { addToCart } = useDataProvider();

    //Reload data upon IonView's entering :
    useIonViewDidEnter(() => {
        fetchData();
        fetchData2();
    });

    console.log(games)


    const CardSlider = ({ data }) => {

        // Optional parameters to pass to the swiper instance. See https://swiperjs.com/swiper-api for valid options.
        const slideOpts = {
            initialSlide: 0,
            loop: true, 
            speed: 800,
        };

        return (
            <IonSlides pager={false} options={slideOpts}>
                {data.map(game => (
                    <IonSlide key={game.id} className='position-relative'>

                        <IonCard routerLink={`/games/${game.id}`} className='custom-card'>
                            <div className='card-img-wrapper'>
                                {game?.attributes?.image?.data ?
                                    <img
                                        className='card-slider-img'
                                        src={`${API_URL}${game.attributes.image.data.attributes.url}`}  
                                    />
                                :
                                game?.attributes?.image_url ?
                                    <img
                                        className='card-slider-img'
                                        src={game.attributes.image_url}
                                    />
                                :
                                    <img
                                        className='card-slider-img'
                                        src='assets/unknown_image.png'
                                    />
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
                            </IonCardContent>
                        </IonCard>

                        <IonButton 
                            onClick={() => addToCart({ id: game.id, quantity: 1, attributes: game?.attributes }) }
                            size='small'
                            className="gradient position-absolute"
                            style={{bottom: 33, right: 30}}
                        >
                            Ajouter
                        </IonButton>
                    </IonSlide>
                ))}
            </IonSlides>
        );
    };

    return (
        <IonPage>
            <Navbar />
            <IonContent fullscreen className="ion-padding">
                <IonImg src='assets/saga-inc.png' className="w-50" style={{margin: 'auto'}}></IonImg>

                <h4 className="center font-family-sofia">Nous avons pour mission de permettre à chacun de découvrir les joies du gaming.</h4>

                <AdSlider />

                <div className="py-4">
                    <h1 className="center font-family-sofia font-size-32">Notre histoire</h1>
                    <p className="px-3 py-1 font-size-14">
                        Nous avons pour mission de permettre à chacun de découvrir les joies du gaming.
                        L’avenir du gaming va au-delà du divertissement et c’est un privilège d’aider à le façonner! 
                        Nous construisons une marketplace sûre, abordable et durable pour les joueurs d’aujourd’hui et de demain.
                    </p>
                </div>

                <div className="my-4">
                    <h1 className="center py-3 font-family-sofia font-size-32">Nouveautés</h1>
                    <CardSlider key="slider-001" data={games} />
                </div>

                <div className="my-5">
                    <h1 className="center py-3 font-family-sofia font-size-32">Populaires</h1>
                    <CardSlider key="slider-002" data={games2} />
                </div>

            </IonContent>
      </IonPage>
    );
  };
  
  export default Home;