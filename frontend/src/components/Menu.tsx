import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
  } from '@ionic/react';
  
  import React from 'react';
  import { useLocation } from 'react-router-dom';
  import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
  import { routes } from '../routes/routes';
    
  const Menu: React.FC = () => {
    const location = useLocation();
  
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent className='menu'>
          <IonList id="inbox-list">
            
            {routes.map((appPage, index) => {
                return (
                    <IonMenuToggle 
                        key={index} 
                        autoHide={false}>
                        <IonItem 
                            className={location.pathname === appPage.path ? 'selected' : ''} 
                            routerLink={appPage.path} 
                            routerDirection="none" 
                            lines="none" 
                            detail={false}
                        >

                            <IonIcon 
                                slot="start" 
                                ios={appPage.iosIcon} 
                                md={appPage.mdIcon} 
                            />

                        <IonLabel>{appPage.title}</IonLabel>
                        
                        </IonItem>
                    </IonMenuToggle>
              );
            })}
          </IonList>

        </IonContent>
      </IonMenu>
    );
  };
  
  export default Menu;