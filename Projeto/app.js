var app = angular.module('conversorMoeda', []);

app.controller('conversorController', function($scope, $http) {
    
    $scope.SiglasMoeda = function() {
        var url="https://api.apilayer.com/currency_data/list"

        var headers = {
            "apikey": "r60LyyS7OgcUADI4XUyfl0iQEdIFE4hT"
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
            "apikey": "r60LyyS7OgcUADI4XUyfl0iQEdIFE4hT"
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
            "apikey": "r60LyyS7OgcUADI4XUyfl0iQEdIFE4hT"
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
    var today = new Date();
    $scope.dataComparacao = null;

    $scope.FuncData = function(data) {
        if (data) {  // Verifica se 'data' está definida
            let dataObj = new Date(data);
            var dia = String(dataObj.getDate()).padStart(2, '0');
            var mes = String(dataObj.getMonth() + 1).padStart(2, '0');
            var ano = dataObj.getFullYear();
            var dataFinal = ano + '-' + mes + '-' + dia;
            return dataFinal;
        } else {
            return null;
        }
    }

    
    
    $scope.Comparacao1 = function() {
        var url = "https://api.exchangeratesapi.io/history"
        $scope.$watch('dataComparacao', function(newVal) {
            if (newVal) {
                var data = $scope.FuncData(newVal)
                url += "?start_at=" + data
            }
        });
        url += "days_ago&end_at=" + $scope.FuncData(today)
        $scope.$watch('fromMoedaComparacao1', function(newVal) {
            if (newVal) {
                var moeda = $scope.FuncData(newVal)
                url += "&base=BRL&symbols=" + moeda
            }
        });

        var headers = {
            "apikey": "8ab06a190663d017ecd12752080bd44d"
        };

        $http({
            method: 'GET',
            url: url,
            headers: headers
        }).then(function(response) {
            console.log(response.data)
            $scope.result1 = response.data
        }, function(error) {
            console.log('error', error);
        });
    }

    $scope.fromMoedaComparacao1 = 'USD';
    $scope.resultComparacao1 = null;

    console.log($scope.fromMoedaComparacao1)
    $scope.Comparacao1()

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});