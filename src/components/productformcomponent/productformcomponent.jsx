import React, { Component } from 'react'
import { Catergories, Manufacturers } from './../../models/constants';
import { Logic } from '././../../models/logic';
import DropDownComponent from './../reusablecoponents/dropdowncomponent';
class ProductFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductId: 0,
            ProductName: '',
            CategoryName: '',
            Manufacturer: '',
            Price: 0,
            categories: Catergories,
            manufacturers: Manufacturers,
            products: [],
            columnHeaders: [],
            IsProductid: true,
            IsProductname: true,
            IsPriceValid: true,
            IsCategoryValid: true,
            IsManufacturerValid: true,
            IsIdMandatory:true,
            IsMandatory:true,
            IsPriceMandatory:true,
            IsFormValid: true
        }
        this.logic = new Logic();
    }


    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        this.validateForm(evt.target.name, evt.target.value);
    }

    validateForm(name, value) {
        if (name === "ProductId") {
            let prds = this.logic.getProducts();
            let index = prds.findIndex(prditem => prditem.ProductId == value);
            if (index > 0) {
                this.setState({ IsProductid: false });
                this.setState({ IsFormValid: false });
                this.setState({IsIdMandatory : true });
            }
            else {
                this.setState({ IsProductid: true });
                this.setState({ IsFormValid: true });
                this.setState({IsIdMandatory : true });
            }
        }
        if (name === "ProductName") {
            if (value == '')
            {
                this.setState({IsMandatory : true });
                this.setState({ IsFormValid: false });  
                this.setState({ IsProductname: true });
            }
            else 
            if (!/[A-Z]/.test(value[0])) {
                this.setState({ IsProductname: false });
                this.setState({ IsFormValid: false });  
                this.setState({IsMandatory : true })              
            }
            else {
                this.setState({ IsMandatory: true});
                this.setState({ IsProductname: true });
                this.setState({ IsFormValid: true });
            }
        }
        if (name === "Price") {
            if(value == '') {
                this.setState({IsPriceMandatory : true });
                this.setState({ IsFormValid: false });  
                this.setState({ IsPriceValid: true });
            }else
            if (this.state.CategoryName === "Electronics") {
                if (value < 2000) {
                    this.setState({ IsPriceValid: false });
                    this.setState({ IsFormValid: false });
                } else {
                    this.setState({ IsPriceValid: true });
                    this.setState({ IsFormValid: true });
                }
            }
        }
        if (name === "CategoryName") {
            if (value === "Select Data") {
                this.setState({ IsCategoryValid: false });
                this.setState({ IsFormValid: false });
            }
            else {
                this.setState({ IsCategoryValid: true });
                this.setState({ IsFormValid: true });
            }
        }
        if (name === "Manufacturer") {
            if (value === "Select Data") {
                this.setState({ IsManufacturerValid: false });
                this.setState({ IsFormValid: false });
            }
            else {
                this.setState({ IsManufacturerValid: true });
                this.setState({ IsFormValid: true });
            }
        }        
    }

    validateSave(name, value) {
        if (name === "ProductId") {
            if (this.state.ProductId == '')
            {
                this.setState({IsIdMandatory : false });
                this.setState({ IsFormValid: false });  
                this.setState({ IsProductid: true });
            }            
            else {
                this.setState({ IsIdMandatory: true});
                this.setState({ IsProductid: true });
                this.setState({ IsFormValid: true });
            }
        }
        if (name === "ProductName") {
            if (this.state.ProductName == '')
            {
                this.setState({IsMandatory : false });
                this.setState({ IsFormValid: false });  
                this.setState({ IsProductname: true });
            }            
            else {
                this.setState({ IsMandatory: true});
                this.setState({ IsProductname: true });
                this.setState({ IsFormValid: true });
            }
        }

    }

    // the lifecycle method of component that will be executed 
    // after the render() method is completing its 
    // execution
    componentDidMount = () => {
        let prds = this.logic.getProducts();

        // read first record from array and read its schema
        var firstRecord = prds[0];
        var recProperties = Object.keys(firstRecord);
        // iterate over the properties and add in colunHeaders

        this.setState({ columnHeaders: recProperties }, () => {

        });
        // async method will executes before
        // the product is completely excuted
        // to wait for products to update
        // add a callback to setState
        this.setState({ products: prds }, () => {
            console.log(JSON.stringify(this.state.products));
        });

    }
    handleChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value }, () => { });
        this.handleChange(evt.target.value);
    }
    clear = () => {
        this.setState({ ProductId: 0 });
        this.setState({ ProductName: '' });
        this.setState({ CategoryName: '' });
        this.setState({ Manufacturer: '' });
        this.setState({ Price: 0 });
    }
    getSelectedCategory = (val) => {
        this.setState({ CategoryName: val }, () => { });
        this.validateForm("CategoryName", val);
    }
    getSelectedManufacturer = (val) => {
        this.setState({ Manufacturer: val }, () => { });
        this.validateForm("Manufacturer", val);
    }
    save = (val) => {
        if(this.state.ProductName == '')
        {
            this.validateSave("ProductName", this.state.ProductName);
            return;
        }
        if (this.state.ProductId == '') 
        {
            this.validateSave("ProductId", this.state.ProductId);
            return;
        }
        if (this.state.Price == '') 
        {
            this.validateSave("Price", this.state.Price);
            return;
        }
        if (!this.state.IsManufacturerValid || !this.state.IsCategoryValid) 
        {
            return;
        }
        if (!this.state.IsCategoryValid) 
        {
            this.validateSave("CategoryName", this.state.CategoryName);
            return;
        }
        // to read product values and update it in products array
        var prd = {
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            CategoryName: this.state.CategoryName,
            Manufacturer: this.state.Manufacturer,
            Price: this.state.Price
        };
        let prds = this.logic.addProduct(prd);
        this.setState({ products: prds }, () => {
            console.log(JSON.stringify(this.state.products));
        });
        /*this.setState({ ProductId: this.state.ProductId });
        this.setState({ ProductName: this.state.ProductName });*/        
   }
    handleDelete = (productIdx) => {
        this.logic.removeProduct(productIdx);
        let prds = this.logic.getProducts();
        this.setState({ products: prds }, () => {
            console.log(JSON.stringify(this.state.products));
        });
    }
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label>Product Id</label>
                        <input type="text" value={this.state.ProductId}
                            name="ProductId"
                            className="form-control" onChange={this.handleChange.bind(this)} />
                           <div input type="label" value="*" style = {{fontSize:17,color:"darkred"}}>                        
                        </div>
                        <div className="alert alert-danger" style = {{fontSize:12, color:"red"}}
                            hidden={this.state.IsProductid}>
                            product ID should be unique
                        </div>  
                        <div className="alert alert-danger" className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}}                  
                            hidden={this.state.IsIdMandatory}>
                            *
                        </div>                       
                    </div>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" value={this.state.ProductName}
                            name="ProductName"
                            className="form-control" onChange={this.handleChange.bind(this)} />
                        <div input type="label" value="*" style = {{fontSize:17,color:"darkred"}}>                        
                        </div>
                        <div className="alert alert-danger" className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}}                  
                            hidden={this.state.IsProductname}>
                            Product name first letter should be Uppercase
                        </div>
                        <div className="alert alert-danger" className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}}                  
                            hidden={this.state.IsMandatory}>
                            *
                        </div>                                             
                    </div>
                    <div className="form-group">
                        <label>Category Name</label>
                        <DropDownComponent data={this.state.CategoryName}
                            dataSource={this.state.categories}
                            selectedValue={this.getSelectedCategory.bind(this)}
                        ></DropDownComponent>
                        {/*  <select type="text" value={this.state.CategoryName} 
                    name="CategoryName"
                    className="form-control" onChange={this.handleChanges.bind(this)}>
                      {
                          this.state.categories.map((cat,idx)=> (
                              <option key={idx}>{cat}</option>
                          ))
                      }
                    </select>*/}
                        <div className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}} 
                            hidden={this.state.IsCategoryValid}>
                            Category name should be selected
                      </div>

                    </div>
                    <div className="form-group">
                        <label>Manufacturer Name</label>
                        <DropDownComponent data={this.state.Manufacturer}
                            dataSource={this.state.manufacturers}
                            selectedValue={this.getSelectedManufacturer.bind(this)}
                        ></DropDownComponent>
                        {/* <select type="text" value={this.state.Manufacturer} 
                    name="Manufacturer"
                    className="form-control" onChange={this.handleChanges.bind(this)}>
                    {
                        this.state.manufacturers.map((man,idx)=> (
                            <option key={idx}>{man}</option>
                        ))
                    }
                </select> */}
                        <div className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}} 
                            hidden={this.state.IsManufacturerValid}>
                            Manufacturer should  be selected
                      </div>

                    </div>
                    <div className="form-group">
                        <label>Base Price</label>
                        <input type="text" value={this.state.Price}
                            name="Price"
                            className="form-control" onChange={this.handleChange.bind(this)} />
                        <div className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}} 
                            hidden={this.state.IsPriceValid}>
                            Enter valid price
                        </div>
                        <div className="alert alert-danger" className="alert alert-danger" style = {{fontSize:12, color:"red", background:"white", borderBlockColor:"white"}}                  
                            hidden={this.state.IsPriceMandatory}>
                            *
                        </div> 
                    </div>
                    <div className="form-group">
                        <input type="button" value="Clear" className="btn btn-warning"
                            onClick={this.clear.bind(this)} />
                        <input type="button" value="Save" className="btn btn-success" 
                            onClick={this.save.bind(this)} disabled={!this.state.IsFormValid} />                                                   
                    </div>
                </form>
                <br />
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            {
                                this.state.columnHeaders.map((col, idx) => (
                                    <th key={idx}>{col}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((prd, idx) => (
                                <tr key={idx}>
                                    {
                                        this.state.columnHeaders.map((col, i) => (
                                            <td key={i}>{prd[col]}</td>
                                        ))
                                    }
                                    <td>
                                        <input type="Button" value="Delete"
                                            onClick={() => this.handleDelete(idx)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/* <table className="table table-bordered table-striped table-dark">
                 <thead>
                   <tr>
                     <th>
                       Product Id
                     </th>
                     <th>
                     Product Name
                   </th>
                   </tr>
                 </thead>
                 <tbody>
                 {
                     this.state.products.map((prd,idx) => (
                        <tr key={idx}>
                        <td>{prd.ProductId}</td>
                        <td>{prd.ProductName}</td>
                      </tr> 
                     ))
                 }
                   
                 </tbody>
              </table>*/}
            </div>
        );
    }
}

export default ProductFormComponent;