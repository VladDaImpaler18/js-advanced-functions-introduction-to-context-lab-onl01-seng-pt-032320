//["Gray", "Worm", "Security", 1]
function createEmployeeRecord(array_obj){ 
let employee = {}
    employee.firstName = array_obj[0]
    employee.familyName = array_obj[1]
    employee.title = array_obj[2]
    employee.payPerHour = array_obj[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
return employee
}
/*
let twoRows = [
        ["moe", "sizlak", "barkeep", 2],
        ["bartholomew", "simpson", "scamp", 3]
      ]
*/

function createEmployeeRecords(arrays){
    return arrays.map(array => createEmployeeRecord(array))
}
//(employee_obj, "2014-02-28 1400")
function createTimeInEvent(employee, punchInData){
    let punchTime = {};
    let date, hour;
    [date, hour] = punchInData.split(" ");
    [punchTime.type, punchTime.date, punchTime.hour] = ["TimeIn", date, parseInt(hour)];
    employee.timeInEvents.push(punchTime);
    return employee;
}

function createTimeOutEvent(employee, punchOutData){
    let punchTime = {};
    let date, hour;
    [date, hour] = punchOutData.split(" ");
    [punchTime.type, punchTime.date, punchTime.hour] = ["TimeOut", date, parseInt(hour)];
    employee.timeOutEvents.push(punchTime);
    return employee;
}
//0044-03-15
function hoursWorkedOnDate(employee, date){
    let punchIn, punchOut;
    [punchIn, punchOut] = [employee.timeInEvents.find(item => date).hour, employee.timeOutEvents.find(item => date).hour];
    return Math.abs((punchIn-punchOut)/100);
}
function wagesEarnedOnDate(employee, date){
    let payRate = employee.payPerHour;
    return hoursWorkedOnDate(employee, date) * payRate
}

function allWagesFor(employee){
    let total = 0;
    employee.timeInEvents.forEach(record => {total+= wagesEarnedOnDate(employee, record)});
    return total;
}