import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const url = 'http://localhost:3000/stocks'
class MainContainer extends Component {
  state= {
    stocks:[],
    portfolioStocks: [],
    displayStocks: []
  }

  getFetch = () => {
    fetch(url)
    .then( res => res.json())
    .then(stocks => {
      this.setState({stocks})
    })
  }
  componentDidMount(){
    this.getFetch()
  }

  addStock = (stock) => {
    if(!this.state.portfolioStocks.includes(stock)){
      this.setState({
        portfolioStocks: [...this.state.portfolioStocks, stock]
      })
    }
  }

  removeStock = (stockObj) => {
    let newStocks = this.state.portfolioStocks.filter(stock => stock !== stockObj)
    this.setState({
      portfolioStocks: newStocks
    })
  }

  filterStocks = (type) => {
    if(type !== 'All'){
      this.setState({
        displayStocks: this.state.stocks.filter(stock => stock.type === type)
      })
    } else {
      this.setState({
        displayStocks: this.state.stocks
      })
    }
  }

  sortStocks = (sortBy) => {
    let arr = []
    if(sortBy === 'Alphabetically'){
      arr = this.state.displayStocks.sort((a,b) => a.name > b.name ? 1 : -1)
    } else if(sortBy === 'Price'){
      arr = this.state.displayStocks.sort((a,b) => a.price > b.price ? 1: -1)
    }
    this.setState({
      displayStocks: arr
    })
  }

  render() {
    const {stocks} = this.state
    console.log(this.state.displayStocks)
    return (
      <div>
        <SearchBar
          filterStocks={this.filterStocks}
          sortStocks={this.sortStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.state.displayStocks}
                addStock={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer
                stocks={stocks}
                portfolioStocks={this.state.portfolioStocks}
                removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
