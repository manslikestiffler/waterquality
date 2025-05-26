import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import WaterQuality from '../pages/WaterQuality';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0891b2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
          options={{ title: 'Water Quality Dashboard' }}
        />
        <Stack.Screen 
          name="WaterQuality" 
          component={WaterQuality}
          options={{ title: 'Water Quality Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 