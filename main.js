var urlApi = 'http://157.230.17.132:4002/sales';

$(document).ready(function(){

  $.ajax({
    url: urlApi,
    method: 'GET',
    success: function(data){
      console.log(data);

      var objSospFat = {};

      for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          //console.log(obj);
          var giornoMeseAnno = obj.date;
          //console.log(giornoMeseAnno);
          var meseNumero = moment(giornoMeseAnno, 'DD/MM/YYYY').format('MM');
          //console.log(mese);

          if (objSospFat[meseNumero] == undefined)
          {
            objSospFat[meseNumero] = 0;
          }

          objSospFat[meseNumero] += obj.amount;
      }
      //console.log(objSospFat);

      var arrayLabelsFat = [];
      var arrayDataFat = [];

      for (var key in objSospFat) {
        arrayLabelsFat.push(key);
        arrayDataFat.push(objSospFat[key]);
      }

      arrayLabelsFat.sort();

      console.log(arrayLabelsFat);
      console.log(arrayDataFat);

      var ctxLine = document.getElementById('myChartLine');
      var chart = new Chart(ctxLine, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: arrayLabelsFat,
            datasets: [{
                label: "Period 1",
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: arrayDataFat,
            }]
        },
      });

      var objSospVend = {};

      for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          //console.log(obj);
          var nome = obj.salesman;
          //console.log(nome);

          if (objSospVend[nome] == undefined)
          {
              objSospVend[nome] = 0;
          }

          objSospVend[nome] += obj.amount;
      }
      //console.log(objSospVend);

      var arrayLabelsVend = [];
      var arrayDataVend = [];

      for (var key in objSospVend) {
        arrayLabelsVend.push(key);
        arrayDataVend.push(objSospVend[key]);
      }

      console.log(arrayLabelsVend);
      console.log(arrayDataVend);


      var ctx = document.getElementById('myChartPie');
      var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: arrayDataVend,
                backgroundColor: ['green', 'blue', 'orange', 'red']

            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: arrayLabelsVend,

        }
      });
    },
    error: function() {
      alert('errore')
    }
  });

});
