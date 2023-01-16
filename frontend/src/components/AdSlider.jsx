import { 
    IonSlides,
    IonSlide,
    IonImg,
    IonButton
} from '@ionic/react';

const AdSlider = () => {

    // Optional parameters to pass to the swiper instance. See https://swiperjs.com/swiper-api for valid options.
    const slideOpts = {
        initialSlide: 0,
        loop: true,
        speed: 400
    };
  
    return (
        <IonSlides pager={true} options={slideOpts}>
            <IonSlide className='position-relative'>
                <IonImg src='assets/slider_no-mans-sky.png' style={{margin: 'auto'}}></IonImg>
                <IonButton
                    routerLink='/games/68'
                    className='gradient position-absolute'
                    style={{bottom: '20px'}}
                    shape="round" size="default">Découvrir
                </IonButton>
            </IonSlide>

            <IonSlide className='position-relative'>
                <IonImg src='assets/slider_dishonored.png' style={{margin: 'auto'}}></IonImg>
                <IonButton
                    className='gradient disabled position-absolute'
                    style={{bottom: '20px'}}
                    shape="round" size="default">Bientôt disponible
                </IonButton>
            </IonSlide>

            <IonSlide className='position-relative'>
                <IonImg src='assets/slider_final-fantasy-xiv.png' style={{margin: 'auto'}}></IonImg>
                <IonButton
                    className='gradient disabled position-absolute'
                    style={{bottom: '20px'}}
                    shape="round" size="default">Bientôt disponible
                </IonButton>
            </IonSlide>
            
            <IonSlide className='position-relative'>
                <IonImg src='assets/slider_indiana-jones.png' style={{margin: 'auto'}}></IonImg>
                <IonButton
                    routerLink='/games/69'
                    className='gradient position-absolute'
                    style={{bottom: '20px'}}
                    shape="round" size="default">Découvrir
                </IonButton>
            </IonSlide>
        </IonSlides>
    );
  };
  
  export default AdSlider;