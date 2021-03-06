var express = require('express');
var router = express.Router();
const {
	GetGenderAnalytics,
	GetRaceComparison,
} = require('../modules/CaseManager');

const {GetTwoWorldPlacesComparison , GetWorldPopulationAnalysis } = require('../modules/WorldPlaceManager');
const { GetTwoUSPlacesComparison, GetUSPopulationAnalysis   } = require('../modules/USPlacesManager')

router.get('/compareGender', (req, res) => {
	const genderAnalytics = GetGenderAnalytics(
		req.query.Country,
		req.query.TypeOfData
	);

	if (genderAnalytics == null) {
		res.send({
			CountryExists: false,
			FemaleNumberOfCases: 0,
			MaleNumberOfCases: 0,
		});
	} else {
		res.send({
			CountryExists: true,
			FemaleNumberOfCases: genderAnalytics.femaleNum,
			MaleNumberOfCases: genderAnalytics.maleNum,
		});
	}
});

router.get('/compareRace', (req, res) => {
	res.send({
		CountryNumberDict: GetRaceComparison(req.query.Option),
	});
});

router.get('/compareProvinces', (req, res) => {
	const twoPlacesComparison = GetTwoWorldPlacesComparison(
		req.query.Country1,
		req.query.Province1,
		req.query.Country2,
		req.query.Province2,
		req.query.TypeOfData,
	);

	console.log(twoPlacesComparison);
	res.send({
		Province1Exists: twoPlacesComparison.place1Value != -1,
		Province2Exists: twoPlacesComparison.place2Value != -1,
		Province1NumberOfCases: twoPlacesComparison.place1Value,
		Province2NumberOfCases: twoPlacesComparison.place2Value,
	});
});

router.get('/comparePercentageWorld', (req, res) => {
	const populationComparison = GetWorldPopulationAnalysis(
		req.query.Country,
		req.query.Province
	);

	console.log(populationComparison);
	res.send({
		ProvinceExists: populationComparison.confirmed != -1,
		NumOfRecovered: populationComparison.recovered,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed,
	});
});

router.get('/compareCounties', (req, res) => {
	const twoPlacesComparison = GetTwoUSPlacesComparison(
		req.query.State1,
		req.query.County1,
		req.query.State2,
		req.query.County2,
		req.query.TypeOfData,
	);

	res.send({
		County1Exists: twoPlacesComparison.place1Value != -1,
		County2Exists: twoPlacesComparison.place2Value != -1,
		County1NumberOfCases: twoPlacesComparison.place1Value,
		County2NumberOfCases: twoPlacesComparison.place2Value,
	});
});

router.get('/comparePercentageUS', (req, res) => {
	const populationComparison = GetUSPopulationAnalysis(
		req.query.State,
		req.query.County
	);

	res.send({
		CountyExists: populationComparison.confirmed != -1,
		NumOfUnaffected: populationComparison.unaffected,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed,
	});
});

module.exports = router;
