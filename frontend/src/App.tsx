import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';
import Home from './pages/Home';
import Game from './pages/Game';
import GameList from './pages/GameList';
import Settings from './pages/Settings';
import Cart from './pages/Cart';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Custom styles */
import './styles/styles.scss';

setupIonicReact();

const App: React.FC = () => (

    <IonApp>
        <IonReactRouter>
            <Menu />
            <IonRouterOutlet id="main">

                <Route path="/home" component={Home} exact />
                <Route path="/games/:id" component={Game} />
                <Route path="/explore-games" component={GameList} />
                <Route path="/settings" component={Settings} exact />
                <Route path="/cart" component={Cart} exact />
                <Redirect from="/" to="/home" exact />

            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
