const writeCSVModule = require('../modules/WriteCSV.js');

function AddCase(
	allCases,
	reportingDate,
	country,
	age,
	gender,
	recovered,
	dead,
	location,
	id
) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) return false;
	}

	const classesModule = require('../modules/DataClasses.js');

	// var dateString =
	// 	reportingDate.getMonth() +
	// 	1 +
	// 	'/' +
	// 	reportingDate.getDay() +
	// 	'/' +
	// 	reportingDate.getFullYear();

	console.log(reportingDate);
	// console.log(dateString);
	var newCase = new classesModule.Case([
		id, // 0: id
		'', // 1: case in country
		reportingDate, // 2: reporting date
		'', // 3: blacnk column
		'', // 4: summary
		location, // 5: location
		country, // 6: country
		gender, // 7: gender
		age, // 8: age
		'', // 9: Symptom on set
		'', // 10: if onset approximated
		'', // 11: hospital visit date
		'', // 12: exposure start
		'', // 13: exposure end
		'', // 14: from Wuhan
		'', // 15: visiting Wuhan
		dead ? '1' : '0', // 16: dead
		recovered ? '1' : '0', // 17: recovered
		'', // 18: symptom
		'', //19: source
		'', // 20: link
	]);

	allCases.push(newCase);
	writeCSVModule.RecordCases(allCases);
	return true;
}

function EditCase(
	allCases,
	reportingDate,
	country,
	age,
	gender,
	recovered,
	dead,
	location,
	id
) {
	console.log(dead);
	console.log(recovered);
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) {
			allCases[i].country = country;
			allCases[i].reportingDate = reportingDate;
			allCases[i].reportingDateStr =
				reportingDate.getMonth() +
				1 +
				'/' +
				reportingDate.getDate() +
				'/' +
				reportingDate.getFullYear();
			allCases[i].age = age;
			allCases[i].gender = gender;
			allCases[i].recovered = recovered;
			allCases[i].dead = dead;
			allCases[i].location = location;
			writeCSVModule.RecordCases(allCases);

			return true;
		}
	}

	// id not found.
	return false;
}

function RemoveCase(allCases, id) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) {
			allCases.splice(i, 1);
			writeCSVModule.RecordCases(allCases);

			return true;
		}
	}

	// id not found.
	return false;
}

function DeleteUSData(county, state, date, USData, tod) {
	var result = false;
	if (tod == 1) {
		console.log(USData.length);
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete USData[i].numConfirmed[key];
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete USData[i].numDeaths[key];
						result = true;
						break;
					}
				}
			}
		}
	}
	writeCSVModule.RecordUSData(USData);
	return result;
}

function EditUSData(county, state, date, USData, tod, number) {
	var result = false;
	if (tod == 1) {
		console.log(USData.length);
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						USData[i].numConfirmed[key] = number;
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						USData[i].numDeaths[key] = number;
						result = true;
						break;
					}
				}
			}
		}
	}
	writeCSVModule.RecordUSData(USData);
	return result;
}

const helper = require('../modules/BasicHelpers.js');
function AddUSData(county, state, date, USData, tod, number) {
	var errormsg = 'no error';
	if (tod == 1) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						//return result;
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				USData[i].numConfirmed[temp_date] = number;
				break;
			} else if (i == USData.length - 1) {
				// if its the last element & prog didn't go into the 1st if -> place doesn't exist
				errormsg = 'wrong place';
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numDeaths) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				USData[i].numDeaths[temp_date] = number;
				break;
			} else if (i == USData.length - 1) {
				// if its the last element & prog didn't go into the 1st if -> place doesn't exist
				errormsg = 'wrong place';
				break; //just in case
			}
		}
	}
	writeCSVModule.RecordUSData(USData);
	//return result;
	return errormsg;
}

function DeleteWorldData(country, state, date, WorldData, tod) {
	var result = false;
	if (tod == 1) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete WorldData[i].numConfirmed[key];
						console.log('DELETED');
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete WorldData[i].numDeaths[key];
						console.log('DELETED DEATH');
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 3) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numRecovered) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete WorldData[i].numRecovered[key];
						console.log('DELETED RECOVERED');
						result = true;
						break;
					}
				}
			}
		}
	}
	const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordWorldData(WorldData);
	// for (var i = 7; i < 10; ++i) {
	//     console.log("hihi");
	//     console.log(WorldData[i]);
	// }
	return result;
}

function UpdateWorldData(country, state, date, WorldData, tod, number) {
	var result = false;
	if (tod == 1) {
		console.log(WorldData.length);
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						WorldData[i].numConfirmed[key] = number;
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		console.log(WorldData.length);
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						WorldData[i].numDeaths[key] = number;
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 3) {
		console.log(WorldData.length);
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numRecovered) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						WorldData[i].numRecovered[key] = number;
						result = true;
						break;
					}
				}
			}
		}
	}
	writeCSVModule.RecordWorldData(WorldData);
	return result;
}

function InsertWorldData(country, state, date, WorldData, tod, number) {
	var errormsg = 'no error';
	if (tod == 1) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numConfirmed) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				WorldData[i].numConfirmed[temp_date] = number;
				break;
			} else if (i == WorldData.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numDeaths) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				WorldData[i].numDeaths[temp_date] = number;
				break;
			} else if (i == WorldData.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	} else if (tod == 3) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numRecovered) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				WorldData[i].numRecovered[temp_date] = number;
				break;
			} else if (i == WorldData.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	}
	writeCSVModule.RecordWorldData(WorldData);
	// for (var i = 7; i < 10; ++i) {
	//     console.log("hihi");
	//     console.log(WorldData[i]);
	// }
	return errormsg;
}

module.exports = {
	//Delete function
	DeleteUSData: DeleteUSData,

	// Argument: Array of WorldPlace.
	EditUSData: EditUSData,

	// Argument: Array of USPlace.
	AddUSData: AddUSData,

	//World Add
	DeleteWorldData: DeleteWorldData,

	//World Update
	UpdateWorldData: UpdateWorldData,

	//World Insert
	InsertWorldData: InsertWorldData,
	// Argument: Array of Case,  reportingDate (Date), country, age, gender, recovered (Bool), dead (Bool), location, id
	EditCase: EditCase,

	// Argument: Array of Case,  reportingDate (Date), country, age, gender, recovered (Bool), dead (Bool), location, id
	AddCase: AddCase,

	// Argument: Array of Case,  id of the Case the user wants to delete.
	RemoveCase: RemoveCase,
};
