import React, { lazy } from 'react';

import { 
    home, 
    gameController,
    cart,
    person, personOutline, personSharp,
    settings, settingsOutline, settingsSharp,
    archiveOutline, 
    archiveSharp, 
    bookmarkOutline, 
    heartOutline, 
    heartSharp, 
    mailOutline, 
    mailSharp, 
    paperPlaneOutline, 
    paperPlaneSharp, 
    trashOutline, 
    trashSharp, 
    warningOutline,
    warningSharp,
} from 'ionicons/icons';
  
  interface Route {
    title: string;
    path: string;
    iosIcon: string;
    mdIcon: string;
  }
  
  export const routes: Route[] = [
    {
      title: 'Accueil',
      path: '/home',
      iosIcon: home,
      mdIcon: home,
    },

    {
        title: 'Parcourir les jeux',
        path: '/explore-games',
        iosIcon: gameController,
        mdIcon: gameController,
    },

    {
        title: 'Mon panier',
        path: '/cart',
        iosIcon: cart,
        mdIcon: cart,
    },

    {
      title: 'Mon profil',
      path: '/',
      iosIcon: personOutline,
      mdIcon: personSharp,
    },

    {
        title: 'Paramètres',
        path: '/settings',
        iosIcon: settingsOutline,
        mdIcon: settingsSharp,
    }
  ];
  