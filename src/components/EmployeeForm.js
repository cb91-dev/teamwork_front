import React, { useState } from "react";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees_idNumber: this.props.employees_idNumber,
      firstName: props.firstName,
      department: props.department,
      clock_Number: props.clock_Number,
      phone_number: props.phone_number,
      is_manager: props.is_manager,
      lastName: props.lastName,
      dateOfBirth: props.dateOfBirth,
      email: props.email,
      closer: props.closer
    };

    this.employeeIdHandler = this.employeeIdHandler.bind(this);
    this.firstNameUpdateChangeHandler = this.firstNameUpdateChangeHandler.bind(this);
    this.lastNameUpdateChangeHandler = this.lastNameUpdateChangeHandler.bind(this);
    this.dateUpdateChangeHandler = this.dateUpdateChangeHandler.bind(this);
    this.emailUpdateChangeHandler = this.emailUpdateChangeHandler.bind(this);
    this.phoneNumberUpdateChangeHandler = this.phoneNumberUpdateChangeHandler.bind(this);
    this.clockNumberUpdateChangeHandler = this.clockNumberUpdateChangeHandler.bind(this);
    this.departmentUpdateChangeHandler = this.departmentUpdateChangeHandler.bind(this);
    this.is_managerUpdateChangeHandler = this.is_managerUpdateChangeHandler.bind(this);
    this.updateMyDetailsViewForm = this.updateMyDetailsViewForm.bind(this);
  }


  employeeIdHandler(event) {
    this.setState({
      employees_idNumber: event.target.value,
    });
    console.log(1);
  };

  firstNameUpdateChangeHandler(event) {
    this.setState({
      firstName: event.target.value,
    });
  };

  lastNameUpdateChangeHandler(event) {
    this.setState({
      lastName: event.target.lastName,
    });
    console.log(3);
  };

  dateUpdateChangeHandler(event) {
    this.setState({
      dateOfBirth: event.target.dateOfBirth,
    });
    console.log(4);
  };

  emailUpdateChangeHandler(event) {
    this.setState({
      email: event.target.email,
    });
  };

  phoneNumberUpdateChangeHandler(event) {
    this.setState({
      phone_number: event.target.phone_number,
    });
  };

  clockNumberUpdateChangeHandler(event) {
    this.setState({
      clock_Number: event.target.value,
    });
  }

  departmentUpdateChangeHandler(event) {
    this.setState({
      department: event.target.value,
    });
  };

  is_managerUpdateChangeHandler(event) {
    this.setState({
      is_manager: event.target.value,
    });
  };

   updateMyDetailsViewForm(evt) {
    const updatedEmployeeData = {
      employees_idNumber: this.state.employees_idNumber,
      firstName: this.state.firstName,
      department: this.state.department,
      clockInNum: this.state.clock_Number,
      phone_number: this.state.phone_number,
      is_manager: this.state.is_manager,
      lastName: this.state.lastName,
      DOB: this.state.dateOfBirth,
      email: this.state.email
    };
    console.log(updatedEmployeeData);
    evt.preventDefault(evt);
    var url = "http://localhost:8888/api/api.php?action=upDateEmployee";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(updatedEmployeeData),
      credentials: "include",
    }).then(function (headers) {
      if (headers.status === 201) {
        // this.showAlert("success", "Employee added");
        // this.closer();
      }
      if (headers.status === 401) {
        // this.showAlert("error", "This action didn't work");
        // this.closer();
      }
      if (headers.status === 429) {
        // this.showAlert("error", "This action didn't work");
        // this.closer();
      }
      if (headers.status === 500) {
        // this.showAlert("error", "This action didn't work");
        // this.closer();
      }
    });
  }

  render() {
    return (
    <div>
      <section className="modal-card-body">
        <form>
          <div className="field">
            <label className="label">Employee Id</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.employees_idNumber}
                  id={this.id}
                  name="employees_idNumber"
                  type="text"
                  onChange={this.employeeIdHandler}
                  className="is-size-3"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.state.firstName}
                  onChange={this.firstNameUpdateChangeHandler}
                  id="first_name_admin_view"
                  className="input is-link"
                  type="text"
                  placeholder="Employees first name"
                  name="firstName"
                  required
                  pattern="\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Last Name</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.state.lastName}
                  onChange={this.lastNameUpdateChangeHandler}
                  id="last_name_admin_view"
                  className="input is-link"
                  type="text"
                  placeholder="Employees last name"
                  name="lastName"
                  required
                  pattern="\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Date of Birth</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.state.dateOfBirth}
                  onChange={this.dateUpdateChangeHandler}
                  id="dataOfBirth_admin_view"
                  className="input is-link"
                  type="date"
                  name="DOB"
                  min="1970-01-01"
                  max="2021-12-31"
                  data-bouncer-message="Valid date range is from 1960 till current"
                  required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.state.email}
                  onChange={this.emailUpdateChangeHandler}
                  className="input is-link"
                  id="email_admin_view"
                  type="email"
                  name="email"
                  required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.state.phone_number}
                  onChange={this.phoneNumberUpdateChangeHandler}
                  id="phone_number_admin_view"
                  className="input is-link"
                  type="number"
                  name="phone_number"
                  pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$"
                  data-bouncer-message="Please use only Australian domestic numbers"
                  required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-phone"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Clock On Number</label>
            <div className="control has-icons-left has-icons-right">
              <input
                  defaultValue={this.state.clock_Number}
                  onChange={this.clockNumberUpdateChangeHandler}
                  className="input is-link"
                  id="clock_Number_admin_view"
                  type="number"
                  data-bouncer-message="Clock number needs to be 4 digits in length"
                  name="clockInNum"
                  required
                  maxLength="4"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Department</label>
            <div className="control">
              <div className="select">
                <select
                    onChange={this.departmentUpdateChangeHandler}
                    defaultValue={this.state.department}
                    id="department_admin_view"
                    name="department"
                >
                  <option disabled value="DEFAULT">
                    {" "}
                    -- select a department --{" "}
                  </option>
                  <option value="Front_Counter">Front Counter</option>
                  <option value="Fresh_Produce">Fresh Produce</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Deli">Deli</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Are they a manager</label>
            <div className="control">
              <div className="select">
                <select
                    onChange={this.is_managerUpdateChangeHandler}
                    defaultValue={this.state.is_manager}
                    id="manager_admin_view"
                    name="is_manager"
                >
                  {" "}
                  <option value="DEFAULT" disabled>
                    {" "}
                    -- please select --{" "}
                  </option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </div>
          <button onClick={this.updateMyDetailsViewForm} className="button is-link">
            Save changes
          </button>
        </form>
      </section>
    </div>)
  };
}

export default EmployeeForm;
