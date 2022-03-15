import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Cats from './Cats';
import './App.css';
import Header from './components/Header';
const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = { data: [], breed: '', cats: [], isLoading: null, pageNum: 1 };
  }

  getBreed() {
    let params = (new URL(document.location)).searchParams;
    return params.get('breed')
  }
  selectBreed(e) {
    let self = this;
    let selectedbreed = (e === undefined) ? this.state.breed : e.target.value;
    let obj = { breed: selectedbreed, isLoading: true }
    if (e !== undefined) {
      obj.pageNum = 1;
      obj.cats = [];
    }
    if (selectedbreed !== "") {
      self.setState(obj, () => {
        const url = `https://api.thecatapi.com/v1/images/search?page=${this.state.pageNum}&limit=10&breed_id=${this.state.breed}`
        axios(url).then(json => {
          let fetchCats = this.state.cats;
          let newData = json.data;
          if (this.state.cats.length > 0) {
            let newArr = [];
            let searchIds = this.state.cats.map((e) => {
              return e.id
            })
            json.data.forEach(e => {
              if (!searchIds.includes(e.id)) newArr.push(e)
            })
            console.log(newArr)
            if (newArr.length > 0) {
              let myData = fetchCats.concat(newArr)

              self.setState({ cats: myData, isLoading: false })
            } else {
              self.setState({isLoading: null })
            }
          } else {
            let myData = fetchCats.concat(newData);

            self.setState({ cats: myData, isLoading: false })
          }


        }
        )
      })
    } else {
      self.setState({ cats: [] })
    }
  }

  componentDidMount() {
    const url = `https://api.thecatapi.com/v1/breeds`
    const self = this;
    axios(url).then(json =>
      self.setState({ data: json.data })
    )
    this.selectBreed = this.selectBreed.bind(this)

    const getParams = this.getBreed() ?? ''

    if (getParams !== "") {
      this.setState({ breed: getParams }, () => {
        this.selectBreed()
      })
    }
  }

  render() {

    return (
      <div className='container'>
        <Header title='Cat Browser' />
        <div className='row'>
          <div className='col-md-4'>
            <Form.Group className="mb-3">
              <Form.Label>Breed: </Form.Label>
              <Form.Select defaultValue={this.state.breed} onChange={this.selectBreed}>
                <option value="">--Please Select Breed--</option>
                {this.state.data.map((el) => (
                  <option value={el.id} key={el.id} selected={(this.state.breed === el.id) ? true : false}>{el.name}</option>
           
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className='row d-flex'>
          <Cats data={this.state.cats}></Cats>
        </div>
        {
          (this.state.isLoading !== null) && (
            <Button onClick={() => {
              this.setState({ pageNum: this.state.pageNum + 1 }, () => {
                this.selectBreed()
              })
            }}
              variant="info text-white" disabled={(this.state.isLoading === null) ? true : this.state.isLoading}
            >{(this.state.isLoading) ? 'Loading' : 'Load More'}</Button>
          )
        }
      </div>
    )

  }
}

export default App