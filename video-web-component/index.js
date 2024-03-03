class ResponsiveVideo extends HTMLElement {
  constructor() {
    super();
    this.listenedMedia = [];
    this.reloadQueued = false;
  }
  connectedCallback() {
    this.video = this.querySelector("video");
    this.bindMediaListeners();
  }
  disconnectedCallback() {
    this.unbindMediaListeners();
  }
  bindMediaListeners() {
    //todo 循环 video 下面的自选，并且启动对应的媒体选择期的监听，当触发的时候，检查资源是否满足条件，不满足就换字段
    const srcChildren = this.querySelectorAll("source");
    for (const src of this.childNodes) {
      if (src.media) {
        const mqListener = () => {
          if (
            src.media === this.video.currentSrc ||
            !this.previousSiblingIsPlaying(src, this.video.currentSrc) &&
              !this.reloadQueued
          ) {
            this.reloadVideo();
          }
          this.listenedMedia.push({ media: src.media, handler: mqListener });

          // 返回一个新的 MediaQueryList 对象，然后可以使用该对象来确定 document 是否匹配媒体查询字符串，以及监视文档以检测它何时匹配（或停止匹配）该媒体查询
          window.matchMedia(src.media).addEventListener("change", mqListener);
        };
      }
    }
  }
  unbindMediaListeners() {
    // todo 关闭监听器
    this.listenedMedia.forEach((listener) => {
      window.matchMedia(listener.media).removeEventListener(
        "change",
        listener.handler,
      );
    });
  }
  previousSiblingIsPlaying(elem, src) {
    let prevSibling = elem;
    while (elem.previousElementSibling) {
      if (prevSibling.src === src) {
        return true;
      }
    }
    return false;
  }
  reloadVideo() {
    // todo 捕获时间，切换资源，跳转到对应的播放时间
    this.reloadQueued = true
    const currentTime = this.video.currentTime
    const playState = this.video.playState
    this.video.load()
    const videoLoaded = ()=>{
        this.video.playState = playState
        this.video.currentTime = currentTime.toString
        this.reloadQueued = false
        this.video.removeEventListener("loadeddata",videoLoaded)
    }

    this.video.addEventListener("loadeddata",videoLoaded)
  }
}
customElements.define("responsive-video", ResponsiveVideo);


// feature test for native video media switching media
const videoMediaChangeSupport = async () => {
    return new Promise(resolve => {
      const iframe = document.createElement("iframe");
      const video = document.createElement("video");
      const source = document.createElement("source");
      const mediaSource = new MediaSource();
      mediaSource.addEventListener("sourceopen", () => resolve(true));
      source.src = URL.createObjectURL(mediaSource);
      source.media = "(min-width:10px)";
      video.append(source);
      iframe.width = "5";
      iframe.style.cssText = `position: absolute; visibility: hidden;`;
      document.documentElement.append(iframe);
      iframe.contentDocument.body.append(video);
      setTimeout(() => { iframe.width = "15"; });
      setTimeout(() => {
        iframe.remove();
        resolve(false);
      }, 1000);
    });
  };

  if( await videoMediaChangeSupport() === false ){
    customElements.define("responsive-video", ResponsiveVideo);
  }