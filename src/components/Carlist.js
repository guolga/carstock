import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Carlist extends Component {
    constructor(props) {
        super(props);

        this.state = { cars: [] };

    }

    componentDidMount() {
        this.loadCars();
    }


    deleteCar = (value) => {
        fetch(value, { method: 'DELETE' })
            .then(res => {
            this.loadCars();
            toast.success("Car Successfully Deleted!", {
                position: toast.POSITION.TOP_RIGHT});
    })}

    loadCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(res => res.json())
            .then(resData => {
                this.setState({ cars: resData._embedded.cars });
            })
    }

    render() {

        return (
            <div className='container'>
                <h2>My Cars</h2>
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
                                    Header: "",
                                    accessor: "_links.self.href",
                                    filterable: false,
                                    Cell: ({ value }) => (<button type="button" class="btn btn-danger" onClick={() => {this.deleteCar(value)}}>Delete</button>)
                                },
                            ]
                        },

                    ]}
                    defaultPageSize={20}
                    style={{
                        height: "600px"
                    }}
                    className="-striped -highlight"
                />
                   <ToastContainer autoClose={1500}/>
            </div>
        );
    }
}


export default Carlist;
