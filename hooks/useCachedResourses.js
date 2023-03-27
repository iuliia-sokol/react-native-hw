import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();



export default function useCachedResources(fonts) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync(fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  return isLoadingComplete;
}