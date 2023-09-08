import { useNavigationState } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react';

export function useScreenGuard(screenName: string) {
  const navigationState = useNavigationState((state) => state);

  const handleAuthentication = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirme sua identidade',
    });

    if (!auth.success) {
      handleAuthentication();
    }
  };

  useEffect(() => {
    if (navigationState.routes) {
      const currentScreen = navigationState.routes[navigationState.index];

      if (currentScreen.name === screenName) {
        handleAuthentication();
      }
    }
  }, []);
}
