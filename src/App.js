import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, useRouteMatch} from "react-router-dom";
import ThemeConfig from 'theme';
import GlobalStyles from 'theme/globalStyles';

// components
import ScrollToTop from 'components/ScrollToTop';
import { BaseOptionChartStyle } from 'components/charts/BaseOptionChart';
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import AdNewForm from "components/Ad/AdNewForm/AdNewForm"
import AdItem from "components/Ad/AdItem/AdItem";
import AdminUser from "components/Admin/AdminUser";
import AdminCategory from "components/Admin/AdminCategory";
import AdminAd from "components/Admin/AdminAd";
import Navbar from "components/Navbar/Navbar"
import Login from "pages/Login";
import Admin from "components/Admin/Admin";

//services
import { authService } from "services/auth.service";





const App = () => {
    useRouteMatch("/");
    let loggedIn = false;
    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        loggedIn = true;
        roleCurrentUser = authService.getRoleCurrentUser(currentUser.token)
    }
    console.log("App.js: ", loggedIn);


    return (
        <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
                <Navbar loggedIn={loggedIn} roleCurrentUser={roleCurrentUser}/>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route path="/ajouter" component={AdNewForm} />
                    <Route path="/annonces/:id" component={AdItem} />
                    <Route path="/admin/categories" component={AdminCategory} />
                    <Route path="/admin/utilisateurs" component={AdminUser} />
                    <Route path="/admin/annonces" component={AdminAd} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/profile/:email" component={Profile} />
                    <Route path="/" component={Home} />
                </Switch>

    </ThemeConfig>

    )
}
export default App;
