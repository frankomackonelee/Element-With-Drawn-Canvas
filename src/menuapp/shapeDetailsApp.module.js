(function () {
'use strict';

var module = angular
  .module('shapeDetailsApp', [])
  .directive("outerDiv", OuterDiv)
  .controller('outerController', OuterController)

  function OuterController(){
    var outerController = this;
    var origData = [
          {title: "First", description: "the first item in the array", status:
            {fillColour:"rgb(0,255,255)", lineColour:"rgb(255,0,0)", geoJson: {
            "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                    [ [100.0, 0.0], [90.0, 0.0], [90.0, 25.0], [100.0, 25.0], [100.0, 0.0] ]
                    ]
                }
              }
            }
        },
        {title: "Second", description: "...and this is the second item in the array", status:
            {fillColour:"rgb(255,0,0)", lineColour:"rgb(0,255,255)", geoJson: {
            "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                    [ [100.0, 0.0], [90.0, 0.0], [90.0, 25.0], [100.0, 0.0] ]
                    ]
                }
              }
            }
        },
        {title: "Third", description: "the third item in the array", status:
          {fillColour:"rgb(0,255,255)", lineColour:"rgb(255,0,0)", geoJson: {
          "type": "Feature",
              "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                  [ [0.0, 100.0], [0.0, 90.0], [25.0, 90.0], [25.0, 100.0], [0.0, 100.0] ]
                  ]
              }
            }
          }
      },
      {title: "Fourth", description: "...and this is the fourth item in the array", status:
          {fillColour:"rgb(255,0,0)", lineColour:"rgb(0,255,255)", geoJson: {
          "type": "Feature",
              "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                  [ [0.0, 100.0], [0.0, 90.0], [25.0, 90.0], [0.0, 100.0] ]
                  ]
              }
            }
          }
      }
    ];
    outerController.data = origData;
    outerController.progress = 50;
    outerController.updateProgress = function(){
      console.log("updating progress");
      outerController.data = origData.slice(0,outerController.progress);
    }
    outerController.clickElement = function(myString){
      console.log("I just clicked on: " + myString)
    }
  }

  function OuterDiv(){
    var ddo = {
        restrict: 'E',
        controller: OuterController,
        bindToController: true,
        controllerAs: 'outerController',
        templateUrl: "src/menuapp/templates/outerDiv.template.html"
    }
    return ddo;
  }
})();
