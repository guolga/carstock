import React, { Component } from 'react';
import SkyLight from 'react-skylight';


class Editcar extends Component {
    constructor(props){
        super(props);
        this.state={brand: this.props.car.brand, model: this.props.car.model, color: this.props.car.color, year: this.props.car.year, price: this.props.car.price, fuel: this.props.car.fuel};
    }
    

    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newCar = {brand: this.state.brand, model: this.state.model, color: this.state.color, year: this.state.year, price: this.state.price, fuel: this.state.fuel}
        this.props.updateCar(this.props.link,newCar);
        this.animated.hide();
    }


    render() {
        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked ref={ref => this.animated = ref}
                    title="Edit car" transitionDuration={5000}>
                    <form>
                        <div className="form-group">
                        <input placeholder="Brand" value={this.state.brand} className="form-control" name="brand" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Model" value={this.state.model} className="form-control" name="model" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Color" value={this.state.color} className="form-control" name="color" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Year" value={this.state.year} className="form-control" name="year" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Price" value={this.state.price} className="form-control" name="price" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Fuel" value={this.state.fule} className="form-control" name="fuel" onChange={this.handleChange}/>
                        </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                        </form>
        </SkyLight>
        <button className="btn btn-default btn-link" onClick={() => this.animated.show()}>Edit car </button>
            </div>
        );
    };
}

export default Editcar;