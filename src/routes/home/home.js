import Directory from '../../component/directory/directory.component';
import { dataItem } from '../../DataItem';
import React, {Component} from 'react';
import { Outlet } from 'react-router';


class Home extends Component {

  constructor() {
    super();
    this.state = {
      dataItem: dataItem
    }
  }
  render(){
    return(
        <div>
            <Outlet  />
            <Directory categories={dataItem} />
        </div>
    );
  };
};

export default Home;