import { createAppContainer } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack"

import {
  Login,
  Register, Home, ContactAdd,ContactShow
} from './Views';
const AppNavigator = createStackNavigator(
  {
    Login,Register,Home,ContactAdd, ContactShow
  },
  {
    initialRouteName:"Login",
    headerMode:'none'
  }
)

export default createAppContainer(AppNavigator);

