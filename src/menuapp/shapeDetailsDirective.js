(function () {
'use strict';

angular.module('shapeDetailsApp')
  .directive("shapeDetails", ShapeDetails)

  function ShapeDetails(){
  var ddo = {
        restrict: 'E',
        scope: {
            title: '<',
            description: '<',
            status: '<'
        },

        controller: function(){
          var shapeDetailsController = this;
          shapeDetailsController.title;
          shapeDetailsController.description;
          shapeDetailsController.status;
          shapeDetailsController.getBoundingBox = function(geoJson) {
              var bounds = {}, coords, point, latitude, longitude;

              var coords = geoJson.geometry.coordinates[0];
              for (var j = 0; j < coords.length; j++) {
                var longitude = coords[j][0];
                var latitude = coords[j][1];
                bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
                bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
                bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
                bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
              }
              return bounds;
            };
          },
        bindToController: true,
        controllerAs: 'shapeDetailsController',
        templateUrl: "src/menuapp/templates/shapeDetails.template.html",
        link: function(scope, element, attrs, shapeDetailsController) {
           console.log(element);
           scope.canvas = element.find('canvas')[0];
           scope.context = scope.canvas.getContext('2d');

           /*Key function:
           Note the final argument of true... this is not without issue:
           */
           scope.$watch('shapeDetailsController.status', function(newValue, oldValue) {
             console.log('Running watcher: newValue = ' + newValue + " oldValue = " + oldValue)
             var geoJson = newValue.geoJson;
             var fillColour = newValue.fillColour;
             var lineColour = newValue.lineColour;

             var width = scope.canvas.width;
             var height = scope.canvas.height;
             var bounds = shapeDetailsController.getBoundingBox(geoJson);
             scope.context.fillStyle = "rgb(255,255,255)";
             scope.context.fillRect(0, 0, width, height);

             //First scale the shape to a 0 - 100 x and y grid.  (Uses scaleFactorShape)
             //And centre it vertically and horizontally (Uses xShift)
             var longestAxis = Math.max(bounds.xMax - bounds.xMin,bounds.yMax - bounds.yMin)
             var scaleFactorShape = 100.0 / longestAxis;
             var xShift = (longestAxis - (bounds.xMax - bounds.xMin))/2
             var yShift = (longestAxis - (bounds.yMax - bounds.yMin))/2

             //the canvas width is 300 and height is 150, so need to scale the x and y coordinates separately too
             var xScaleFactorFrame = width / 100;
             var yScaleFactorFrame = height / 100;

             var coords = geoJson.geometry.coordinates[0];
             for (var j = 0; j < coords.length; j++) {
               var longitude = coords[j][0];
               var latitude = coords[j][1];
               var point = {
                   x: (longitude - bounds.xMin + xShift) * scaleFactorShape * xScaleFactorFrame,
                   y: (bounds.yMax - latitude + yShift) * scaleFactorShape * yScaleFactorFrame
               };
               if (j === 0) {
                 scope.context.beginPath();
                 scope.context.moveTo(point.x, point.y);

               } else {
                 scope.context.lineTo(point.x, point.y);
               }
               console.log("( " + point.x + " , " + point.y + " )")
             }
             scope.context.fillStyle = fillColour;
             scope.context.fill();
             scope.context.lineWidth = 5;
             scope.context.strokeStyle = lineColour;
             scope.context.stroke();
             console.log(scope.canvas);
             //shapeDetailsController.drawIcon(newValue)
             /*
             var barWidth = Math.ceil(newValue.progress / 100 * scope.canvas.width);

             scope.context.fillStyle = newValue.color;
             scope.context.fillRect(0, 5, barWidth, scope.canvas.height-10);
             */
           });
        }
    };
    return ddo;
  };

})();
