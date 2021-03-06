import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import 'angular-chart.js';
import 'bulma';
import './scss/style.scss';
import './plugins/chartJS';


//--------- ROUTERS------------//
import Router from './config/routes';


//---------- CUSTOM DIRECTIVES -----//

import Map from './directives/map';
// import Chart from './directives/chart';

//--------- CONTROLLERS -----------//

import MainCtrl from './controllers/main';

import EventsIndexCtrl from './controllers/events/index';
import EventsShowCtrl from './controllers/events/show';
import EventsNewCtrl from './controllers/events/new';
import EventsEditCtrl from './controllers/events/edit';

import UsersShowCtrl from './controllers/users/show';

import GoalsNewCtrl from './controllers/goals/new';
import GoalsEditCtrl from './controllers/goals/edit';
import GoalsLogCtrl from './controllers/goals/log';

import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';

//-------- ANGULAR MODULE -----------//

angular.module('Resolut', [
  'ui.router',
  'satellizer',
  'ngMessages',
  'chart.js'
])
  .directive('ngMap', Map)
  // .directive('ngChart', Chart)

  .controller('MainCtrl', MainCtrl)

  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)

  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)

  .controller('UsersShowCtrl', UsersShowCtrl)

  .controller('GoalsNewCtrl', GoalsNewCtrl)
  .controller('GoalsEditCtrl', GoalsEditCtrl)
  .controller('GoalsLogCtrl', GoalsLogCtrl)

  .config(Router)
  .config(function($authProvider) {
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
