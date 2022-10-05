import React from 'react';
import './App.css';
import axios from 'axios';
import PlayerAddForm from './PlayerAddForm';

class App extends React.Component {
  state = {
    list: []
  }

  //refresh the table
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

  //returns the header, Add player form, refresh list button to update
  //table, and displays the table contents entered after refreshing
  render(){
    return (
      <div className="App">
        <header className="App-header">
          Add Players to your roster!
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
                  <td>{item.name}</td>
                  <td>{item.position}</td>
                  <td>{item.number}</td>
                </tr>)}
            </tbody>
          </table>
        </section>
      </div>
    );
  }  
}

export default App;
