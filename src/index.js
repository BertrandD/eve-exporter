import d3 from 'd3';
import pick from 'lodash/pick'
import forEach from 'lodash/forEach'
import assign from 'lodash/assign'
import replace from 'lodash/replace'

const data = {};

d3.json('https://eve-central.com/api/marketstat/json?typeid=34,35&usesystem=30000142', (res) => {
    res.forEach(item => {
        data[item.buy.forQuery.types[0]] = assign({}, {
            id: item.buy.forQuery.types[0]
        }, item);
    });

    forEach(data, (v, item) => {
        forEach(v.buy, (val, i) => {
            data[item].buy[i] = replace(val, '.', ',');
        });
        forEach(v.sell, (val, i) => {
            data[item].sell[i] = replace(val, '.', ',');
        });
        forEach(v.all, (val, i) => {
            data[item].all[i] = replace(val, '.', ',');
        });
    });

    generateTable(data);
});

function generateTable (data) {
    let table = `
        <tr>
            <tr>
                <th rowspan="2">Item ID</th>
                <th colspan="6">Buy</th>
                <th colspan="6">Sell</th>
                <th colspan="6">All</th>
            </tr>
        </tr>
        <tr>
            <th>Price average</th>
            <th>Price min</th>
            <th>Price max</th>
            <th>Price median</th>
            <th>Price variance</th>
            <th>Volume</th>
            <th>Price average</th>
            <th>Price min</th>
            <th>Price max</th>
            <th>Price median</th>
            <th>Price variance</th>
            <th>Volume</th>
            <th>Price average</th>
            <th>Price min</th>
            <th>Price max</th>
            <th>Price median</th>
            <th>Price variance</th>
            <th>Volume</th>
        </tr>
    `;

    forEach(data, item => {
        table += `
        <tr>
            <td>${item.id}</td>
            <td>${item.buy.avg}</td>
            <td>${item.buy.min}</td>
            <td>${item.buy.max}</td>
            <td>${item.buy.median}</td>
            <td>${item.buy.variance}</td>
            <td>${item.buy.volume}</td>
            <td>${item.sell.avg}</td>
            <td>${item.sell.min}</td>
            <td>${item.sell.max}</td>
            <td>${item.sell.median}</td>
            <td>${item.sell.variance}</td>
            <td>${item.sell.volume}</td>
            <td>${item.all.avg}</td>
            <td>${item.all.min}</td>
            <td>${item.all.max}</td>
            <td>${item.all.median}</td>
            <td>${item.all.variance}</td>
            <td>${item.all.volume}</td>
        </tr>
        `
    });

    d3.select("#content").append('table').html(table)
}