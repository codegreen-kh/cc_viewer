import React from 'react';
import Item from "./Item";
import './NewsPage.sass';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';

export class NewsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            total: 0,
            page: 1
        };
        this.styles = {
        backgroundColor: "white"
        }
    };

    getData = () => {
        fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
            .then((res) => res.json())
            .then((data) => data.Data.map((item) => Object.assign({}, {id: item.id, title: item.title, body: item.body, imageurl: item.imageurl, url: item.url})))
            .then((data) => {
                this.setState({total: data.length});
                return data;
            })
            .then((data) => this.dataForPagination(data));
    };

    dataForPagination = (data) => {
        let results = [];
        while (data.length) {
            results.push(data.splice(0, 10));
        }
        console.log (results);
        this.setState({data: results});
    };

    paginationOnChange = (page) => {
        console.log (page);
        this.setState({page: page});
    };

    componentDidMount() {
        this.getData();
    };

    render() {
        return(
            <div className="news">
                {this.state.data.length > 0 ? this.state.data[this.state.page - 1].map((item, i) => < Item data={item} key={item.id} iterator={i} />) : null}
                <div className="news__pagination" style={{float: "left", width: "1024px"}}>
                    <Pagination onChange={this.paginationOnChange} defaultCurrent={1} total={this.state.total} />
                </div>
            </div>
        );
    };
};