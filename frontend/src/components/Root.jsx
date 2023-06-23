import React from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { API_HOST } from "../config";
import SubscribeForm from "./SubscribeForm";
import UserTable from "./UserTable";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      sendingRequest: false,
      subscription: false,
      users: [],
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  changeName(e) {
    let name = e.target.value;
    this.setState({ name });
  }

  changeEmail(e) {
    let email = e.target.value;
    this.setState({ email });
  }

  subscribe() {
    const { name, email } = this.state;

    if (!name || !email) {
      toast.error("Please input both name and email!");
      return;
    }

    this.setState({ sendingRequest: true });

    Axios.post(`${API_HOST}/users`, { name, email })
      .then((res) => {
        if (res.data && res.data._id) {
          this.setState({
            subscription: true,
            name: "",
            email: "",
          });
          this.fetchUsers();
          toast.success("Subscription successful!");
        } else {
          toast.error("Subscription failed!");
        }
      })
      .catch((error) => {
        toast.error("An error occurred during subscription!");
        console.error(error);
      })
      .finally(() => {
        this.setState({ sendingRequest: false });
      });
  }

  fetchUsers() {
    Axios.get(`${API_HOST}/users`)
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        toast.error("An error occurred while fetching users!");
        console.error(error);
      });
  }

  deleteUser(userId) {
    Axios.delete(`${API_HOST}/users/${userId}`)
      .then(() => {
        this.fetchUsers();
        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the user!");
        console.error(error);
      });
  }

  editUser(userId, newName, newEmail) {
    Axios.put(`${API_HOST}/users/${userId}`, { name: newName, email: newEmail })
      .then(() => {
        this.fetchUsers();
        toast.success("User updated successfully!");
      })
      .catch((error) => {
        toast.error("An error occurred while updating the user!");
        console.error(error);
      });
  }

  render() {
    const { name, email, sendingRequest, subscription, users } = this.state;

    return (
      <div className="container">
        {subscription ? (
          <UserTable
            users={users}
            deleteUser={this.deleteUser}
            editUser={this.editUser}
          />
        ) : (
          <SubscribeForm
            name={name}
            email={email}
            changeName={this.changeName}
            changeEmail={this.changeEmail}
            subscribe={this.subscribe}
            sendingRequest={sendingRequest}
          />
        )}
      </div>
    );
  }
}

export default Root;
