// Ionic :
import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    useIonModal
} from '@ionic/react';

import { create, add } from 'ionicons/icons';

// React :
import { useState, useEffect } from 'react';

// Components
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import GameEditModal from '../modals/GameEditModal';
import NewGameModal from '../modals/NewGameModal';

// 🛠️ Hooks :
import useFetchGames from '../hooks/useFetchGames';

import axios from 'axios';

const Settings = () => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const GAMES_ROUTE = process.env.REACT_APP_GAMES_ROUTE;
    const UPLOAD_ROUTE = process.env.REACT_APP_UPLOAD_ROUTE;

    // 🎮 Fetch games :
    const { 
        data: games, 
        setData: setGames 
    } = useFetchGames({ sort: true });

    const [filteredGames, setFilteredGames] = useState([]); // Games list after search
    const [game, setGame] = useState({}); // Game clicked for editing

    // Set filtered games to games by default :
    useEffect( () => {
        setFilteredGames(sortByTitle([...games]));
    }, [games]);

    // Sorting function :
    const sortByTitle = (myArray) => {
        return myArray.sort((a, b) => a.attributes.title > b.attributes.title ? 1 : -1)
    }

    // Search function :
    const handleSearch = (e) => {
        let query = '';
        const target = e.target;

        if(target) 
            query = target.value.toLowerCase();
        
        setFilteredGames(games.filter(item => item.attributes.title.toLowerCase().indexOf(query) > -1));
    }

    // Edit Modal :
    const [present, dismiss] = useIonModal(GameEditModal, {
        onDismiss: (data, role) => { dismiss(data, role) },
        game: game,
    });

    // New Game Modal :
    const [presentNew, dismissNew] = useIonModal(NewGameModal, {
        onDismiss: (data, role) => dismissNew(data, role)
    });

    function openModal() {
        present({
          onWillDismiss: (ev) => {
            if (ev.detail.role === 'confirm' && ev.detail.data != null) {
                handleUpdate(ev.detail.data)
            }
            if (ev.detail.role === 'confirm_deletion') {
                handleDelete(ev.detail.data) // Game id
            }
          },
        });
    }

    function openNewModal() {
        presentNew({
          onWillDismiss: (ev) => {
            if (ev.detail.role === 'confirm') {
                handlePublish(ev.detail.data)
            }
          },
        });
    }

    // Update from database function :
    const handleUpdate = async (data) => {
        try {
            const res = await axios.put(`${API_URL}${GAMES_ROUTE}/${data.id}?populate=*`, {data: data}); // Update
            const updatedGame = res.data.data;

            // Update games list displayed :
            const newState = games.map(game => {
                // 👇️ If id equals updated game's id, replace it with new updated one:
                if (game.id === updatedGame.id)
                    return updatedGame;
                // 👇️ ...otherwise return game object as is
                return game;
            });
            setGames(newState);
        } catch(err) {
            console.log("UPDATE | Games | Le jeu n'a pas pu être modifié dans la base de données. | " + err);
        }
    }

    // Delete from database function :
    const handleDelete = async (gameId) => {
        try {
            const res = await axios.delete(`${API_URL}${GAMES_ROUTE}/${gameId}`); // Delete game
            const removedGame = res.data.data;

            // Update games list displayed :
            const newState = games.filter(game => game.id !== removedGame.id);
            setGames(newState);

        } catch(err) {
            console.log("DELETE | Games | Le jeu n'a pas pu être supprimé de la base de données. | " + err);
        }
    }

    // Post new game to database function :
    const handlePublish = async (data) => {
        let newGame = null;

        // Game publishing :
        try {
            const res = await axios.post(`${API_URL}${GAMES_ROUTE}?populate=*`, { data: data }); // Post new game
            newGame = res.data.data;
        } catch(err) {
            console.log("PUBLISH | Games | Le jeu n'a pas pu être ajouté dans la base de données. | " + err);
        }

        // Logo uploading :
        if(data.logo) 
            await upload({ 
                file: data.logo,        // File to upload
                refId: newGame?.id,     // ID of entry to link the file to
                field: 'logo',          // Name of the property of the entry to link the file to
                ref: 'api::game.game'   // Unique ID of the type/model
            });
        
        // Image uploading :
        if(data.image) 
            await upload({ 
                file: data.image, 
                refId: newGame?.id, 
                field: 'image', 
                ref: 'api::game.game'
            });
        
        // Update games list displayed :
        setGames([newGame, ...games]);
    }

    // Upload images to database and link them to an entry :
    const upload = async (data) => {
        try {
            const formData = new FormData();
            formData.append('files', data.file);
            formData.append('refId', data.refId);
            formData.append('field', data.field);
            formData.append('ref', data.ref);

            console.log('UPLOAD')
            console.log(formData);
            console.log(formData.files)
            console.log('// UPLOAD')

            const req = await fetch(`${API_URL}${UPLOAD_ROUTE}`, {
                method: 'POST',
                body: formData
            });
            
            //const res = await req.json();
            //console.log(res)

        } catch(err) {
            console.log(`UPLOAD | Field : ${data?.field} | Le fichier n'a pas pu être uploadé dans la base de données. | ` + err);
        }
    }

    return (
        <IonPage>
            
            <Header page={'Paramètres'}/>
            <IonContent fullscreen>

                <IonSearchbar 
                    className='searchbar px-4 my-4'
                    placeholder='Rechercher un produit...'
                    onIonChange={(e) => handleSearch(e)}
                />

                <div className='d-flex row-reverse'>
                    <IonButton
                        size='small'
                        fill='clear'
                        className='px-4'
                        onClick={() => { openNewModal() }}
                        >
                            <IonIcon slot="start" icon={add} className='mx-3-right'></IonIcon>
                            Nouveau
                    </IonButton>
                </div>

                <IonCard className='transparent my-4'>
                    <IonCardHeader>
                        <IonCardTitle className='font-family-sofia'>Liste des produits</IonCardTitle>
                        <IonCardSubtitle>Modifier ou supprimer des produits</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            {filteredGames.map(game => (
                                <IonItem className='py-1' key={game.id}>
                                    <IonButton 
                                        size='default'
                                        fill="clear"
                                        expand="block" 
                                        onClick={() => { setGame(game); openModal(game) }}
                                    >
                                        <IonIcon slot="start" icon={create} className='mx-3-right'></IonIcon>
                                        {game.attributes.title}
                                    </IonButton>
                                </IonItem>
                            ))}

                            {filteredGames.length === 0 &&
                                <IonItem className='py-2'>
                                    <IonLabel>Aucun résultat n'a été trouvé.</IonLabel>
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
  
  export default Settings;