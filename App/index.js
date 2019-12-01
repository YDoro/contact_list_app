import { createAppContainer } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack"

import {
  Login,
  Register
} from './Views';
const AppNavigator = createStackNavigator(
  {
    Login,Register
  },
  {
    initialRouteName:"Login",
    headerMode:'none'
  }
)

export default createAppContainer(AppNavigator);

