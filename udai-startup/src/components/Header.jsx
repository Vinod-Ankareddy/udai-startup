import { useNavigate } from "react-router-dom";
import { 
    header, headerTitle, headerSubTitle
} from "../assets/styles/tailwind-default";

const Header = ({ userFullName }) => {
    const langCode = "en";
    const LocalStrings = require(`../localStrings/${langCode}`);
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem("userDetails");
        navigate("/");
    }

    return (
        <div className={header}>
            <div className="">
                <div className={headerTitle}>{`${LocalStrings.headerTitle}, ${userFullName}`}</div>
                <div className={headerSubTitle}>{LocalStrings.headerSubTitle}</div>
            </div>
            <div className="">
                <button onClick={handleSignout}>{LocalStrings.signOut}</button>
            </div>
        </div>
    )
}

export default Header;