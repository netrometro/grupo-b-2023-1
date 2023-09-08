import { useNavigationState } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react';

export function useScreenGuard(screenName: string) {
  const navigationState = useNavigationState((state) => state);

  async function handleAuthentication() {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Desbloqueie para acessar esta tela',
    });

    if (!auth.success) {
      handleAuthentication();
    }
  }
  useEffect(() => {
    if (navigationState.routes) {
      const currentScreen = navigationState.routes[navigationState.index];

      if (currentScreen.name === screenName) {
        handleAuthentication();
      }
    }
  }, []);
}
