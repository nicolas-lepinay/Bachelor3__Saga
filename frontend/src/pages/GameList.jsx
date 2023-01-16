// Ionic :
import { 
    IonImg,
    IonButton, 
    IonContent, 
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonSearchbar,
    useIonViewWillEnter
} from '@ionic/react';

// React :
import { useState, useEffect } from 'react';

// Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';

// 🛠️ Hooks :
import useFetchGames from '../hooks/useFetchGames';

const GameList = () => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;

    // 🎮 Fetch game by id :
    const { 
        data: games,
        setData: setGames,
        fetchData
    } = useFetchGames({ sort: true });

    // Reload data upon IonView's entering :
    useIonViewWillEnter(() => {
        fetchData();
    });

    const [filteredGames, setFilteredGames] = useState([]); // Games list after search

    // Search function :
    const handleSearch = (e) => {
        let query = '';
        const target = e.target;

        if(target) 
            query = target.value.toLowerCase();
        
        setFilteredGames(games.filter(item => item.attributes.title.toLowerCase().indexOf(query) > -1));
    }

    // Set filtered games to all games by default :
    useEffect( () => {
        setFilteredGames(([...games]));
    }, [games]);

    return (
        <IonPage>

            <Header page='Parcourir les jeux'/>
            <IonContent fullscreen>

                <IonCard className='dark-glassmorphism py-4 my-5'>
                    <IonSearchbar 
                        className='searchbar px-4 my-1'
                        placeholder='Rechercher un jeu...'
                        onIonChange={(e) => handleSearch(e)}
                    />

                    <IonCardContent>
                        <IonList>
                            {filteredGames.map(game => (
                            <IonItem className='py-2' routerLink={`/games/${game.id}`}>
                                <IonThumbnail slot="start" className='mx-5-right position-relative'>
                                <span 
                                    className='position-absolute text-tertiary bold font-size-18'
                                    style={{left: '45px', textShadow: '#000000 -2px 3px 3px'}}
                                >{Math.round(game.attributes.price)}€</span>
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
                                <IonLabel>{game.attributes.title}</IonLabel>
                            </IonItem>
                            ))}

                            {filteredGames.length === 0 &&
                                <IonItem className='py-2'>
                                    <IonLabel>Aucun résultat n'a été trouvé 😔</IonLabel>
                                </IonItem>
                            }
                        </IonList>
                    </IonCardContent>
                </IonCard>

            </IonContent>
            <Navbar />
      </IonPage>
    );
  };
  
  export default GameList;