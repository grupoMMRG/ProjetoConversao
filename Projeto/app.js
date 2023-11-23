var app = angular.module('conversorMoeda', []);

app.controller('conversorController', function($scope, $http, $interval) {

    $scope.calculatePercentageChange = function(open, close) {
        let change = close - open;
        let percentageChange = (change / open) * 100;
        return percentageChange.toFixed(2); // This will format the number to 2 decimal places
    };

    
    $scope.noticia_inv = function() {
        let moedas = ['USD', 'BTC', 'UE', 'BR', 'CNY'];
        $scope.listaDadosMoedas = []; // Lista para armazenar os dados
    
        let promises = moedas.map(moeda => {
            var apiKey = "fa3881987fb7cf742460f49b072506d9";
            var url = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${moeda}`;
    
            return $http({
                method: 'GET',
                url: url
            }).then(response => {
                if(response.data.data) {
                    let data_moeda = response.data.data[0];
                    data_moeda['percentageChange'] = $scope.calculatePercentageChange(data_moeda['open'], data_moeda['close']);
                    return data_moeda;
                }
            }).catch(error => {
                console.log('error', error);
            });
        });
    
        Promise.all(promises).then(results => {
            $scope.listaDadosMoedas = results.filter(data_moeda => data_moeda != null);
            console.log($scope.listaDadosMoedas);
        });
    };

    //$scope.noticia_inv();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.SiglasMoeda = function() {
        var url="https://api.apilayer.com/currency_data/list"

        var headers = {
            "apikey": "6FFJUzjNmg3giqhHFd0ZTpUTcdjx1n9q"
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
            "apikey": "6FFJUzjNmg3giqhHFd0ZTpUTcdjx1n9q"
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

    $scope.OutrosDados_inv = function() {
        var apiKey = "cc62f786dbf573666ffd8275a0768315";
        var urlUSD = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=USD`;
        var urlBTC = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=BTC`;
        //var urlUE = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=EUR`;
        // var urlBR = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=BRL`;
        // var urlCNY = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=CNY`;
        // var urlL = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=GBP`;
    
        Promise.all([
            $http.get(urlUSD),
            $http.get(urlBTC),
            // $http.get(urlUE),
            // $http.get(urlBR),
            // $http.get(urlCNY),
            // $http.get(urlL)
        ]).then(responses => {
            $scope.DadosMoedasUSD = [responses[0].data.data[0]];
            $scope.DadosMoedasBTC = [responses[1].data.data[0]];
            // $scope.DadosMoedasUE = [responses[2].data.data[0]];
            // $scope.DadosMoedasBR = [responses[3].data.data[0]];
            // $scope.DadosMoedasCNY = [responses[4].data.data[0]];
            // $scope.DadosMoedasL = [responses[5].data.data[0]];
    
            // Calcular mudança percentual para cada moeda
            $scope.DadosMoedasUSD[0]['percentageChange'] = $scope.calculatePercentageChange($scope.DadosMoedasUSD[0]['open'], $scope.DadosMoedasUSD[0]['close']);
            $scope.DadosMoedasBTC[0]['percentageChange'] = $scope.calculatePercentageChange($scope.DadosMoedasBTC[0]['open'], $scope.DadosMoedasBTC[0]['close']);
            // $scope.DadosMoedasUE[0]['percentageChange'] = $scope.calculatePercentageChange($scope.DadosMoedasUE[0]['open'], $scope.DadosMoedasUE[0]['close']);
            // $scope.DadosMoedasBR[0]['percentageChange'] = $scope.calculatePercentageChange($scope.DadosMoedasBR[0]['open'], $scope.DadosMoedasBR[0]['close']);
            // $scope.DadosMoedasCNY[0]['percentageChange'] = $scope.calculatePercentageChange($scope.DadosMoedasCNY[0]['open'], $scope.DadosMoedasCNY[0]['close']);
            // $scope.DadosMoedasL[0]['percentageChange'] = $scope.calculatePercentageChange($scope.DadosMoedasL[0]['open'], $scope.DadosMoedasL[0]['close']);
        }).catch(error => {
            console.log('error', error);
        });
    };
    
    //$scope.OutrosDados_inv();
    
});