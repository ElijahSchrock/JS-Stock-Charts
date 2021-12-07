// const { Chart } = require("chart.js");

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let request = await fetch('https://api.twelvedata.com/time_series?symbol=BNTX,DIS,GME,MSFT&interval=1min&apikey=741207b0d6dc466bb1d8c1c151f9d6bd');
    let data = request.json();

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

stocks.forEach( stock => stock.values.reverse())


new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.reverse().map(value => parseFloat(value.high)),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
});

// function getHighest(){
//     for(let i = 0; i < stocks.values.high; i++){
//         if (stocks.high > 344.66000) {}
//     }
// }

const highestStock = stocks.high
new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks[0].values.map(value => value.symbols),
        datasets:[{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: highestStock,
            borderColor: 'rgba(61, 161, 61, 0.7)',
            // backgroundColor: getColor(high.meta.symbol)
        }]
    }
}) 
console.log(stocks[0].values)
}

main()
