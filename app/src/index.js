import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FriendData from './friends.json'


class Friend extends React.Component {
  render() {
    const person = this.props.data;
    const message = this.props.data.statistics.message || 0;
    const call = Math.ceil((this.props.data.statistics.call || 0) / 60);
    return (
      <div className="ui segment">
        <h2 className="ui header">
          <i className="address card outline icon"></i>
          <div className="content">{person.name}</div>
        </h2>
        <div className="ui list">
          <div className="item">
            <i className="handshake icon"></i>
            <div className="content">
              <div className="header">Reputation: {person.reputation.toLocaleString()}</div>
            </div>
          </div>
          {person.rank > 0 &&
            <div className="item">
              <i className="trophy icon"></i>
              <div className="content">{person.rank} 번째로 평판이 높습니다.</div>
            </div>
          }
          {call > 0 &&
            <div className="item">
              <i className="call icon"></i>
              <div className="content">{call.toLocaleString()}분 통화를 했습니다.</div>
            </div>
          }
          {message > 0 &&
            <div className="item">
              <i className="talk icon"></i>
              <div className="content">{message.toLocaleString()} 메시지를 주고 받았습니다.</div>
            </div>
          }
        </div>
      </div>
    );
  }
}
Friend.propTypes = {
  data: PropTypes.object.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchName: '',
      friendDetail: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column"></div>
            <div className="ten wide column">
              <div className="ui hidden divider"></div>
              <h1 className="ui huge header">What's your <strong>name</strong>?</h1>
              <form className={this.state.isSearching ? 'ui huge loading form' : 'ui huge form'} onSubmit={this.handleSubmit}>
                <div className="field">
                  <div className="ui icon input">
                    <input type="text" value={this.state.searchName} onChange={this.handleInputChange} />
                    <i className="search icon"></i>
                  </div>
                </div>
                <button className="ui primary submit button">Submit</button>
              </form>

              <div className="ui hidden divider"></div>
              {this.state.friendDetail &&
                <Friend data={this.state.friendDetail} />
              }
              <div className="ui hidden divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="center aligned column">Copyright (c) 2017 sulhee.com. All rights reserved.</div>
          </div>
        </div>
      </div>
    );
  }


  handleInputChange(event) {
    this.setState({
      searchName: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.searchName.length < 1) return;

    this.setState({
      isSearching: true
    });

    const person = this.findByName(this.state.searchName);

    setTimeout(() => {
      this.setState({
        isSearching: false,
        friendDetail: person,
      });
    }, 1000);
  }

  findByName(name) {
    for (let friend of FriendData) {
      if (friend.name === name) {
        return friend;
      }
    }

    return {
      name: name,
      reputation: 0,
      rank: 0,
      statistics: {}
    };
  }
}


ReactDOM.render(<App />, document.getElementById('app'));