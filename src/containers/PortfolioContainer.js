import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    // console.log(this.props.stockItem)
    return (
      <div>
        <h2>My Portfolio</h2>
        {
            // render the list of stocks here, do map here(always return the value), send props to Stock Component

            this.props.stockItem.map(stock => {
              return <Stock stock={stock} key={stock.id} handleClick={this.props.handleClick}/>
            })
        }
      </div>
    );
  }

}

export default PortfolioContainer;
