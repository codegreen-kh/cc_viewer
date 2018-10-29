import React from 'react';
import Item from "./Item";
import './NewsPage.sass';

export class NewsPage extends React.Component {
    constructor() {
        super();
        this.reqInfo = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        this.state = {
            data: []
        };
        this.styles = {
        backgroundColor: "white"
        }
    };

    getData = () => {
        fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', this.reqInfo)
            .then((res) => res.json())
            .then((data) => data.Data.map((item) => Object.assign({}, {id: item.id, title: item.title, body: item.body, imageurl: item.imageurl, url: item.url})))
            .then((data) => this.setState({data: data}));
    };

    componentDidMount() {
        this.getData();
    };

    render() {
        return(
            <div className="news">
                {this.state.data.map((item, i) => < Item data={item} key={item.id} iterator={i} />)}
            </div>
        );
    };
};