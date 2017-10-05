import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tab = ({ tab, path })=> {
  return (
    <li className={ path === tab.path ? 'active': null }>
      <Link to={ tab.path }>
        { tab.title }
        {
          tab.count === undefined ? null : ( <span> ({ tab.count })</span>)
        }
      </Link>
    </li>
  );
}

class Navbar extends Component {

  render() {
    const path = this.props.router.location.pathname;
    const cLen = this.props.tests.tests.length
    const tabs = [
      { title: 'Tests', path: '/tests', count: cLen }
    ];
    return (
      <ul className="nav nav-tabs mainnav" style={ { marginBottom: '10px' } }>
        {
          tabs.map( tab => <Tab key={ tab.path } tab={ tab } path={ path } />)
        }
      </ul>
    );
  }
}

function mapStateToProps (state, { router }) {
  const { tests } = state;
  return { tests, router };
}

export default connect(mapStateToProps)(Navbar);
