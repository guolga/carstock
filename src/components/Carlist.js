import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Addcar from './Addcar.js';
import Editcar from './Editcar';
import {CSVLink, CSVDownload} from 'react-csv';


class Carlist extends Component {
    constructor(props) {
        super(props);

        this.state = { cars: [] };

    }

    componentDidMount() {
        this.loadCars();
    }


    //Load card from REST API
    loadCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(res => res.json())
            .then(resData => {
                this.setState({ cars: resData._embedded.cars });
            })
    }

    //Delete car
    onDelClick = (idLink) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(idLink, { method: 'DELETE' })
                            .then(res => this.loadCars())
                            .catch(err => console.error(err))
                        toast.success("Delete succeed", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                    }
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    //Add car 
    addCar = (newCar) => {
        fetch('https://carstockrest.herokuapp.com/cars', { 
            method: 'POST', 
            headers : {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newCar)
        })
        .then(res => this.loadCars())
        .catch(err => console.error(err))
    }

//Edit car
    updateCar = (link, car) => {
        fetch(link, { 
            method: 'PUT', 
            headers : {'Content-Type': 'application/json'}, 
            body: JSON.stringify(car)
        })
        .then(res => this.loadCars())
        .catch(err => console.error(err))
    }

    render() {

        return (
            <div className='container'>
                <h2>My Cars</h2>
                <div className="row">
                    <Addcar addCar={this.addCar}/>
                    <CSVLink data={this.state.cars} style={{margin:15}}>Download CSV</CSVLink>
                </div>
                <ReactTable
                    data={this.state.cars}
                    filterable

                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Brand",
                                    accessor: "brand"
                                },
                                {
                                    Header: "Model",
                                    accessor: "model"
                                },
                                {
                                    Header: "Color",
                                    accessor: "color"
                                },
                                {
                                    Header: "Fuel",
                                    accessor: "fuel"
                                },
                                {
                                    Header: "Year",
                                    accessor: "year"
                                },
                                {
                                    Header: "Price",
                                    accessor: "price"
                                },
                                {
                                    id: 'button',
                                    sortable: false,
                                    Header: "",
                                    accessor: "_links.self.href",
                                    filterable: false,
                                    Cell: ({ value }) => (<button className="btn btn-default btn-link" onClick={() => { this.onDelClick(value) }}>Delete</button>)
                                },
                                {
                                    id: 'button',
                                    sortable: false,
                                    Header: "",
                                    accessor: "_links.self.href",
                                    filterable: false,                                    Cell: ({ row, value }) => (<Editcar updateCar={this.updateCar} link={value} car={row} />)
                                }
                            ]
                        },

                    ]}
                    defaultPageSize={20}
                    style={{
                        height: "600px"
                    }}
                    className="-striped -highlight"
                />
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}


export default Carlist;
