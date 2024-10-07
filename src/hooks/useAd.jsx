import { useState, useRef, useEffect } from "react";

export const useAdClient = (tag) => {
  const videoRef = useRef(null);
  const adPlaybackRef = useRef(null);
  const [adsLoaded, setAdsLoaded] = useState(false);
  const [adsCompleted, setAdsCompleted] = useState(false);
  const [event, setEvent] = useState(null);
  const [container, setContainer] = useState(null);

  let adsManager, videoElement, adDisplayContainer, adsLoader;

  const onAdsManagerLoaded = (adsManagerLoadedEvent) => {
    setAdsLoaded(true);
    setEvent(adsManagerLoadedEvent);
    const adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.enablePreloading = true;

    adsManager = adsManagerLoadedEvent.getAdsManager(videoElement, adsRenderingSettings);

    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdLoaded);
    adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, () => setAdsLoaded(false) || setAdsCompleted(true));
    adsManager.addEventListener(google.ima.AdEvent.Type.AD_ERROR, onAdError);
  };

  const onAdError = () => {
    if (adsManager) {
      adsManager.destroy();
    }
  };

  const initializeIMA = () => {
    if (!tag) {
      alert("Enter ad tag");
      return;
    }
    videoElement = videoRef.current;
    const adContainer = adPlaybackRef.current;
    adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
    setContainer(adDisplayContainer);

    adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);

    videoElement.addEventListener("ended", () => {
      adsLoader.contentComplete();
    });

    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = tag;
    adsRequest.linearAdSlotWidth = videoElement.clientWidth;
    adsRequest.linearAdSlotHeight = videoElement.clientHeight;
    adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
    adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

    adsLoader.requestAds(adsRequest);
  };

  const loadAds = () => {
    videoElement = videoRef.current;
    const manager = event.getAdsManager(videoElement);

    videoElement?.load();
    container.initialize();

    const width = videoElement?.clientWidth;
    const height = videoElement?.clientHeight;

    try {
      manager.init(width, height, google.ima.ViewMode.NORMAL);
      manager.start();
    } catch (adError) {
      videoElement?.play();
    }

    setAdsLoaded(false);
  };

  const onContentPauseRequested = () => {
    videoElement?.pause();
  };

  const onContentResumeRequested = () => {
    videoElement?.play();
  };

  const onAdLoaded = (adEvent) => {
    const ad = adEvent.getAd();
    if (!ad.isLinear()) {
      videoElement?.play();
    }
  };

  return {
    videoRef,
    adPlaybackRef,
    adsLoaded,
    adsCompleted,
    initializeIMA,
    loadAds,
  };
};
