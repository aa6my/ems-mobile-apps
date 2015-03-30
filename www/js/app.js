// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ui.bootstrap',
                          'loginModule',
                          'ServiceModule',
                          'employeeModule',
                          'disciplineModule',
                          'performanceModule',
                          'serverModule',
                          'loginModule',
                          'signoutModule',
                          'skillModule',
                          'skillcatModule',
                          'settingModule',
                          'departmentModule',
                          'resignModule'
                          ])

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

  .state('app.server', {
      url: "/server",
      views: {
        'menuContent' :{
          templateUrl: "templates/server.html"
        }
      }
    })

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
  .state('app.employeeAdd_Edit', {
    url: "/employeeAdd_Edit",
    views: {
      'menuContent': {
        templateUrl: "templates/employeeAdd_Edit.html"
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
  .state('app.skillAdd_Edit', {
    url: "/skillAdd_Edit",
    views: {
      'menuContent': {
        templateUrl: "templates/skillAdd_Edit.html"
      }
    }
  })
  .state('app.skillcat', {
    url: "/skillcat",
    views: {
      'menuContent': {
        templateUrl: "templates/skillcat.html"
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
  .state('app.criteria', {
    url: "/criteria",
    views: {
      'menuContent': {
        templateUrl: "templates/criteria.html"
      }
    }
  })
  .state('app.appraisal', {
    url: "/appraisal",
    views: {
      'menuContent': {
        templateUrl: "templates/appraisal.html"
      }
    }
  })
  .state('app.appraisal_log', {
    url: "/appraisal_log/:appraisal_id",
    views: {
      'menuContent': {
        templateUrl: "templates/appraisal_log.html"
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
  .state('app.company', {
    url: "/company",
    views: {
      'menuContent': {
        templateUrl: "templates/company.html"
      }
    }
  })
  .state('app.department', {
    url: "/department",
    views: {
      'menuContent': {
        templateUrl: "templates/department.html"
      }
    }
  })
  .state('app.resign', {
    url: "/resign",
    views: {
      'menuContent': {
        templateUrl: "templates/resign.html"
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
  $urlRouterProvider.otherwise('/app/server');
});
