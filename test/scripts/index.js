function initiate(type, base, config) {
  let audio = document.querySelector('audio')

  let webAudioWave = new WebAudioWave(type, audio, {
    width: window.innerWidth,
    height: window.innerHeight,
    ...base
  })
  webAudioWave.config(config)

  Object.assign(webAudioWave.canvas.style, {
    width: '100%',
    height: '100%'
  })
  document.body.append(webAudioWave.canvas)

  audio.addEventListener('play', () => {
    webAudioWave.play()
  })
}
