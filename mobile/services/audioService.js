import { Audio } from 'expo-av';

export const audioService = {
  playbackInstance: null,

  playFakeConversation: async () => {
    try {
      // Placeholder for a fake conversation audio
      const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace with a real conversation clip
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      audioService.playbackInstance = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing fake conversation:', error);
    }
  },

  stopAudio: async () => {
    if (audioService.playbackInstance) {
      await audioService.playbackInstance.stopAsync();
      await audioService.playbackInstance.unloadAsync();
      audioService.playbackInstance = null;
    }
  }
};