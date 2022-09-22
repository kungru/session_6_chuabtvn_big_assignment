import { useState } from 'react';
import './App.css';

function App() {
  const [listExpense, setListExpense] = useState([
    { id: 1, name: 'Some Book', price: '50', date: '2020-09-19' },
    { id: 2, name: 'Electricity Bill', price: '75', date: '2022-10-10' },
    { id: 3, name: 'New Bike', price: '100', date: '2022-05-08' }
  ]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const [yearFilter, setYearFilter] = useState('');
  const [listChart, setListChart] = useState([]);
  const [cardUpdate, setCardUpdate] = useState([]);
  const buttonShowForm = () => {
    setToggleForm(true);
  };
  const buttonHideForm = () => {
    setName('');
    setPrice('');
    setDate('');
    setToggleForm(false);
  };
  const buttonSubmit = () => {
    const data = {
      id: Math.floor(Math.random() * 100) + 1,
      name,
      price,
      date,
    };
    const listExpenseTemp = [...listExpense];
    setListExpense([...listExpenseTemp, data]);
  };

  const convertMonth = (month) => {

    switch (parseInt(month)) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  };
  const handleGetYearFilter = (event) => {
    let total = 0;
    console.log(event.target.value);
    setYearFilter(event.target.value);
    let listData = listExpense.filter((e) => {
      return e.date.split('-')[0] == event.target.value
    });
    console.log(listData);
    for (let i = 0; i < listData.length; i++) {
      total += parseInt(listData[i].price);
    };
    for (let i = 0; i < listData.length; i++) {
      listData[i].percent = parseInt(listData[i].price) / total;
    }
    console.log(listData);
    setListChart(listData);
  }

  return (
    <div className="App">

      {toggleForm ? (<div className='head-form'>
        <div className='row-input'>
          <label>Name</label>
          <input type='text' placeholder='Enter name here...' value={name} onChange={(e) => { setName(e.target.value) }}></input>
        </div>
        <div className='row-input'>
          <label>Amount</label>
          <input type='text' placeholder='Enter amount here...' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
        </div>
        <div className='row-input'>
          <label>Date</label>
          <input type='date' onChange={(e) => { setDate(e.target.value) }}></input>
        </div>
        <div className='form-button'>

          <button className='form-cancel' onClick={buttonHideForm}>Cancel</button>
          <button className='form-add' onClick={buttonSubmit} >Add</button>
          
        </div>

      </div>) : <div className='form-add-new'><button className='add-new' onClick={buttonShowForm}>ADD NEW EXPENSE</button></div>}



      <div className='main-container'>
        <div className='container-header'>
          <p>Filter by year</p>
          <select value={yearFilter} onChange={handleGetYearFilter}>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>
        <div className='container-body'>
          <div className='container-chart'>
            {listChart.map((element, index) => {

              return (<div className="chart">
                <p>{convertMonth(element.date.split('-')[1])}</p>
                <div className="chart-percent">
                  <div
                    className="chart-fill"
                    style={{ height: `${element.percent * 100}%` }}
                  ></div>
                </div>
              </div>);
            })
            }</div>
          <div className='show-card'>
            {listExpense.map((element, index) => {
              const buttonDel = (id) => {
                const listExpenseTemp = [...listExpense];
                console.log(listExpenseTemp);

                const DataList = listExpenseTemp.filter((e) => {
                  console.log(e.id == element.id);
                  return !(e.id === element.id)
                })
                setListExpense(DataList);
              };
              const buttonGetUpdate = (id) => {
                setToggleForm(true);
                const listExpenseTemp = [...listExpense];
                const index = listExpenseTemp.findIndex((card) => {
                  return (card.id == element.id);
                });
                console.log(index);
                console.log(listExpenseTemp[index].date);
                setName(listExpenseTemp[index].name);
                setPrice(listExpenseTemp[index].price);
                setDate(listExpenseTemp[index].date);
                setCardUpdate(listExpenseTemp[index]);
              };
              const handleUpdate =(card) =>{
                const listExpenseTemp = [...listExpense];
                const index = listExpenseTemp.findIndex((card) => {
                  return (card.id == element.id);
                });
                listExpenseTemp[index].name=name;
                listExpenseTemp[index].price=price;
                listExpenseTemp[index].date=date;
                setListExpense([...listExpenseTemp]);
                setCardUpdate({});
                setName('');
                setPrice('');
                setDate('')
              }

              return (
                <div className='card' key={index} id={element.id}>
                  <div className='card-left'>
                    <p className='month'>{convertMonth(element.date.split('-')[1])}</p>
                    <p className='year' >{element.date.split('-')[0]}</p>
                    <p className='day'>{element.date.split('-')[2]}</p>
                  </div>
                  <div className='card-right'>
                    <div className='card-info'>
                      <p className='card-text'>{element.name}</p>
                      <p className='card-price'>$ {element.price}</p>
                    </div>
                  </div>
                  <div className='card-button'>
                    <button className='btn update' onClick={buttonGetUpdate} >Edit</button>
                    <button className='btn remove' onClick={buttonDel}>Remove</button>
                    
                  </div>
                
                  <button className='form-update' onClick={handleUpdate}>Update</button>
                </div>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
