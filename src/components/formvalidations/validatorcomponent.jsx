import React, { Component } from 'react';
class ValidatorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PersonId: 0,
            PersonName: '',
            IsPersonIdValid: true,
            IsPersonNameValid: true,
            IsCapitalValid: true,
            IsFormValid: false
        };
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        this.validateForm(evt.target.name, evt.target.value);
    }
    /*const input = event.target;
  //const start = input.selectionStart;
 // const end = input.selectionEnd;
  this.setState(
    {value: input.value.toUpperCase()},
    () => input.setSelectionRange(start)
  );*/

    validateForm(name, value) {
        if (name === "PersonId") {
            if (parseInt(value) < 0 || value.length > 5) {
                this.setState({ IsPersonIdValid: false });
                this.setState({ IsFormValid: false });
            } else {
                this.setState({ IsPersonIdValid: true });
                this.setState({ IsFormValid: true });
            }
        }
        if (name === "PersonName") {
            if (value === '' || value.length > 20 )//|| value[0] !== value[0].toUpperCase()) 
            {
                this.setState({ IsPersonNameValid: false });
                this.setState({ IsFormValid: false });
                //this.setState({ IsCapitalValid: false });
            }
            else if (value[0] !== value[0].toUpperCase()) {
                this.setState({ IsCapitalValid: false });
               // this.setState({ IsPersonNameValid: false });
                this.setState({ IsFormValid: false });
            }
            else {
                this.setState({ IsPersonNameValid: true });
                this.setState({ IsFormValid: true });
            }
        }
    }
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label>PersonId</label>
                        <input type="text" name="PersonId" className="form-control"
                            value={this.state.PersonId}
                            onChange={this.handleChange.bind(this)}
                        />
                        <div className="alert alert-danger"
                            hidden={this.state.IsPersonIdValid}>
                            PersonId is must and must be less that 5 digits
                      </div>
                    </div>
                    <div className="form-group">
                        <label>PersonName</label>
                        <input type="text" name="PersonName"
                            className="form-control" value={this.state.PersonName}
                            onChange={this.handleChange.bind(this)}
                        />
                        <div className="alert alert-danger"
                            hidden={this.state.IsPersonNameValid}>
                            PersonName is must and must be less that 20 characters
                        </div>
                            <div className="alert alert-danger"
                                hidden={this.state.IsCapitalValid}>
                                PersonName should start with a uppercase letter
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="button" value="Save" disabled={!this.state.IsFormValid} className="btn btn-success" />
                    </div>
                </form>
            </div>
        );
    }
}

export default ValidatorComponent;