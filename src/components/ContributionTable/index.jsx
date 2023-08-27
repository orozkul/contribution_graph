import { useEffect, useState } from 'react'
import moment from 'moment'
import './style.css'
import ContributionItem from '../ContributionItem'

function ContributionTable() {
  const [contributions, setContributions] = useState([])
  const [months, setMonths] = useState([])

  useEffect(() => {
    fetch('https://dpg.gg/test/calendar.json')
    .then(res => {
      return res.json();
    })
    .then(data => {
      const startDay = moment().startOf('isoweek').subtract(50, 'weeks')
      console.log(startDay)
      const arr = []
      const monthsArr = []

      for (let r=0; r<7; r++){
        let currentDay = moment(startDay).add(r, 'days');
        for (let c=0; c<51; c++){
          let day = moment(currentDay).add(c*7, 'days').format('YYYY-MM-DD');
          arr.push({date: day, value: data[day] || 0});
        }
      }

      for (let m=0; m<12; m++){
        let currentMonth = moment(startDay).add(m, 'months');
        monthsArr.push(currentMonth.format('MMM'))
      }

      setContributions(arr)
      console.log(arr)
      setMonths(monthsArr)
    })
  }, [])

  return (
    <>
      <div className='table'>
        <div></div>
        <div className='months'>
          {months.map(month => (
            <div key={month}>{month}</div>
          ))}
        </div>
        <div className="weekDays">
            <div className='weekDay'>Mon</div>
            <div className='weekDay'></div>
            <div className='weekDay'>Wed</div>
            <div className='weekDay'></div>
            <div className='weekDay'>Fri</div>
            <div className='weekDay'></div>
            <div className='weekDay'></div>
        </div>
        <div className='chart'>
          {contributions.map((contribution, index) => (
            <ContributionItem key={index} contribution={contribution}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default ContributionTable