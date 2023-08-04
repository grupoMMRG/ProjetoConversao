var app = angular.module('conversorMoeda', []);

app.controller('conversorController', function($scope, $http) {
    
    $scope.SiglasMoeda = function() {
        var url="https://api.apilayer.com/currency_data/list"

        var headers = {
            "apikey": "28gZpx74ywbN5yPB6PucCT8PopFwHaHe"
        };

        $http({
            method: 'GET',
            url: url,
            headers: headers
        }).then(function(response) {
            console.log(response.data.currencies)
            $scope.moedas = response.data.currencies
        }, function(error) {
            console.log('error', error);
        });


    };
    $scope.SiglasMoeda();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.fromCurrency = 'USD';
    $scope.toCurrency = 'BRL';
    $scope.amount = 1;
    $scope.result = null;


    $scope.convert = function() {
        var url = "https://api.apilayer.com/currency_data/convert";
        url += "?to=" + $scope.toCurrency;
        url += "&from=" + $scope.fromCurrency;
        url += "&amount=" + $scope.amount;
        
        var headers = {
            "apikey": "28gZpx74ywbN5yPB6PucCT8PopFwHaHe"
        };

        $http({
            method: 'GET',
            url: url,
            headers: headers
        }).then(function(response) {
            console.log(response)
            $scope.result = response.data.result;
        }, function(error) {
            console.log('error', error);
        });
    };

    $scope.convert();

    $scope.inverterC = function() {
        var temp = $scope.fromCurrency;
        $scope.fromCurrency = $scope.toCurrency;
        $scope.toCurrency = temp;
    
        $scope.convert();
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.fromMoeda = 'USD';
    $scope.toMoeda = 'BRL';
    $scope.quotes = null;

    $scope.taxa = function() {
        var url = "https://api.apilayer.com/currency_data/live";
        url += "?source=" + $scope.toMoeda;
        url += "&currencies=" + $scope.fromMoeda;


        var headers = {
            "apikey": "28gZpx74ywbN5yPB6PucCT8PopFwHaHe"
        };

        $http({
            method: 'GET',
            url: url,
            headers: headers
        }).then(function(response) {
            console.log(response)
            $scope.quotes = response.data.quotes;
            console.log($scope.quotes)
        }, function(error) {
            console.log('error', error);
        });
    };

    $scope.taxa();

    // Botao com bug, testa ai

    $scope.inverterT = function() {
        var tempe = $scope.fromMoeda;
        $scope.fromMoeda = $scope.toMoeda;
        $scope.toMoeda = tempe;
        
    
        $scope.convert();
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //funcao (Comparar a cotação do Real frente as outras moedas nos últimos X dias.)



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});