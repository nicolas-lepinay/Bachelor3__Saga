import { useState, useRef } from 'react';

import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonImg,
  IonDatetime,
  IonModal,
  IonIcon,
  useIonAlert,
  IonTextarea 
} from '@ionic/react';

import { trash } from 'ionicons/icons';

const GameEditModal = ({ onDismiss, game }) => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;

    const titleRef = useRef(null);
    const developerRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const [releaseDate, setReleaseDate] = useState(game.attributes.release_date);

    const dateModal = useRef(null);

    const [presentAlert] = useIonAlert();

    console.log(game)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className='bg-dark'>
                    <IonButtons slot="start">
                        <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                        Annuler
                        </IonButton>
                    </IonButtons>

                    <IonTitle></IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={() => onDismiss({
                            id: game.id,
                            title: titleRef.current.value,
                            developer: developerRef.current.value,
                            description: descriptionRef.current.value,
                            price: priceRef.current.value,
                            release_date: releaseDate
                        }, 'confirm')}>Valider</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                
                {game.attributes.logo.data && 
                <IonImg
                    className='edit-logo-img my-5'
                    src={`${API_URL}${game.attributes.logo.data.attributes.url}`}
                />}

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Nom</IonLabel>
                    <IonInput 
                        ref={titleRef}
                        placeholder="Entrer un nom..."
                        clearInput={true}
                        value={game.attributes.title}
                        onClick={() => console.log(game)}
                        //onIonChange={() => console.log(titleRef.current.value)}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Développeur</IonLabel>
                    <IonInput 
                        ref={developerRef}
                        placeholder="Entrer un développeur..."
                        clearInput={true}
                        value={game.attributes.developer}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea  
                        ref={descriptionRef}
                        placeholder="Entrer une description..."
                        clearInput={true}
                        value={game.attributes.description}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Prix (en euros)</IonLabel>
                    <IonInput 
                        ref={priceRef}
                        placeholder="Entrer un prix..."
                        clearInput={true}
                        value={game.attributes.price}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Date de sortie</IonLabel>
                    <IonInput 
                        placeholder="Sélectionner une date..."
                        clearInput={true}
                        value={releaseDate}
                        readonly={true}
                        id="open-modal" 
                    />
                </IonItem>

                <IonButton
                    size='small'
                    expand='full'
                    fill='clear'
                    color='danger'
                    className='m-top-6'
                    onClick={() =>
                        presentAlert({
                          header: 'Êtes-vous sûr(e) ?',
                          message: 'Voulez-vous supprimer ce jeu ?',
                          buttons: [
                            {
                              text: 'Annuler',
                              role: 'cancel',
                              handler: () => {
                                // Nothing
                              },
                            },
                            {
                              text: 'Confirmer',
                              role: 'confirm_deletion',
                              handler: () => {
                                // handleDelete(game.id);
                                console.log()
                                onDismiss(game.id, 'confirm_deletion');
                              },
                            },
                          ],
                          //onDidDismiss: (e) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
                        })
                      }
                    >
                    <IonIcon slot="start" icon={trash} className='mx-2-right'></IonIcon>
                        Supprimer
                </IonButton>

                <IonModal
                    ref={dateModal}
                    trigger="open-modal"
                    initialBreakpoint={0.5}
                    breakpoints={[0, 0.5, 0.75]}
                    handleBehavior="cycle"
                    >
                    <IonContent className="ion-padding">
                        <IonDatetime 
                            className='py-5 m-auto'
                            color='tertiary'
                            presentation="date" 
                            preferWheel={true}
                            min="1980-01-01"
                            max="2030-12-31"
                            value={releaseDate}
                            onIonChange={(e) => setReleaseDate(e.target.value)}
                            >
                        </IonDatetime>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
  };
  

export default GameEditModal;