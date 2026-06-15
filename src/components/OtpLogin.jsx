
const otpLogin = () => {
    const langCode = "en";
    const LocalStrings = require(`../localStrings/${langCode}`);
    
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
            <h1 className="text-3xl text-white font-bold mb-6">{LocalStrings.loginTitle}</h1>
            <p className="text-white text-lg mb-6 px-4">{LocalStrings.textForProcess}</p>
        </div>
    )
}

export default otpLogin;