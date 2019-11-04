import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    stockItem: [],
    filter: 'All',
    searchValue: 'Default'
  }

// fetching the stocks and set the state of stocks with the value back from fetch
  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stockObject => {
      // console.log(stockObject)
    this.setState({
      stocks: stockObject
     })
    })
  }

// we get the object from stockContainer by clicking it
// then we check if our state (stockItem) has the item that has been clicked
// we then store it in our state by checking with includes method if we ever clicked the same object
// if we didn't, that we spread the other objects and the new one
  handleClick = (e, stockObject) =>{
    // console.log(stock)
    if (!this.state.stockItem.includes(stockObject)) {
    this.setState({
      stockItem: [stockObject,...this.state.stockItem]
    })
    }
  }

  handleRemove = (e, stockObject) => {
    // console.log("handle remove"
    //
    this.setState({
      stockItem: this.state.stockItem.filter(stock => stock !== stockObject)
    })

  }

// First, we get the selected value from form
// And we set the value we get to our state (filter)
  handleFilterButton = (e) => {
    // console.log("filter")
    this.setState({
      filter: e.target.value
    })
  }

  handleSortButton = (e) => {
    console.log("clicked", e.target.value)
    this.setState({
      searchValue: e.target.value
    })
  }

  sortedStocks = (stocks) => {
    if(this.state.searchValue === "Alphabetically"){
      return [...stocks].sort((a,b) => {
        if (a.name > b.name) {
          return 1
        }else if ((a.name < b.name)){
          return -1
        } else {
          return 0
        }
      })
    }else if (this.state.searchValue === "Price"){
      return [...stocks].sort((a,b) => {
        if (a.price > b.price) {
          return 1
        }else if (a.price < b.price) {
          return -1
        }else {
          return 0
        }
      })

    }else{
      return stocks
    }

  }


render() {
  // console.log(this.state.stocks)
  // console.log(this.state.stockItem)
  // console.log(this.state.filter)

  // Then we use that state to check which object has the same type
  // If it is matched with all, it renders everything
  const filteredStocks = this.state.filter === "All" ? this.state.stocks : this.state.stocks.filter(stock => stock.type === this.state.filter)

  return(
    <div>
      <SearchBar handleFilterButton={this.handleFilterButton}
        handleSortButton={this.handleSortButton}/>

      <div className="row">
        <div className="col-8">
          {/* send the state of stocks to StockContainer */}
          <StockContainer stocks={this.sortedStocks(filteredStocks)} handleClick={this.handleClick} />
        </div>
        <div className="col-4">
          {/* we send our stockItem to Portfolio component so that it can render that item whenever something clicked on stock component */}
        <PortfolioContainer stockItem={this.state.stockItem} handleClick={this.handleRemove}/>
        </div>
      </div>
    </div>
  )
}


}

export default MainContainer;














  //
  // state = {
  //   stocks: [],
  //   displayStocks: [],
  //   portfolioStocks: []
  // }
  //
  // componentDidMount() {
  //   fetch("http://localhost:3000/stocks")
  //   .then(res => res.json())
  //   .then(data => {
  //     this.setState({
  //       stocks: data,
  //       displayStocks: data
  //     })
  //     /*console.log("Hi from setState!",this.state.displayStocks);*/
  //   })
  // }
  //
  // addPortfolio = (stock) => {
  //   this.setState({
  //     portfolioStocks: [...this.state.portfolioStocks, stock]
  //   })
  // }
  //
  // removeStock = (stock) => {
  //   this.setState({
  //     portfolioStocks: this.state.portfolioStocks.filter(s => s !== stock)
  //   })
  // }
  //
  // filterStocks = (type) => {
  //
  //   if(type !== 'All'){
  //     this.setState({
  //       displayStocks: this.state.stocks.filter(stock => stock.type === type)
  //     })
  //   }else{
  //     this.setState({
  //       displayStocks: this.state.stocks
  //     })
  //   }
  // }
  //
  // sortStocks = (sortBy) => {
  //   let arr = []
  //   switch(sortBy){
  //     case "Alphabetically":
  //     arr = this.state.displayStocks.sort((a,b) => a.name > b.name ? 1 : -1)
  //     break;
  //     case "Price":
  //     arr = this.state.displayStocks.sort((a,b) => a.price > b.price ? 1 : -1)
  //     break;
  //     default:
  //     console.log("Wrong Choice")
  //   }
  //   this.setState({
  //     displayStocks: arr
  //   })
  // }
  //
  // render() {
  //   return (
  //     <div>
  //       <SearchBar filterStocks={this.filterStocks} sortStocks={this.sortStocks} />
  //
  //         <div className="row">
  //           <div className="col-8">
  //
  //             <StockContainer stocks={this.state.displayStocks} addPortfolio={this.addPortfolio} />
  //
  //           </div>
  //           <div className="col-4">
  //
  //             <PortfolioContainer stocks={this.state.portfolioStocks} removeStock={this.removeStock}/>
  //
  //           </div>
  //         </div>
  //     </div>
  //   );
  // }
