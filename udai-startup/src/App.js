import AppRoutes from "./routes/AppRoutes";
import appStore from "./redux-store/appStore";
import { Provider } from "react-redux";
import './App.css';

function App() {
  return (
    <div className="h-[100vh] bg-black">
      <Provider store={appStore}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
