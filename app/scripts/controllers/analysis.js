'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('AnalysisCtrl', function ($scope, blueAPI, $window, $translate, $rootScope, _) {
    $scope.loading = true;

    var dateFormat = d3.time.format('%d/%m/%Y');
    var isoDateFormat = d3.time.format('%Y-%m-%d');

    $scope.tickX = function(d){
      return dateFormat(new Date(d));
    };
    $scope.tickY = function(d){
      return d3.format('.02f')(d);
    };


    $scope.filter = {};
    $scope.filter.maxValue = 300;
    $scope.filter.value = [$scope.filter.maxValue - $scope.filter.maxValue/3,$scope.filter.maxValue];

    $scope.filterData = function(){
      var step = $scope.data.length / $scope.filter.maxValue;
      var start = Math.floor($scope.filter.value[0] * step);
      var end = Math.ceil($scope.filter.value[1] * step);
      $scope.filteredData = $scope.data.slice(start,end+1);
    };

    $scope.fields = ['CER','CambioRef','BADLAR','TasasInteres30Dias','TasasInteresEntrePrivadas','PrestamosAPrivados','OtrosDepositos','APlazo','CajasAhorro','CuentasCorrientes','DepositosFinancieras','LEBAC','DepositosBCRA','EfectivoFinanciero','BilletesPublico','Circulacion','BaseMonetaria','Asistencia','Reservas', 'DolarImplicito'];
    $scope.activeField = '';

    $scope.ChooseField = function(field){
      $scope.options = {
          axes: {
            x: {key: 'date', type: 'date', labelFunction: function(d){return dateFormat(d);}},
            y: {type: 'linear'},
          },
          series: [
        {y: field, color: 'steelblue', axis:'y', type: 'line',thickness: '1px', label: field}
        ],
        tooltip: {
          mode: 'scrubber',
          formatter: function (x, y) {
            return dateFormat(x) + ' : ' + y.toFixed(2);
          }
        },
        stacks: [],
        lineMode: 'linear',
        tension: 0.7,
        drawLegend: true,
        drawDots: false,
        columnsHGap: 5
      };


      var translateLabels = function(){
        var f = 'ANALYSIS.VARIABLES.' + field;
        $translate(f).then(function(t){
          $scope.options.series[0].label = t;
        });
      };

      translateLabels();

      $rootScope.$on('$translateChangeSuccess', function () {
        translateLabels();
      });

      $scope.activeField = field;
    };



    blueAPI.analysis_data.query({}, function(data){
      $scope.loading = false;
      var evData = data;

      if($window.innerWidth < 768 && evData.length > 60){
        evData.splice(0, evData.length - 60);
      }

      $scope.data = _.chain(evData).map(function(val){
        val.date = isoDateFormat.parse(val.date);
        return val;
      }).sortBy('date').value();


      $scope.filterData();

      $scope.ChooseField('Reservas');

    });

});
