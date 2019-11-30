import { createAppContainer } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack"

import {
  Login
} from './Views';
const AppNavigator = createStackNavigator(
  {
    Login
  },
  {
    initialRouteName:"Login",
    headerMode:'none'
  }
)

export default createAppContainer(AppNavigator);

