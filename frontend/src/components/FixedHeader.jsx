import { 
    IonHeader, 
    IonToolbar
} from '@ionic/react';

const FixedHeader = (props) => {

    return (
        <IonHeader>
            <IonToolbar>
                {props.children}
            </IonToolbar>
      </IonHeader>
    );
};

export default FixedHeader;