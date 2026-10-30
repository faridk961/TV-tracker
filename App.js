import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StoreProvider } from './src/store';
import { c } from './src/theme';
import Watchlist from './src/screens/Watchlist';
import Upcoming from './src/screens/Upcoming';
import Browse from './src/screens/Browse';
import Show from './src/screens/Show';
import Actor from './src/screens/Actor';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: c.bg, card: c.card, text: c.text, primary: c.ac, border: c.ln } };

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 13, fontWeight: '600' }, tabBarIconStyle: { display: 'none' } }}>
      <Tab.Screen name="Watchlist" component={Watchlist} />
      <Tab.Screen name="Upcoming" component={Upcoming} />
      <Tab.Screen name="Browse" component={Browse} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Show" component={Show} options={{ title: '' }} />
          <Stack.Screen name="Actor" component={Actor} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
