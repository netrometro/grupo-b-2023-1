import { useNavigationState } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react';

export function useScreenGuard(screenName: string) {
  const navigationState = useNavigationState((state) => state);
  useEffect(() => {
    if (navigationState.routes) {
      const currentScreen = navigationState.routes[navigationState.index];

      if (currentScreen.name === screenName) {
        console.log('Desbloquear tela');
      }
    }
  }, []);
}
