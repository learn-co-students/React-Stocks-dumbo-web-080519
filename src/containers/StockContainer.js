import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  renderStocks = () => {
    // const {stocks} = this.props
    return this.props.stocks.map(stock => {
      return <Stock
        stock={stock}
        key={`stock-${stock.id}`}
        addStock={this.props.addStock}/>
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.renderStocks()
          //render the list of stocks here
        }
      </div>
    );
  }

}

export default StockContainer;
