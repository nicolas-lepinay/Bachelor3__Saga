import { useHistory } from "react-router-dom";

import { 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
    IonBackButton
} from '@ionic/react';

const Header = ({ page }) => {

    const history = useHistory();
  
    return (
        <IonHeader>
            <IonToolbar className="bg-dark">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" onClick={history.goBack}></IonBackButton>
                </IonButtons>
                <IonTitle size='small' className="px-5">{page || ''}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
  };
  
  export default Header;