"use strict";


/**
 * @constructor
 */
var Sampling = function() {
};


Sampling.numberOfBins = 33;
Sampling.currentInterval=0.2;
/**
 * @list of distribution parameters
 */

Sampling.distParaMean= 0;
Sampling.distParaVariance= 1;
Sampling.distParaP = 0.5;
Sampling.distParaLambda = 1;

/**
 * @returns {Array} An array of the bin values used for displaying all stats other than variance.
 */
Sampling.integerValues = function() {
  return Sampling.valuesWithInterval(1);
};


/**
 * @returns {Array} An array of the bin values used displaying variance.
 */
Sampling.valuesWithInterval = function(interval) {
    var values = [];
    for (var i = 0; i < Sampling.numberOfBins; i++) {
        values.push(i * interval);
    }
    return values;
};


Sampling.normalFrequencies = function(para) {
	if(para===1){
	//	return [4,8,13,20,32,48,69,96,130,169,212,257,301,341,372,392,399,392,372,341,301,257,212,169,130,96,69,48,32,20,13,8,4];
		return [2,3,3,6,8,14,19,32,45,60,78,97,116,133,147,156,160,156,147,133,116,97,78,60,45,32,19,14,8,6,3,3,2];
	}
	if(para===2){
		return [2,3,3,6,8,14,19,32,45,60,78,97,116,133,147,156,160,156,147,133,116,97,78,60,45,32,19,14,8,6,3,3,2];
	}
	if(para===3){
		return [2,3,3,6,8,14,19,32,45,60,78,97,116,133,147,156,160,156,147,133,116,97,78,60,45,32,19,14,8,6,3,3,2];
	}
	
};

Sampling.binomialFrequencies= function(para) {
	if(para===1){
		return [10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10];
	}
	if(para===2){
		return [4,0,0,0,31,0,0,0,109,0,0,0,219,0,0,0,273,0,0,0,219,0,0,0,109,0,0,0,31,0,0,0,4];
	}
	if(para===3){
		return [168,0,0,0,336,0,0,0,294,0,0,0,147,0,0,0,46,0,0,0,9,0,0,0,1,0,0,0,0,0,0,0,0];
	}
	return [];
};

Sampling.poissonFrequencies= function(para) {
	if(para===1){
		return [1000,1000,500,167,42,8,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
	if(para===2){
		return [7,34,84,140,175,175,146,104,65,36,18,8,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
	if(para===3){
		return [0,0,2,8,19,38,63,90,113,125,125,114,95,73,52,35,22,13,7,4,2,1,0,0,0,0,0,0,0,0,0,0,0];
	}
	return [];
};

Sampling.skewedFrequencies = function (values) {
    var numberOfBins = Sampling.numberOfBins;
    var s = numberOfBins / 6;
    var mn = (numberOfBins - 1) / 2;
    var temp =  Math.sqrt(1.0 / (2.0 * Math.PI * s * s));
    var skewMax = Math.pow( values[numberOfBins-1], 2);
    var skewedData = [];

    for (var i = 0; i < numberOfBins; i++){
        var z = -1 * Math.pow((values[i] - mn), 2) / (2*s*s);
        z = Math.exp(z) * temp;
        skewedData.push(Math.round(Math.pow(values[numberOfBins-i-1],2)/skewMax * 5000));
    }
  	skewedData[0]=skewedData[6];
  	skewedData[1]=skewedData[5];
  	skewedData[2]=skewedData[4];
    return skewedData;
};


Sampling.uniformFrequencies = function(constant) {
    var result = [];
    for (var i = 0; i < Sampling.numberOfBins; i++) {
        result.push(constant);
    }
    return result;
};


Sampling.normalDistribution = function(para) {
//	alert($.isNumeric(para));
//alert('this is norm dist');
    if (para === 1){
    	    this.currentInterval = 0.2;
    	    var myBinValues=[-3.2,-3,-2.8,-2.6,-2.4,-2.2,-2,-1.8,-1.6,-1.4,-1.2,-1,-0.8,-0.6,-0.4,-0.2,0,0.2,0.4,0.6,0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2];		
	    return new HistogramData(myBinValues, Sampling.normalFrequencies(para));
    };
    if (para === 2){
	    this.currentInterval=1;
	    return new HistogramData(Sampling.integerValues(), Sampling.normalFrequencies(para));
    }
    if (para === 3){
	    this.currentInterval=1;
	    var myBinValues= [-32,-31,-30,-29,-28,-27,-26,-25,-24,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
	    return new HistogramData(myBinValues, Sampling.normalFrequencies(para));
    }
};

Sampling.binomialDistribution = function(para) {
	if(para === 1){
		this.currentInterval= 1/32;
		return new HistogramData(Sampling.valuesWithInterval(this.currentInterval), Sampling.binomialFrequencies(para));
	}

	if(para === 2){
		this.currentInterval= 8/32;
		return new HistogramData(Sampling.valuesWithInterval(this.currentInterval), Sampling.binomialFrequencies(para));
	}

	if(para === 3){
		this.currentInterval= 8/32;
		return new HistogramData(Sampling.valuesWithInterval(this.currentInterval), Sampling.binomialFrequencies(para));
	}

};

Sampling.poissonDistribution = function(para) {
    this.currentInterval = 1;
    return new HistogramData(Sampling.integerValues(), Sampling.poissonFrequencies(para));
};

Sampling.skewedDistribution = function() {
    this.currentInterval = 1;
    return new HistogramData(Sampling.integerValues(), Sampling.skewedFrequencies(values));
};


Sampling.uniformDistribution = function(para) {
    if (para === 1){ //Uniform(0,1)
        this.currentInterval= 1/32;
        return new HistogramData(Sampling.valuesWithInterval(this.currentInterval), Sampling.uniformFrequencies(1));
    }
    if (para === 2){ //Uniform(-1,1)
        this.currentInterval= 1/32*2;
        var valuesOfInterval= Sampling.valuesWithInterval(this.currentInterval);
        return new HistogramData(valuesOfInterval, Sampling.uniformFrequencies(1));
    }
    return new HistogramData(Sampling.integerValues(), Sampling.uniformFrequencies(15));
};


Sampling.prototype.setupHistograms = function() {
    var self = this;
    // Create a histogram in the div ID histogram1
    var histogram1 = new Histogram($('div #histogram1'),
        'Parent population (can be changed with the mouse)',
        Sampling.normalDistribution(1),
        false, /* yTicks */
        0,     /* yIntervals */
        true,  /* shouldPlotStats */
        true   /* editable */);
    this.histogram1 = histogram1;
     $('#distPara1').html('mean=0;SD=1');
     $('#distPara2').html('mean=16;SD=5');
     $('#distPara3').html('mean=-16;SD=5');
     $('input:radio[name=distPara]').filter('[value=1]').prop('checked',true);
    // Set up control

    var changeStats = function(histogram) {
        // Choose the stats display object.
        // It would be cleaner if we associated this with the actual histogram object, this would be good to refactor
        var histogramID = '1';
        if (histogram === self.histogram2) {
          histogramID = '2';
        }
        else if (histogram === self.histogram3) {
          histogramID = '3';
        }
        else if (histogram === self.histogram4) {
          histogramID = '4';
        }
        var statsDisplay = '#statsDisplay' + histogramID;
        if (histogram.histogramData.numberOfObservations() > 1) {
            $(statsDisplay).show();
            var statistics = histogram.histogramData.getStatistics();
            $('#reps' + histogramID).html(statistics.numberOfObservations.toFixed(0));
            $('#range' + histogramID).html(statistics.formatValue(statistics.range));
            $('#mean' + histogramID).html(statistics.formatValue(statistics.mean));
            $('#median' + histogramID).html(statistics.formatValue(statistics.median));
            $('#sd' + histogramID).html(statistics.formatValue(statistics.sd));
            $('#skew' + histogramID).html(statistics.formatValue(statistics.skew));
            $('#kurtosis' + histogramID).html(statistics.formatValue(statistics.kurtosis));
        }
        else {
            // Hide statistics display because there is no data
            $(statsDisplay).hide();
        }
    };
    histogram1.addObserver(changeStats, 'changeStats');
    changeStats(histogram1);

    // Set up animated sample data histogram
    var histogram2 = new AnimatedHistogram($('div #histogram2'),
        'Sample Data',
        new HistogramData(histogram1.histogramData.values, Sampling.uniformFrequencies(0)),
        true /* yTicks */,
        10,
        false,  /* shouldPlotStats */
        false   /* editable */);
    this.histogram2 = histogram2;

    histogram2.addObserver(changeStats, 'changeStats');
    changeStats(histogram2);

    // Set up sample data histogram
    var histogram3 = new AnimatedHistogram($('div #histogram3'),
        '',
        new HistogramData(Sampling.integerValues(), Sampling.uniformFrequencies(0)),
        true /* yTicks */,
        6,    /* yIntervals */
        true,  /* shouldPlotStats */
        false   /* editable */);
    this.histogram3 = histogram3;

    histogram3.addObserver(changeStats, 'changeStats');
    changeStats(histogram3);

    // Set up sample data histogram
    var histogram4 = new AnimatedHistogram($('div #histogram4'),
        '',
        new HistogramData(Sampling.integerValues(), Sampling.uniformFrequencies(0)),
        true,/* yTicks */
        6,    /* yIntervals */
        true,  /* shouldPlotStats */
        false   /* editable */);
    this.histogram4 = histogram4;
    histogram4.addObserver(changeStats, 'changeStats');
    changeStats(histogram4);
};


Sampling.prototype.setupControls = function() {
    var self = this;
    // Set up 'clear lower 3' button
    $('#resetSamples').click(function() {
      self.resetSamples();
    });

    // Set up control to change distribution
    var histogram1 = this.histogram1;
    var $selectDistribution = $('select[name=distribution]');
    var $selectDistPara = $('input[name=distPara]');
    $selectDistPara.change(function(){
	   $selectDistribution.trigger('change');
    });
    $selectDistribution.change(function() {
	$("#normdistgraph").css("display","none");
        var val = $(this).val();
        if (val === "Normal") {
	    $("#normdistgraph").css("display","inline");
//shd set histogram data from user input para
            var para= $('input[name=distPara]:checked').val();
	    $('#distPara1').html('mean=0;SD=1');
	    $('#distPara2').html('mean=16;SD=5');
	    $('#distPara3').html('mean=-16;SD=5');
	    //alert(para);
	    histogram1.setHistogramData(Sampling.normalDistribution(parseInt(para)));
        }
        else if (val === "Binomial") {
            var para= $('input[name=distPara]:checked').val();
	    $('#distPara1').html('n=1;p=0.5');
	    $('#distPara2').html('n=8;p=0.5');
	    $('#distPara3').html('n=8;p=0.2');
            histogram1.setHistogramData(Sampling.binomialDistribution(parseInt(para)));
        }
        else if (val === "Poisson") {
            var para= $('input[name=distPara]:checked').val();
	    $('#distPara1').html('Lambda=1');
	    $('#distPara2').html('Lambda=5');
	    $('#distPara3').html('Lambda=10');
            histogram1.setHistogramData(Sampling.poissonDistribution(parseInt(para)));
        }
        else if (val === "Uniform") {
            var para= 1;
            histogram1.setHistogramData(Sampling.uniformDistribution(parseInt(para)));
        }
        else if (val === "Skewed") {
            histogram1.setHistogramData(Sampling.skewedDistribution());
        }
        else if (val === "Custom") {
            histogram1.setHistogramData(new HistogramData(Sampling.valuesWithInterval(this.currentInterval), Sampling.uniformFrequencies(0)));
        }
//        if (val !== self.currentDistribution) {
          self.resetSamples();
//        }
        self.currentDistribution = val;
    });

    $('#sample5').click(function() {
        self.updateChartsWithSamples(5);
    });
    $('#sample10000').click(function() {
        self.updateChartsWithSamples(10000);
    });
    $('#sample100000').click(function() {
        self.updateChartsWithSamples(100000);
    });

    $('#sampleAnimated').click(function() {
      self.sampleAnimated();
    });

  var histogram3Changed = function() {
    var statToDisplay = $('#histogram3Stat :selected').text();
    var selectedStat = $('#histogram3Stat :selected').val();
    var sampleSize = $('#histogram3SampleSize :selected').text();
    if (statToDisplay!="Mean"){
	$('#hist3note').text('Nothing to display');
    }else{
	$('#hist3note').text('In probability theory, the central limit theorem (CLT) states that, given certain conditions, the arithmetic mean of a sufficiently large number of iterates of independent random variables, each with a well-defined expected value and well-defined variance, will be approximately normally distributed, regardless of the underlying distribution. (From wikipedia)');
    }
    self.histogram3.setTitle('Distribution of ' + statToDisplay + 's, ' + sampleSize);
    self.histogram3.setBarColor(self.colorForStat(selectedStat));
    self.resetSamples();
  };
  $('#histogram3Stat, #histogram3SampleSize').change(histogram3Changed);
  histogram3Changed();

  $('#histogram4Stat, #histogram4SampleSize').change(function() {
    var statToDisplay = $('#histogram4Stat :selected').text();
    var selectedStat = $('#histogram4Stat :selected').val();
    var sampleSize = $('#histogram4SampleSize :selected').text();
     if (statToDisplay!="Mean"){
	$('#hist4note').text('Nothing to display');
    }else{
	$('#hist4note').text('In probability theory, the central limit theorem (CLT) states that, given certain conditions, the arithmetic mean of a sufficiently large number of iterates of independent random variables, each with a well-defined expected value and well-defined variance, will be approximately normally distributed, regardless of the underlying distribution. (From wikipedia)');
    }
    if (selectedStat === 'none') {
      self.histogram4.setTitle('');
    }
    else {
      self.histogram4.setTitle('Distribution of ' + statToDisplay + 's, ' + sampleSize);
    }
    self.histogram4.setBarColor(self.colorForStat(selectedStat));
    self.resetSamples();
  });

  $('#histogram3FitNormal').change(function() {
    var shouldFitNormal = this.checked;
    self.histogram3.setFitNormal(shouldFitNormal);
  });

  $('#histogram4FitNormal').change(function() {
    var shouldFitNormal = this.checked;
    self.histogram4.setFitNormal(shouldFitNormal);
  });
};


/**
 * Reset samples.  Called whenever the user changes sample size or statistic display.
 */
Sampling.prototype.resetSamples = function() {
  var selectedStat3 = $('#histogram3Stat :selected').val();
  var sampleSize3 = $('#histogram3SampleSize :selected').val();
  var selectedStat4 = $('#histogram4Stat :selected').val();
  var sampleSize4 = $('#histogram4SampleSize :selected').val();
  this.histogram2.setHistogramData(HistogramData.makeEmpty(this.histogram1.histogramData.values));
  this.histogram3.setHistogramData(HistogramData.makeEmpty(this.binValuesForStat(selectedStat3, parseInt(sampleSize3))));
  this.histogram4.setHistogramData(HistogramData.makeEmpty(this.binValuesForStat(selectedStat4, parseInt(sampleSize4))));
};


/**
 * Return the histogram bin interval to use for the specified statistic.
 * @param {string} statName The name of the stat being displayed.
 * @param {number} sampleSize The number of samples.
 * @return {number} The interval between bins in the histogram.
 */
Sampling.prototype.valueIntervalForStat = function(statName, sampleSize)
{
  var distribution = $('select[name=distribution]').val();

  if (statName === 'variance' || statName === 'varianceUnbiased') {
    // Use different scales to show distributions of variances
    if (distribution === 'Custom') {
      return 8;
    }
    else if (distribution === 'Normal') {
      switch (sampleSize) {
        case 2:
          return 6;
        case 4:
          return 4;
        case 8:
          return 3;
        case 16:
          return 3;
        case 32:
          return 2;
        default:
          return 1;
      }
    }
    else if (distribution === 'Skewed') {
      switch (sampleSize) {
        case 2:
          return 8;
        case 4:
          return 8;
        case 8:
          return 6;
        case 16:
          return 6;
        case 32:
          return 5;
        default:
          return 1;
      }
    }
  }
  return Sampling.currentInterval;
};


/**
 * Return the histogram bin values to use for the specified statistic
 * @param {string} statName The name of the stat being displayed.
 * @param {number} sampleSize The sample size.
 * @return {Array<number>} The bin values to use to display the specified stat.
 */
Sampling.prototype.binValuesForStat = function(statName, sampleSize) {
 var distribution = $('select[name=distribution]').val();

  if (statName === 'variance' || statName === 'varianceUnbiased') {
    // Use different scales to show distributions of variances
    if (distribution === 'Custom') {
      return Sampling.valuesWithInterval(8);
    }
    else if (distribution === 'Normal') {
      switch (sampleSize) {
        case 2:
          return Sampling.valuesWithInterval(6);
        case 4:
          return Sampling.valuesWithInterval(4);
        case 8:
          return Sampling.valuesWithInterval(3);
        case 16:
         return Sampling.valuesWithInterval(3);
        case 32:
         return Sampling.valuesWithInterval(2);
        default:
          return Sampling.valuesWithInterval(1);
      }
    }
    else if (distribution === 'Skewed') {
      switch (sampleSize) {
        case 2:
          return Sampling.valuesWithInterval(8);
        case 4:
          return Sampling.valuesWithInterval(8);
        case 8:
          return Sampling.valuesWithInterval(6);
        case 16:
          return Sampling.valuesWithInterval(6);
        case 32:
          return Sampling.valuesWithInterval(5);
        default:
          return Sampling.valuesWithInterval(1);
      }
    }
  }
	
	//  var interval = this.valueIntervalForStat(statName, sampleSize);
/*  var distribution = $('select[name=distribution]').val();
  var para= $('input[name=distPara]:checked').val();
 if (statName === 'mean') {
    if(distribution === 'Binomial'){
      if(para === '1'){
        switch (parseInt(sampleSize)) {
        case 2:
          return Sampling.valuesWithInterval(1/32);
        case 5:
          return Sampling.valuesWithInterval(1/);
        case 10:
          return Sampling.valuesWithInterval(10/30);
        case 16:
          return Sampling.valuesWithInterval(1/32);
        case 20:
          return Sampling.valuesWithInterval(1/20);
        case 25:
          return Sampling.valuesWithInterval(1/25);
        default:
          return 1;
       }
      }
    }
	 
  }
*/

	return this.histogram1.histogramData.values;
};


/**
 * Return the color to use for the specified statistic.
 * @param statName The name of the statistic.
 */
Sampling.prototype.colorForStat = function(statName) {
  if (statName === 'mean') {
    return 'blue';
  }
  else if (statName === 'median') {
    return 'magenta';
  }
  else if (statName === 'standardDeviation') {
    return 'red';
  }
  else if (statName === 'variance') {
    return '#404040'; // dark gray
  }
  else if (statName === 'varianceUnbiased') {
    return 'silver'; // light gray
  }
  else if (statName === 'meanAbsoluteDeviation') {
    return 'cyan';
  }
  else if (statName === 'range') {
    return 'lime';
  }
  else {
    return '#404040'; // dark gray
  }
};


/**
 * Update both charts, if necessary.  Display the distribution after taking a number of random samples.
 * @param numberOfSamples The number of samples.
 */
Sampling.prototype.updateChartsWithSamples = function(numberOfSamples) {
    this.histogram2.setHistogramData(HistogramData.makeEmpty(this.histogram1.histogramData.values));
    var sampleSize1 = $('#histogram3SampleSize :selected').val();
    var stat1 = $('#histogram3Stat :selected').val();
    this.updateChart(this.histogram3, parseInt(sampleSize1), numberOfSamples, stat1);
    this.histogram3.setBarColor(this.colorForStat(stat1));

    var sampleSize2 = $('#histogram4SampleSize :selected').val();
    var stat2 = $('#histogram4Stat :selected').val();
    this.updateChart(this.histogram4, parseInt(sampleSize2), numberOfSamples, stat2);
    this.histogram4.setBarColor(this.colorForStat(stat2));
};


/**
 * @param histogram The histogram to update.
 * @param sampleSize
 * @param numberOfSamples
 * @param statToDisplay
 */
Sampling.prototype.updateChart = function(histogram, sampleSize, numberOfSamples, statToDisplay) {
    var parentPopulation = this.histogram1.histogramData;
    if (statToDisplay == 'none') {
        histogram.setHistogramData(HistogramData.makeEmpty(parentPopulation.values));
        histogram.setTitle('');
    }
    else {
        var reduceFunction = StatisticsFunctions.functionByName(statToDisplay);
        var samples = this.sampleMany(parentPopulation, sampleSize, numberOfSamples, reduceFunction);
        var newSamples = HistogramData.makeWithDataPoints(samples, this.histogram1.histogramData.values);
        var existingSamples = histogram.histogramData;
        var allSamples = HistogramData.makeByCombiningData(existingSamples, newSamples);
        if (allSamples.numberOfObservations() !== newSamples.numberOfObservations() + existingSamples.numberOfObservations()) {
          console.log('ruh roh');
        }
        histogram.setHistogramData(allSamples);
    }
};


/**
 * Generate a random sample from a distribution.
 * @param {HistogramData} distribution The distribution.
 * @param {number} sampleSize The number of data points in the sample.
 * @returns {Array<number>} An array of data points which are the result of sampling this distribution.
 */
Sampling.prototype.sample = function (distribution, sampleSize) {
    var frequencies = distribution.frequencies;
    var values = distribution.values;
    var numberOfBins = distribution.numberOfBins();
    var sampleData = [];
    var totals = []; // The total number of observations less than or equal to a certain value
    var numberOfObservations = 0;
    var step2 = (values[1] - values[0]) / 2;
    for (var i = 0; i < numberOfBins; i++) {
        numberOfObservations += frequencies[i];
        totals[i] = numberOfObservations;
    }

    for (var i = 0; i < sampleSize; i++) {
        // Choose a random number within the total number of observations
        var randomIndex = Math.floor(Math.random() * numberOfObservations) + 1;
        // Find the bin corresponding to that random number
        for (var j = 0; j < numberOfBins; j++){
            if (randomIndex <= totals[j]) {
                var value = values[j];
                value += (Math.random() - 0.5) * step2;
                sampleData.push(value);
                break;
            }
        }
    }

    return sampleData;
};


/**
 * Generate a distribution by sampling a parent population repeatedly.
 * @param {HistogramData} distribution The distribution.
 * @param {number} sampleSize The number of data points in the sample.
 * @param {number} numberOfSamples The number of times to sample the parent population
 * @param {function(Array) : number} reduceFunction A function which takes an array of values and produces a single result.
 * @returns {Array} An array of the results of applying reduceFunction to each sample.
 */
Sampling.prototype.sampleMany = function(distribution, sampleSize, numberOfSamples, reduceFunction) {
    var frequencies = distribution.frequencies;
    var values = distribution.values;
    var numberOfBins = distribution.numberOfBins();
    var sampleData = [];
    var totals = []; // The total number of observations less than or equal to a certain value
    var numberOfObservations = 0;
    var step2 = (values[1] - values[0]) / 2;
    for (var i = 0; i < numberOfBins; i++) {
        numberOfObservations += frequencies[i];
        totals[i] = numberOfObservations;
    }

    var resultsData = [];
    for (var sampleIndex = 0; sampleIndex < numberOfSamples; sampleIndex++) {
        for (var i = 0; i < sampleSize; i++) {
            // Choose a random number within the total number of observations
            var randomIndex = Math.floor(Math.random() * numberOfObservations) + 1;
            // Find the bin corresponding to that random number
            for (var j = 0; j < numberOfBins; j++) {
                if (randomIndex <= totals[j]) {
                    var value = values[j];
                    value += (Math.random() - 0.5) * step2;
                    sampleData[i] = value;
                    break;
                }
            } // for (var j =
        } // for (var i
        var result = reduceFunction(sampleData);
        resultsData.push(result);
    } // for (var sampleIndex

    return resultsData;
};


/**
 * Sample more data, one sample at a time, animated.
 */
Sampling.prototype.sampleAnimated = function() {
  var self = this;
  var selectedStat3 = $('#histogram3Stat :selected').val();
  var sampleSize3 = parseInt($('#histogram3SampleSize :selected').val());

  var selectedStat4 = $('#histogram4Stat :selected').val();
  var sampleSize4 = parseInt($('#histogram4SampleSize :selected').val());

  function animateSecondDistribution() {
     if (selectedStat4 !== 'none') {
       self.histogram2.setHistogramData(HistogramData.makeEmpty(self.histogram1.histogramData.values));
       var sampleData = self.sample(self.histogram1.histogramData, sampleSize4);
       self.histogram2.animateInData(sampleData, function() {
         // animation complete
         var reduceFunction = StatisticsFunctions.functionByName(selectedStat4);
         var dataPoint = reduceFunction(sampleData);
         self.histogram4.animateInData([dataPoint]);
       });
     }
  }

  if (selectedStat3 !== 'none') {
    self.histogram2.setHistogramData(HistogramData.makeEmpty(self.histogram1.histogramData.values));
    var sampleData = self.sample(self.histogram1.histogramData, sampleSize3);
    self.histogram2.animateInData(sampleData, function() {
      // animation complete
      var reduceFunction = StatisticsFunctions.functionByName(selectedStat3);
      var dataPoint = reduceFunction(sampleData);
      self.histogram3.animateInData([dataPoint], function() {
        // Animate in second distribution, after a slight delay
        setTimeout(animateSecondDistribution(), 150);  // 250ms = 1/4s
      });
    });
  }
  else {
    animateSecondDistribution();
  }
};
