import React, {Component} from 'react';
import axios from 'axios';
import token from "../token";
import './list.css';

export default class List extends Component {

    constructor(props)
    {
        super(props);
        this.state = {};
        this.state.posts = [];
        this.state.renderedPosts = [];
    }

    componentWillMount()
    {
        axios
            .get("http://localhost:9000/appointments", {
            headers: {
                Authorization: "Bearer " + token()
            }
        })
            .then((response) => {
                if(response.data.data && response.data.data.appointments.length > 0)
                    {
                        this.setState({posts: response.data.data.appointments})
                    } 
            });
    }

    confirmBooking = (post) => {

        const user = JSON.parse(window.sessionStorage.getItem("user"));
        axios
            .post(`http://localhost:9000/appointments/book/${post._id}`, {
            _format : "json",
            data : {
                users : JSON.stringify(user.user)
            },
            headers: {
                Authorization: "Bearer " + token()
            }
        })
            .then((response) => {
                if(response.data.data && response.data.data.appointments.length > 0)
                    {
                        this.setState({posts: response.data.data.appointments})
                    } 
            });
    }

    bookingButton = (post) => {
        return <button
            onClick={() => {
            this.confirmBooking(post);
        }}
            className="btn btn-success">Book Appointment</button>
    }

    postListing = (list) => {
        return list.map((post) => {
            return <div className="posting-block">
                <div className="row">
                    <div className="col-md-1 col-sm-1"><img
                        src={`http://placehold.it/430x430&text=${post.name}`}
                        className="img-responsive img-circle"/></div>
                    <div className="col-md-11 col-sm-11 posting-content">
                        <h3>{`${post.first_name} ${post.last_name}`}</h3>
                        <p>{post.description}</p>
                        {this.bookingButton(post)}
                    </div>
                </div>
            </div>
        })

    }

    render() {
        return <div className="container">
            <div className="row">
                <h2>Appointments</h2>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {this.state.posts.length > 0 && this.postListing(this.state.posts)}
                </div>
            </div>
        </div>
    }
}