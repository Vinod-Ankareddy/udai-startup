import { useEffect, useState } from "react";
import AAdhaarIcon from "../assets/icons/Aadhaar_Logo.svg.png";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

const Card = ({aadharNumber}) => {
    const langCode = "en";
    const LocalStrings = require(`../localStrings/${langCode}`);

    let actualAadhaarId = aadharNumber;
    const [showReveal, setShowReveal] = useState(false);
    const [cardNumber, setCardNumber] = useState(null);
    const [maskedCardNumber, setmaskedCardNumber] = useState(null);

    const handleReveal = () => {
        setShowReveal(!showReveal)
    }

    const seprateWithHypen = (cardNumber) => {
        return cardNumber.match(/.{1,4}/g).join("-");
    }

    useEffect(() => {
        const replaceWithX = actualAadhaarId && "X".repeat(Math.min(8, actualAadhaarId.length)) + actualAadhaarId.slice(8);;
        const formatMaskedAadharId = actualAadhaarId && seprateWithHypen(replaceWithX); 
        setmaskedCardNumber(formatMaskedAadharId);
    }, []);

    useEffect(() => {
        const formatAadharId = actualAadhaarId && seprateWithHypen(actualAadhaarId); 
        setCardNumber(formatAadharId);
    }, []);

    useEffect(() => {
        if (showReveal) {
            setTimeout(() => {
                setShowReveal(false)
            }, 5000);
        }
    }, [showReveal]);

    return (
        <div className="px-6 pt-4">
            <div className="w-full px-2 py-2 max-w-xs p-6 border border-[#757575] border-rounded rounded-lg">
                <div role="" className="divide-y divide-default">
                    <div className="flex gap-1">
                        <div className="bg-white/2">
                            <img className="w-12 h-8 m-2" src={AAdhaarIcon} alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0 ms-2 text-white">
                            <div className="">
                                <div className="font-medium text-sm">{LocalStrings.aadhaar}</div>
                                <div className="text-xs text-[#757575]">{LocalStrings.uiai_fullform}</div>
                            </div>
                            <div className="mt-6">
                                <div className="flex">
                                    <div className="mr-2 min-w-[60%]">
                                        <div className="text-xs text-[#757575]">{LocalStrings.aadhaarNumber}</div>
                                        <div className="font-medium text-sm text-wrap">
                                            {showReveal ? cardNumber : maskedCardNumber}
                                        </div>
                                    </div>
                                    <div className="cursor-pointer" onClick={handleReveal}>
                                        <div className="flex items-center justify-center">
                                            { showReveal ? <FaEye /> : <FaEyeSlash /> }
                                        </div>
                                        <div className="text-xs text-[#ccc] mt-1">{LocalStrings.tapToReval}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;