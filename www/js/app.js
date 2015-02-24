// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','loginModule','ServiceModule','employeeModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: ''
    })

  .state('app.dashboard', {
    url: "/dashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html"
      }
    }
  })
  .state('app.employees', {
    url: "/employees",
    views: {
      'menuContent': {
        templateUrl: "templates/employees.html"
      }
    }
  })
  .state('app.skills', {
    url: "/skills",
    views: {
      'menuContent': {
        templateUrl: "templates/skills.html"
      }
    }
  })
  .state('app.performance', {
    url: "/performance",
    views: {
      'menuContent': {
        templateUrl: "templates/performance.html"
      }
    }
  })
  .state('app.discipline', {
    url: "/discipline",
    views: {
      'menuContent': {
        templateUrl: "templates/discipline.html"
      }
    }
  })
  .state('app.tracking', {
    url: "/tracking",
    views: {
      'menuContent': {
        templateUrl: "templates/tracking.html"
      }
    }
  })
  .state('app.recruiting', {
    url: "/recruiting",
    views: {
      'menuContent': {
        templateUrl: "templates/recruiting.html"
      }
    }
  })
  .state('app.reports', {
    url: "/reports",
    views: {
      'menuContent': {
        templateUrl: "templates/reports.html"
      }
    }
  })
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })
  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html"
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
