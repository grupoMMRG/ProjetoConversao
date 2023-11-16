var app = angular.module('conversorMoeda', []);

app.controller('conversorController', function($scope, $http, $interval) {
    
    // const apiKey = '9de87b725c7c480ea32f3d9239aa7865';
    //     const symbol = 'AAPL'; // You can replace this with the desired stock symbol
    //     const url = `http://api.marketstack.com/v1/tickers/${symbol}/eod/latest?access_key=${apiKey}`;

    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             const { symbol, close, open } = data.data; // Assume data.data contains the relevant fields
    //             const change = close - open; // Calculate the change from open to close

    //             // Update the HTML content with the new data
    //             document.getElementById('symbol').textContent = symbol;
    //             document.getElementById('close').textContent = close.toFixed(2);
    //             document.getElementById('change').textContent = change.toFixed(2);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));

    $scope.noticia_inv = function() {
        let moedas = ['IBOV.SA', 'USD', 'BTC', 'UE', 'BR','CNY', 'L'];
        
        $scope.quotes = [];

        moedas.forEach(function(moeda) {
            const symbol = 'AAPL';
            var apiKey = "ee924075af5bdf65bb92ef2698d8d8c6"
            var url = ` `;
        

            $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                console.log(response); // Esta linha foi adicionada
            }, function(error) {
                console.log('error', error);
            });
        });
        
    };

    $scope.noticia_inv();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.SiglasMoeda = function() {
        var url="https://api.apilayer.com/currency_data/list"

        var headers = {
            "apikey": "OuyNqBwAKe3ZzObDEsQNvKP2WUry4Abw"
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
            "apikey": "OuyNqBwAKe3ZzObDEsQNvKP2WUry4Abw"
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

// Obter a data de hoje
const hoje = new Date();

// Subtrair 7 dias
hoje.setDate(hoje.getDate() - 14);

// Obter o dia, mês e ano da data resultante
const dia = hoje.getDate();
const mes = hoje.getMonth() + 1; // Os meses são base 0, então somamos 1
const ano = hoje.getFullYear();

// Formatar a data no formato desejado (MM-DD-AAAA)
const dataFormatada = `${mes}-${dia}-${ano}`;

console.log(dataFormatada);

$scope.taxa = function() {
    var url = `http://servicodados.ibge.gov.br/api/v3/noticias/?de=${dataFormatada}`;

    const BASE_URL = "http://agenciadenoticias.ibge.gov.br/";

    $http({
        method: 'GET',
        url: url
    }).then(function(response) {
        if (response.data.items.length >= 8) {
            let noticiasSelecionadas = [];
    
            while (noticiasSelecionadas.length < 8) {
                let num_noticia = Math.floor(Math.random() * response.data.items.length);
                if (!noticiasSelecionadas.includes(num_noticia)) {
                    noticiasSelecionadas.push(num_noticia);
                }
            }
    
            // Converta o campo 'imagens' de string para objeto
            $scope.noticias = noticiasSelecionadas.map(index => {
                let noticia = response.data.items[index];
                noticia.imagens = JSON.parse(noticia.imagens.replace(/\\/g, ''));
                noticia.imagens.image_intro = BASE_URL + noticia.imagens.image_intro; // Complete a URL da imagem
                return noticia;
            });
    
        } else {
            console.log('Não existem 4 notícias disponíveis no período fornecido.');
        }
        
    }, function(error) {
        console.log('error', error);
    });
};

$scope.taxa();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});