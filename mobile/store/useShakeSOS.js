import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { useSOSStore } from './useSOSStore';
import { Vibration } from 'react-native';

export const useShakeSOS = () => {
  const { activateSOS, isSOSActive } = useSOSStore();

  useEffect(() => {
    let subscription;
    
    const subscribe = () => {
      subscription = Accelerometer.addListener(accelerometerData => {
        const { x, y, z } = accelerometerData;
        const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);
        
        // Threshold for a vigorous shake
        if (totalForce > 3.5 && !isSOSActive) {
          Vibration.vibrate([100, 200, 100, 200]);
          activateSOS();
        }
      });
      
      Accelerometer.setUpdateInterval(100);
    };

    subscribe();
    return () => subscription && subscription.remove();
  }, [isSOSActive]);
};
