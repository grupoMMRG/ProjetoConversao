var app = angular.module('conversorMoeda', []);

app.controller('conversorController', function($scope, $http) {
    
    $scope.fromCurrency = 'USD';
    $scope.toCurrency = 'BRL';
    $scope.amount = 1;
    $scope.result = null;

    //1.conversão de moedas
    $scope.convert = function() {
        var url = "https://api.apilayer.com/currency_data/convert";
        url += "?to=" + $scope.toCurrency;
        url += "&from=" + $scope.fromCurrency;
        url += "&amount=" + $scope.amount;
        
        var headers = {
            "apikey": "6FFJUzjNmg3giqhHFd0ZTpUTcdjx1n9q"
        };

        $http({
            method: 'GET',
            url: url,
            headers: headers
        }).then(function(response) {
            // Aqui, você precisa adaptar de acordo com a resposta da API
            $scope.result = response.data.result;
        }, function(error) {
            console.log('error', error);
        });
    };

    // Inicializar a conversão
    $scope.convert();

    //2.Taxas de Câmbio Atualizadas:
});