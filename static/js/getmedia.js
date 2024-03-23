document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Request user media
      const constraints = { video: true }; // Request video only (adjust for audio)
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
  
      // Display the media stream in the video element
      const video = document.getElementById('user-video');
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
  
    } catch (error) {
      console.error('Error:', error);
    }
  });