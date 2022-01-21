function initiate(type, base, config) {
  let audio = document.querySelector('audio')

  let webAudioWave = new WebAudioWave(type, audio, {
    width: window.innerWidth,
    height: window.innerHeight,
    ...base
  })
  document.body.append(webAudioWave.canvas)
  webAudioWave.config(config)

  audio.addEventListener('play', () => {
    webAudioWave.play()
  })
}
