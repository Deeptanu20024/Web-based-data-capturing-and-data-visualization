// Function to handle video slider
    function handleVideoSlider() {
      const videos = document.querySelectorAll('#video-slider video');
      const dots = document.querySelectorAll('#video-slider .dot');
      let activeVideoIndex = 0;

      function playVideo(index) {
        videos.forEach(video => {
          video.pause();
          video.muted = true;
        });
        videos[index].currentTime = 0;
        videos[index].play();
      }

      function setActiveVideo(index) {
        videos.forEach(video => video.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        videos[index].classList.add('active');
        dots[index].classList.add('active');
      }

      function handleDotClick(index) {
        if (index !== activeVideoIndex) {
          activeVideoIndex = index;
          setActiveVideo(activeVideoIndex);
          playVideo(activeVideoIndex);
        }
      }

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => handleDotClick(index));
      });

      function handleVideoEnded() {
        activeVideoIndex = (activeVideoIndex + 1) % videos.length;
        setActiveVideo(activeVideoIndex);
        playVideo(activeVideoIndex);
      }

      videos.forEach(video => {
        video.addEventListener('ended', handleVideoEnded);
      });

      function autoplayVideoSlider() {
        setInterval(() => {
          handleVideoEnded();
        }, 5000); // Change slide every 5 seconds
      }

      playVideo(activeVideoIndex);
      autoplayVideoSlider();
    }

    // Initialize video slider
    handleVideoSlider();