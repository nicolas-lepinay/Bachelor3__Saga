import { useState, useRef } from 'react';

import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonModal,
  IonIcon,
  IonAvatar,
  useIonToast,
  IonSpinner 
} from '@ionic/react';

// For Ionic web UI for PhotoGallery :
//import { defineCustomElements } from '@ionic/pwa-elements/loader';

// 🔩 Hooks :
//import { usePhotoGallery } from '../hooks/usePhotoGallery';

import { add, send } from 'ionicons/icons';

// Camera Scan
import { QrReader } from 'react-qr-reader';

// Text decoder
import Tesseract from 'tesseract.js';

import axios from "axios";

const NewGameModal = ({ onDismiss }) => {

    const titleRef = useRef(null);
    const developerRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);

    const today = new Date().toJSON().slice(0,10);
    const [releaseDate, setReleaseDate] = useState(today);

    const [logoFile, setLogoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const dateModal = useRef(null);
    const barcodeTextRef = useRef(null);

    // Loading
    const [decodingBarcode, setDecodingBarcode] = useState(false);
    const [fetchingAPI, setFetchingAPI] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    // Confirmation alert :
    const [presentToast] = useIonToast();

    // Create a reference to the hidden file input element    
    const logoFileInput = useRef(null);
    const imageFileInput = useRef(null);
    const barcodeFileInput = useRef(null);

    // Call a function (that can be passed as a prop from the parent component) to handle the user-selected file 
    const handleLogoFile = event => setLogoFile((event.target.files[0]));

    const handleImageFile = event => {
        setImageFile(event.target.files[0]); 
        setImageURL(null);
    }

    const fetchAPI = async (query) => {
        setFetchingAPI(true);
        const API_OPTIONS = {
            method: 'GET',
            url: 'https://barcodes1.p.rapidapi.com/',
            params: { query: query },
            headers: {
              'X-RapidAPI-Key': '623b0fd4c3msh19112eead7bb9dbp1b55e8jsnf6240ff98f13',
              'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
            }
        };
        axios.request(API_OPTIONS).then( async (response) => {
            const game = response?.data?.product;
            if(game.title)
                titleRef.current.value = game.title
            if(game.manufacturer)
                developerRef.current.value = game.manufacturer
            if(game.description)
                descriptionRef.current.value = game.description
            if(game.online_stores.length > 0)
                priceRef.current.value = game.online_stores[0].price.substring(1)
            if(game.images.length > 0) {
                // const header = {'Origin': '*', 'Access-Control-Request-Method': 'GET', 'Access-Control-Request-Headers': 'X-Requested-With'};
                // const options = {method: 'GET', mode: 'no-cors', headers: header};
                // const res = await fetch(game.images[0], options);
                // const blob = await res.blob();
                // const file = new File([blob], 'image.jpg', { type: "image/jpeg" });
                // setImageFile(file);
                setImageURL(game.images[0]);
                setImageFile(null);
            }
        }).then( () => {
            setFetchingAPI(false);
        }).catch( (error) => {
            console.error(error);
            setFetchingAPI(false);
        });
    }

    const handleBarcodeFile = async (event) => {
        setDecodingBarcode(true); // Show loading spinner icon
        const file = event.target.files[0];

        if(!file) {
            console.log('Barcode file is null.');
            return;
        }
        Tesseract.recognize(URL.createObjectURL(file), 'eng', { tessedit_char_whitelist: '0123456789' })
            .then((data) => {
                const text = data?.data?.text.replace(/\D/g,'');
                barcodeTextRef.current.value = text;
                return text;
            })
            .then( (text) => { 
                setDecodingBarcode(false); 
                setFetchingAPI(true);
                fetchAPI(text);
            }
        )
    };

    const [triggerCamera, setTriggerCamera] = useState(false);
    const qrReaderRef = useRef(null);

    const checkAndDismiss = () => {
        const data = {
            title: titleRef?.current?.value,
            developer: developerRef?.current?.value,
            description: descriptionRef?.current?.value,
            price: priceRef?.current?.value,
            release_date: releaseDate,
            logo: logoFile,
            image: imageFile,
            image_url: imageURL
        }
        if(!data.title || data.title === ''
            || !data.developer || data.developer === ''
            || !data.price || data.price === '') {
                presentToast({
                    message: "Veuillez remplir tous les champs obligatoires.",
                    duration: 3000,
                    position: 'bottom',
                    buttons: [
                      {
                        text: 'Fermer',
                        role: 'cancel',
                      }
                    ]
                  })
        } else {
            onDismiss(data, 'confirm');
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className='bg-dark'>
                    <IonButtons slot="start">
                        <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                        Annuler
                        </IonButton>
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton 
                            onClick={checkAndDismiss}
                            >Valider</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Nom <span style={{color: 'red'}}>*</span></IonLabel>
                    <IonInput 
                        ref={titleRef}
                        placeholder="Entrer un nom..."
                        clearInput={true}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Développeur <span style={{color: 'red'}}>*</span></IonLabel>
                    <IonInput 
                        ref={developerRef}
                        placeholder="Entrer un développeur..."
                        clearInput={true}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea 
                        ref={descriptionRef}
                        placeholder="Entrer une description..."
                        autoGrow={true}
                        //clearInput={true}
                    />
                </IonItem>

                <IonItem className='py-2'>
                    <IonLabel position="stacked">Prix (en euros) <span style={{color: 'red'}}>*</span></IonLabel>
                    <IonInput 
                        ref={priceRef}
                        placeholder="Entrer un prix..."
                        clearInput={true}
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
                            onIonChange={(e) => setReleaseDate(e.target.value.slice(0, 10))}
                            >
                        </IonDatetime>
                    </IonContent>
                </IonModal>

                <div className='d-flex justify-content-between align-items-center'>
                    <IonButton
                        size='small'
                        fill='clear'
                        className='m-top-4'
                        onClick={() => logoFileInput.current.click()}>
                            <IonIcon slot="start" icon={add}></IonIcon>
                            Logo
                    </IonButton>

                    <IonButton
                        size='small'
                        fill='clear'
                        className='m-top-4'
                        onClick={() => imageFileInput.current.click()}>
                            <IonIcon slot="start" icon={add}></IonIcon>
                            Image
                    </IonButton>
                </div>

                <div className='d-flex justify-content-between align-items-center px-3 py-3'>
                    {logoFile &&
                        <img src={URL.createObjectURL(logoFile)} className='new-logo-img float-left' onClick={() => logoFileInput.current.click()} />
                    }

                    {imageFile &&
                        <IonAvatar>
                          <img src={URL.createObjectURL(imageFile)} onClick={() => imageFileInput.current.click()} />
                        </IonAvatar>
                    }

                    {imageURL &&
                        <IonAvatar>
                          <img src={imageURL} onClick={() => imageFileInput.current.click()} />
                        </IonAvatar>
                    }
                </div>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    ref={logoFileInput}
                    onChange={handleLogoFile}
                    style={{display: 'none'}}
                />

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    ref={imageFileInput}
                    onChange={handleImageFile}
                    style={{display: 'none'}}
                />

                <hr/>

                <p className='uppercase center py-3'>ou scanner un code-barre</p>
                <div className='center'>
                    <div 
                        id="open-camera-modal" 
                        className='center px-3 py-3 mx-3 round' 
                        style={{background: 'linear-gradient(160deg, rgba(72, 65, 254) 20%, rgba(173, 71, 254) 95%)', width: '60px'}}
                        onClick={() => setTriggerCamera(true)}
                    >
                        
                        <img src='assets/scan-icon.png'/>
                    </div>

                    <div className='center px-3 py-3 mx-3 round' style={{background: 'linear-gradient(160deg, rgba(72, 65, 254) 20%, rgba(173, 71, 254) 95%)', width: '60px'}}>
                        <img
                            src='assets/camera-icon.png'
                            onClick={() => barcodeFileInput.current.click()}
                        />
                    </div>
                </div>

                <IonItem className='px-5 py-4'>
                    <IonLabel position="stacked">ISBN / EAN</IonLabel>
                        <IonInput placeholder="Aucun code n'a été détecté" ref={barcodeTextRef}></IonInput>
                </IonItem>

                {decodingBarcode && <IonSpinner name="dots" className='center'></IonSpinner>}
                {fetchingAPI && <IonSpinner className='center'></IonSpinner>}

                <IonButton size='small' fill='clear' expand='full' className='my-2' onClick={() => fetchAPI(barcodeTextRef.current.value)}>
                    <IonIcon slot="start" icon={send} className='mx-3-right'></IonIcon>
                    Envoyer un code
                </IonButton>

                <IonModal
                    onWillDismiss={() => setTriggerCamera(false)}
                    trigger="open-camera-modal"
                    initialBreakpoint={0.75}
                    breakpoints={[0, 0.75, 1]}
                    handleBehavior="cycle"
                    >
                    <IonContent className="ion-padding">

                    {triggerCamera && 
                        <QrReader 
                            forwardRef={qrReaderRef}
                            delay={300}
                            style={{width: "100%"}}
                            //legacyMode
                        /> 
                    }
                    </IonContent>
                </IonModal>

                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={barcodeFileInput}
                    onChange={handleBarcodeFile}
                    style={{display: 'none'}}
                />

                <div style={{paddingBottom: '100px'}}></div>
            </IonContent>
        </IonPage>
    );
  };
  

export default NewGameModal;