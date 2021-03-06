var urlApi = 'http://157.230.17.132:4002/sales';

$(document).ready(function(){

  chiamataGET()

  $('.btn').click(function(){
    // alert('ciao');
    var valoreAggiunto = parseInt($('input').val());
    //console.log(valoreAggiunto);
    var mesiSelect = $('.mesi').val();
    mesiSelect = moment(mesiSelect, 'MMMM').format('01/MM/2017');
    console.log(mesiSelect);
    //console.log(mesiSelect);
    var venditoriSelect = $('.venditori').val();
    //console.log(venditoriSelect);

    if (valoreAggiunto != ''){

      $.ajax({
        url: urlApi,
        method: 'POST',
        data: {
          "salesman": venditoriSelect,
          "amount" : valoreAggiunto,
          "date": mesiSelect
        },
        success: function(data){
          chiamataGET()
        },
        error: function() {
          alert('errore')
        }
      });

    }
    else {
      alert('Inserisci un valore')
    }
  })

});
//funzione chiamata GET
function chiamataGET(){
  $.ajax({
    url: urlApi,
    method: 'GET',
    success: function(data){
      console.log(data);

      graficoLinea(data);

      graficoTorta(data);

    },
    error: function() {
      alert('errore')
    }
  });
}
//funzione per grafico linea
function graficoLinea(data){
  var objSospFat = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0
  };

  for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      //console.log(obj);
      var giornoMeseAnno = obj.date;
      //console.log(giornoMeseAnno);
      var meseNumero = moment(giornoMeseAnno, 'DD/MM/YYYY').format('MMMM');
      //console.log(meseNumero);

      objSospFat[meseNumero] += parseInt(obj.amount);
  }
  //console.log(objSospFat);

  var arrayLabelsFat = [];
  var arrayDataFat = [];

  for (var key in objSospFat) {
    arrayLabelsFat.push(key);
    arrayDataFat.push(objSospFat[key]);
    $('.mesi').append('<option>' + key + '</option>');
  }

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
            //backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(0, 0, 0)',
            data: arrayDataFat,
        }]
    },
  });
}

//funzione grafico torta
function graficoTorta(data) {
  var objSospVend = {};
  var venditeTotale = 0;

  for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      //console.log(obj);
      var nome = obj.salesman;
      //console.log(nome);

      if (objSospVend[nome] == undefined)
      {
          objSospVend[nome] = 0;
      }

      objSospVend[nome] += parseInt(obj.amount);
      //console.log(objSospVend[nome]);
      venditeTotale += parseInt(obj.amount);
      //console.log(venditeTotale);
  }
  //console.log(objSospVend);

  var arrayLabelsVend = [];
  var arrayDataVend = [];

  for (var key in objSospVend) {
    var percentualeVendite = objSospVend[key] / venditeTotale * 100;
    arrayLabelsVend.push(key);
    arrayDataVend.push(percentualeVendite.toFixed(2));
    $('.venditori').append('<option>' + key + '</option>');
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

        labels: arrayLabelsVend,

    }
  });
}
