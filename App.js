import { useState, useEffect } from 'react';
import _ from 'lodash';

const days = [
    {
        dayName: 'Monday',
        breakfastItem: null,
    },
    {
        dayName: 'Tuesday',
        breakfastItem: null,
    },
    {
        dayName: 'Wednesday',
        breakfastItem: null,
    },
    {
        dayName: 'Thursday',
        breakfastItem: null,
    },
    {
        dayName: 'Friday',
        breakfastItem: null,
    },
    {
        dayName: 'Saturday',
        breakfastItem: null,
    },
    {
        dayName: 'Sunday',
        breakfastItem: null,
    }
];

const breakfastMenuItems = [
  {
    value: 'soup',
    title: 'Soup',
    selected: false
  },
  {
    value: 'fPotatoes',
    title: 'Fried potatoes',
    selected: false
  },
  {
    value: 'bChicken',
    title: 'Boiled chicken',
    selected: false
  },
  {
    value: 'burger',
    title: 'Burger',
    selected: false
  },
  {
    value: 'teaMilk',
    title: 'Tea with milk',
    selected: true
  },
  {
    value: 'meatWine',
    title: 'Meat and wine',
    selected: false
  },
  {
    value: 'steakVegetables',
    title: 'Steak with vegetables',
    selected: false
  },
];


const BreakfastMenuSelector = () => {
  const [weekdays, setWeekdays] = useState(null);
  const [showResult, setShowResult] = useState(false)

  useEffect(() =>{
    const menuWithRandomItems = days.map((item) => {
      const twoRandomOptions = _.sampleSize(breakfastMenuItems, 2);
      const emptyItem = {
        value: 'empty',
        title: 'Not selected',
        selected: true
      };

      item.breakfastItem = [
        emptyItem,
        ...twoRandomOptions
      ];

      return item;
    });

    setWeekdays(menuWithRandomItems);
  }, []);



    const setMenuItem = (selectedDish, day) => {
      console.time('Benchmark test')

      console.log(day)
      const week = weekdays.map((item) => {

        if(item.dayName === day){
          return {
            ...item,
            breakfastItem: item.breakfastItem.map((dish) => {
              if(dish.value === selectedDish){
                return {...dish, selected: true}
              }else{
                return {...dish, selected: false}
              }
            })
          }
        }
        return item;
      });

        console.log(week)
        setWeekdays(week);
        console.timeEnd('Benchmark test');

    }



    const showSelectedMenu = () => {
      const showSelected = (items) => {
        const menuItem = items.filter((item) => item.selected === true);
        console.log(menuItem);
        return(
          <span>{menuItem[0].title}</span>
        )
      }

      return weekdays.map((item, index) => (
        <p key={index}>
            <span>{item.dayName}</span>&nbsp;&nbsp;&nbsp;
            {
              showSelected(item.breakfastItem)
            }
            <br />
        </p>
      ))
    }

    if(!weekdays) return null;

    if(weekdays && weekdays.length > 0) return (
        <div>
            <h1>Week breakfast menu selector</h1>
            {weekdays.map((item, index) => (
              <p key={index}>
                  <span>{item.dayName}</span>
                    <select defaultValue={'empty'} multiple={false} onChange={ e => setMenuItem(e.target.value, item.dayName, item.breakfastItem)}>
                        {item.breakfastItem.map((item2, index) => (
                          <option key={index} value={item2.value}>{item2.title}</option>
                        ))}
                    </select>
              </p>
            ))}
            <br />
            <h2>
              Selected week menu
            </h2>
            {showResult && showSelectedMenu()}
            <button onClick={() => setShowResult(!showResult)}>show result</button>
        </div>
    );
}

export default BreakfastMenuSelector;
