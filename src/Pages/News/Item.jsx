import React from 'react';
import LogWithProps from "../../HOC/LogWithProps";
import './Item.sass'

function Item ({data, styles, displayImg, displayBody, displayButton}) {

    console.log (displayBody);

    return(
        <div className="item" style={styles}>
            <h3 className="item__title">{data.title}</h3>
            <p className="item__body" style={{display: displayBody}}>{data.body.split(/\s+/).slice(0,80).join(" ") + '...'}</p>
            <a href={data.url} style={{display: displayImg}}><img src={data.imageurl} alt={data.title}/></a>
            <button className="item__readFull" style={{display: displayButton}}><a href={data.url}>read full</a></button>
        </div>
    );
};

export default LogWithProps(Item);