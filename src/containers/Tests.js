import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { addTest, removeTest, fetchData } from '../actions';

class Tests extends Component {
  constructor() {
    super();
    this.state = { name: '', selectTest: 0, errorAdd: '', errorRemove: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({
      name: '',
      selectTest: 0,
      errorAdd: '',
      errorRemove: '',
    })
  }

  componentDidMount() {
    this.clearState();
    this.props.fetchData();
  }

  componentWillReceiveProps() {
    this.clearState();
  }

  handleRemove(event) {
    event.preventDefault();
    if (this.state.selectTest) {
      this.props.removeTest(this.state.selectTest);
    } else {
      this.setState({ errorRemove: 'Test Selecting is required for Remove', errorAdd: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.addTest(this.state)
      this.clearState();
    } else {
      this.setState({ errorAdd: 'The name field is required', errorRemove: '' });
    }
  }

  handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'name':
        this.setState({ name: value });
        break;
      case 'phone':
        this.setState({ phone: value });
        break;
      case 'selectTest':
        this.setState({ selectTest: value })
        break;
    }
  }

  render() {
    const tests = this.props.tests.tests;
    
    if (!tests.length) return <div></div>;
    const none = [{ id: '0', name: '--none--' }];
    let testsSelect = none.concat(tests);
    return (
      <div className="container-fluid">
        <h6 className="nomarginTop text-muted">page: /tests</h6>
        <h4>Overall Test Maintenance</h4>
        <div className="col-sm-4 margintop">
          <div className="row">
            {
              tests.map(test => {
                return (
                  <div className="col-sm-12" key={ test.id }>
                    <Link to={ `/tests/${ test.id }` }>
                      <h5>{ test.name }</h5>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-sm-4 margintop">
          <div className="row">
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Add Test</h5>
              <form onSubmit={ this.handleSubmit }>
                <div className="margintop">
                  <label>Name: </label>
                  <input
                    name="name"
                    value={ this.state.name }
                    onChange={ this.handleInput }
                    className="setWidth tabrightsm"
                    type="text">
                  </input>
                </div>
                <button className="btn btn-primary margintop marginbelow" type="submit">Add Test</button>
                <div className="center textRed marginbelow">{ this.state.errorAdd }</div>
              </form>
            </div>
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Remove Test</h5>
              <form onSubmit={ this.handleRemove }>
                <label className="margintop">Select a Test</label>
                <select
                  className="form-control margintop"
                  value={ this.state.selectTest }
                  onChange={ this.handleInput }
                  name="selectTest"
                >
                  {
                    testsSelect.map(test => {
                      return (
                        <option key={ test.id } value={ test.id  }>
                          {test.name}
                        </option>
                      )
                    })
                  }
                </select>
                <button className="btn btn-danger margintop marginbelow" >Remove Test</button>
                <div className="center textRed marginbelow">{ this.state.errorRemove }</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { tests } = state;
  return { tests };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addTest, removeTest, fetchData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests);
