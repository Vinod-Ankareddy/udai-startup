import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Card from "./Card";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const langCode = "en";
    const LocalStrings = require(`../localStrings/${langCode}`);

    const userDetails = useSelector(store => store.user.items);
    const [userSpecficDetails, setUserSpecficDetails] = useState(userDetails[0]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userSpecficDetails) {
            navigate("/");
        }
    }, []);

    return (
        <div className="">
            <div className="">
                <Header userFullName={userSpecficDetails?.firstName + " " + userSpecficDetails?.lastName} />
            </div>            
            <div className="">
                <Card aadharNumber={userSpecficDetails?.aadhaarId} />
            </div>
        </div>
    )
}

export default Dashboard;