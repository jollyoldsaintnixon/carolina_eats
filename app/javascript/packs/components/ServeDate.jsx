import React from "react";

export default function ServeDate({location, time, date}) {
    return (
        <div className={"serve-date-div"}>
            Served next at <div className={"serve-date-location"}>{location}</div> at <div className="serve-date-time-date">{time} {date}</div>
        </div>
    )
}