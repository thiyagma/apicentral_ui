import Login from './components/Login';
import Main from './components/Main';
// import Dashboard from './screens/Dashboard';
// import Tasks from './screens/Tasks';
// import Task from './screens/Task';
import NotFound from './screens/NotFound';
import LandingPage from './screens/LandingPage';
import SearchPage from './screens/SearchPage';
import ApiSummary from './components/ApiSummary';
import SearchDetails from './components/SearchDetails';
import CreateApi from './components/CreateApi';
import CreateOption from './components/CreateOption';
import CreateNew from './components/CreateNew';

import MyFav from './screens/MyFav';
import MyApi from './screens/MyApi';
import Bookmarks from './screens/Bookmarks';
import MyAppScreen from './screens/MyAppScreen';
import MyTeamScreen from './screens/MyTeamScreen';
import TeamDetails from './components/TeamDetails'

export default {
  path: '/',
  component: Main,
  childRoutes: [
    { path: 'login', component: Login },
    // { path: 'dashboard', component: Dashboard },
    // { path: 'tasks/:id', component: Task },
    { path: 'myapplication', component: MyAppScreen },
    { path: 'myteams', component: MyTeamScreen },
    { path:  "/myteams/:id", component: TeamDetails },
    { path: 'favorites', component: MyFav },
    { path: 'bookmarks', component: Bookmarks },
    { path: 'discover', component: SearchPage },
    { path: 'details', component: SearchDetails ,
    indexRoute: {component: ApiSummary},
   childRoutes: [
              {path: '/details/view', component: ApiSummary},
              {path: '/details/edit', component: CreateNew}
            ]},
    {path: "/publishapi", component: CreateApi,
            indexRoute: {component: CreateOption},
            childRoutes: [
              {path: '/publishapi/step1', component: CreateOption},
              {path: '/publishapi/step2', component: CreateNew}
            ]
          },
    { path: '*', component: NotFound }
  ],
  indexRoute: { component: LandingPage }
};
