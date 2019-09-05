import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'
import ImageResults from '../image-results/ImageResults'

export default class Search extends Component {
    state = {
        searchText: '',
        amount: 12,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '13501015-c4eaab7429c6b95f9fd7f3148',
        images: []
    }
    onTextChange = e => {
        const val = e.target.value
        this.setState({[e.target.name]: val}, () => {
            if(val === '') {
                this.setState({images: []});
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image-type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images: res.data.hits}))
                .catch(err => console.log(err));    
            }});
    }
    onAmountChange = (e, index, value) => {
        this.setState({amount: value})
    }
    render() {
        return (
            <div>
                <TextField
                name = "searchText"
                value = {this.state.searchText}
                onChange={this.onTextChange}
                floatingLabelText="Search for Images"
                fullWidth={true}
                />
                <br/>
                <SelectField
                name="amount"
                floatingLabelText="amount"
                value={this.state.amount}
                onChange={this.onAmountChange}>
                <MenuItem value={3} primaryText="3"/>
                <MenuItem value={6} primaryText="6"/>
                <MenuItem value={12} primaryText="12"/>
                <MenuItem value={24} primaryText="24"/>
                <MenuItem value={48} primaryText="48"/>
                </SelectField>
                <br />
                { this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null }
            </div>
        )
    }
}
