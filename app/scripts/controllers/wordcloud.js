'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:WordcloudCtrl
 * @description
 * # WordcloudCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('WordcloudCtrl', function ($scope, blueAPI) {
    $scope.loading = true;
    var opts = function (list){
      return {
              list: list,
              fontFamily: 'sans',
              backgroundColor: '#fff'
            };
    };

    var convertResources = function(orig){
      var newArr = orig.splice(0,orig.length);
      var finalArr = [];
      for(var i = 0; i < newArr.length; i++){
        finalArr.push([newArr[i][0], newArr[i][1]]);
      }
      return finalArr;
    };

    $scope.wordsOficialistas = blueAPI.wordcloud_oficialistas.query({}, function(value){
      $scope.loading = false;
      var canvas = $('div#cloud_oficialista > canvas');
      new WordCloud(canvas[0], opts(convertResources(value)) );
    });

    $scope.wordsOposicion = blueAPI.wordcloud_oposicion.query({}, function(value){
      var canvas = $('div#cloud_oposicion > canvas');
      new WordCloud(canvas[0], opts(convertResources(value)) );
    });
  });
