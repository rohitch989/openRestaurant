const fs = require('fs')
const stringtime = (m, k) => {
  // My time
  var timeMer = k.slice(-2).toLowerCase();

  var timehr = parseInt(k.split(":")[0]);
  var timeMin = parseInt(k.split(timeMer)[0].slice(-2));
  // TIme Range 1
  var timeRange1 = m.split("-")[0];
  var timeRage1Mer = timeRange1.split(" ")[1];
  var timeRage1Hr = parseInt(timeRange1.split(" ")[0].split(":")[0]);
  var timeRage1Min = parseInt(timeRange1.split(" ")[0].split(":")[1]);

  if (isNaN(timeRage1Min)) {
    timeRage1Min = 0;
  }
  // TIme Range 1
  var timeRange2 = m.split("-")[1];
  var timeRage2Mer = timeRange2.split(" ")[2];
  var timeRage2Hr = parseInt(timeRange2.split(" ")[0].split(":")[0]);
  var timeRage2Min = parseInt(timeRange2.split(" ")[0].split(":")[1]);
  if (timeRange2.split(" ")[0] == "") {
    timeRage2Hr = parseInt(timeRange2.split(" ")[1]);
  }
  if (isNaN(timeRage2Min)) {
    timeRage2Min = parseInt('00');
  }

  if ((timeMer == timeRage1Mer && (timehr > timeRage1Hr || (timehr == timeRage1Hr && timeMin >= timeRage1Min))) || ((timeMer == timeRage2Mer) && (timehr < timeRage2Hr || (timehr == timeRage2Hr && timeMin <= timeRage2Min)))) {
    return true;
  } else {
    return false;
  }
}

const days = {
  'Wed-Sun': ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  'Mon-Thu': ['Mon', 'Tue', 'Wed', 'Thu'],
  'Mon-Wed': ['Mon', 'Tue', 'Wed'],
  'Mon-Sat': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'Fri-Sat': ['Fri', 'Sat'],
  'Fri-Sun': ['Fri', 'Sat', 'Sun'],
  'Mon-Fri': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  'Sat-Sun': ['Sat', 'Sun'],
  'Mon': ['Mon'],
  'Tue': ['Tue'],
  'Wed': ['Wed'],
  'Thu': ['Thu'],
  'Fri': ['Fri'],
  'Sat': ['Sat'],
  'Sun': ['Sun'],
}


exports.filterdata = (data, day, tim) => {
  const kmm = tim.split(" ");
  const time = kmm[0] + kmm[1].toLocaleLowerCase();

  const newDate = JSON.parse(data);
  const neonew = newDate.filter(t => {
    const mew = t['Mon-Sun 11:30 am - 9 pm'].split('/');
    if (mew.length == 1) {

      if (mew[0].slice(0, 7) == 'Mon-Sun') {
        return stringtime(mew[0].slice(8), time) ? t['Kushi Tsuru'] : null;
      } else {
        if (day == mew.slice(0, 3) || day == days[mew[0].split(' ')[1]].find(tman => {
          return (tman == day)
        })) {
          return stringtime(mew[0].slice(8), time) ? t['Kushi Tsuru'] : null;
        }
      }
    }

    else if (mew.length == 2) {
      mew.forEach(element => {
        if (element.split(" ")[0] == "") {
          if (day == element.split(" ")[1] || day == days[element.split(" ")[1]].find(tman => {
            return (tman == day)
          })) {
            var anselement = element.split(" ")[2] + element.split(" ")[3] + element.split(" ")[4] + element.split(" ")[5] + element.split(" ")[6];
            return stringtime(anselement, time) ? t['Kushi Tsuru'] : null;
          }

        } else {
          if (day == element.split(" ")[1]) {
            anselement = element.split(" ")[2] + element.split(" ")[3] + element.split(" ")[4] + element.split(" ")[5] + element.split(" ")[6];
            return stringtime(anselement, time) ? t['Kushi Tsuru'] : null;
          }
          else {
            if (day == days[element.split(" ")[0].slice(0, 7)].find(tman => {
              return (tman == day)
            })) {
              anselement = element.split(" ")[1] + element.split(" ")[2] + element.split(" ")[3] + element.split(" ")[4] + element.split(" ")[5];
              return stringtime(anselement, time) ? t['Kushi Tsuru'] : null;
            }

          }

        }
      });
    }
    else {
      mew.forEach(element => {
        const tempelement = element.split(" ");
        if (tempelement[0] == "") {
          if (tempelement[1][4] === undefined && day == tempelement[1]) {

            let anselement = element.split(" ")[2] + element.split(" ")[3] + element.split(" ")[4] + element.split(" ")[5] + element.split(" ")[6];
            return stringtime(anselement, time) ? t['Kushi Tsuru'] : null;


          }
        } else {
          if (day == days[tempelement[0].slice(0, 7)].find(tman => {
            return (tman == day)
          })) {
            let anselement = tempelement[1] + tempelement[2] + tempelement[3] + tempelement[4] + tempelement[5];
            return stringtime(anselement, time) ? t['Kushi Tsuru'] : null;
          }

        }
      });
    }
  })

  return neonew;
}





