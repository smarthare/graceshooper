import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gotSingleTest, updateTest } from '../actions';

class Test extends Component {
  constructor() {
    super();
    this.state = { id: 0, name: '', errorAdd: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    const id = this.props.router.match.params.id;
    this.props.gotSingleTest(id)
    .then(() => {
      this.setState({
        id: this.props.selectedTest.id,
        name: this.props.selectedTest.name,
        errorAdd: ''
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    //there is also: currentProps
    if (!nextProps.selectedTest.id) return;
    this.setState({
      id: nextProps.selectedTest.id,
      name: nextProps.selectedTest.name,
      errorAdd: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      const testChg = this.state;
      testChg.photo = this.props.selectedTest.photo;
      this.props.updateTest(testChg);
    } else {
      this.setState({ errorAdd: 'Name cannot be blank', name: this.state.test.name });
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
    }
  }

  render() {
    if (!this.props.selectedTest.id) return <div></div>;
    const test = this.props.selectedTest;
    return (
      <div>
        <div>
          <h6 className="nomarginTop text-muted">page: /single-test</h6>
          <h4>Single Test Maintenance: <span className="textBlue">{ test.name }</span></h4>
        </div>
        <div className="col-sm-4 margintop">
          <div className="row">
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Test Details</h5>
              <form onSubmit={ this.handleSubmit }>
                <div className="margintop">
                  <label>Name: </label>
                  <input
                    name="name"
                    onChange={ this.handleInput }
                    value={ this.state.name }
                    className="setWidth tabrightsm"
                    type="text">
                  </input>
                </div>
                <button className="btn btn-primary margintop marginbelow" type="submit">Update Campus</button>
                <div className="center textRed marginbelow">{ this.state.errorAdd }</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, { router }) {
  const selectedTest = state.tests.selectedTest;
  return { selectedTest, router };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gotSingleTest, updateTest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
