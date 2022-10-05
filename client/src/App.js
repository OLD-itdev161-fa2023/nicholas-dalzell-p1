import React from 'react';
import './App.css';
import axios from 'axios';
import PlayerAddForm from './PlayerAddForm';

class App extends React.Component {
  state = {
    list: []
  }

  componentDidMount() {
    this.tableRefresh();
  }


  tableRefresh = () => {
    axios.get('http://localhost:5000/api/player-list')
      .then((response) => {
        this.setState({
          list: response.data
        })
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`)
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Players listed here
        </header>
        <PlayerAddForm />
        <section id = "player-table">
          <button onClick = {this.tableRefresh}>Refresh List</button>
          <table>
            <thead><tr>
              <td>Player</td><td>Position</td><td>Number</td>
            </tr></thead>
            <tbody>
              {this.state.list.map((item) =>
                <tr>
                  <td key="1">{item.name}</td>
                  <td key="2">{item.position}</td>
                  <td key="3">{item.number}</td>
                </tr>)}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
  
}

export default App;
