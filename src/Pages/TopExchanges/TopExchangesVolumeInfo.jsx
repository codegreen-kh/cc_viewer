import React from 'react';
import './TopExchangesVolumeInfo.sass'

export const TopExchangesVolumeInfo = ({data}) => {
    console.log (data);
    if (data.Response === 'Error') {
        return(
            <div className="topExchangesVolumeInfo__error">{data.Message}</div>
        );
    } else {
        return(
            <div className="topExchangesVolumeInfo">
                <p style={{color: "blue"}}>{data.VolSymbol}</p>
                <div className="topExchangesVolumeInfo__info">
                    {Object.keys(data.Data[0]).map((item) => <div style={{float: "left", width: "170px"}}>{item}</div>)}
                </div>
                <div>
                    {data.Data.map((item) => <div className = "topExchangesVolumeInfo__item" key={item.SYMBOL}>
                        {Object.values(item).map((i) => <div style={{float: "left", width: "170px"}}>{i}</div>)}
                    </div>)}
                </div>
            </div>
        );
    }
}