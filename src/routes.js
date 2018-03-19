(function () {
"use strict";

angular.module("MenuApp")
.config(RoutesConfig);

RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise("/");

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state("home", {
    url: "/",
    templateUrl: "src/menuapp/templates/home.template.html"
  })

  // Home page
  .state("categories", {
    url: "/categories",
    templateUrl: "src/menuapp/templates/categories.template.html",
    controller: "CategoriesController as CatController",
    resolve: {
      trythis: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Home page
  .state("items", {
    url: "/items/{short_name}",
    templateUrl: "src/menuapp/templates/items.template.html",
    controller: 'ItemsController as ItemsControl',
    resolve: {
        thisitem: ['MenuDataService','$stateParams', function (MenuDataService, $stateParams) {
          var checkThis = MenuDataService.getItemsForCategory($stateParams.short_name);
          return checkThis;
        }]
      }
    })
}
})();

  // Premade list page
  /*
  .state("mainList", {
    url: "/main-list",
    templateUrl: "src/shoppinglist/templates/main-shoppinglist.template.html",
    controller: "MainShoppingListController as mainList",
    resolve: {
      items: ["ShoppingListService", function (ShoppingListService) {
        return ShoppingListService.getItems();
      }]
    }
  });
  */
