import React, { Component } from 'react';
import SkyLight from 'react-skylight';


class Addcar extends Component {
    constructor(props){
        super(props);
        this.state={brand: '', model: '', color: '', year: '', price: '', fuel: ''};
    }
    

    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newCar = {brand: this.state.brand, model: this.state.model, color: this.state.color, year: this.state.year, price: this.state.price, fuel: this.state.fuel}
        this.props.addCar(newCar);
        this.animated.hide();
    }


    render() {
        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked ref={ref => this.animated = ref}
                    title="Add car" transitionDuration={5000}>
                    <form>
                        <div className="form-group">
                        <input placeholder="Brand" className="form-control" name="brand" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Model" className="form-control" name="model" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Color" className="form-control" name="color" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Year" className="form-control" name="year" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Price" className="form-control" name="price" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Fuel" className="form-control" name="fuel" onChange={this.handleChange}/>
                        </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                        </form>
        </SkyLight>
        <button style={{margin:10}} className="btn btn-primary" onClick={() => this.animated.show()}>Add car </button>
            </div>
        );
    };
}

export default Addcar;