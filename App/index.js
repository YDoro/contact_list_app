import { createAppContainer } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack"

import {
  Login,
  Register, Home
} from './Views';
const AppNavigator = createStackNavigator(
  {
    Login,Register,Home
  },
  {
    initialRouteName:"Home",
    headerMode:'none'
  }
)

export default createAppContainer(AppNavigator);

