import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export interface WebSpeechBridgeRef {
  startListening: () => void;
  stopListening: () => void;
}

interface WebSpeechBridgeProps {
  onResult: (text: string) => void;
  onError: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const HTML_CONTENT = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:transparent;">
  <script>
    let recognition = null;
    let shouldKeepListening = false;
    let fullTranscript = '';

    function startListening() {
      shouldKeepListening = true;
      fullTranscript = '';
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', error: 'Web Speech API not supported' }));
        return;
      }

      if (recognition) {
        try { recognition.stop(); } catch(e) {}
      }

      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'start' }));
      };

      recognition.onresult = function(event) {
        let newSpeech = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newSpeech += event.results[i][0].transcript;
          }
        }
        if (newSpeech) {
          fullTranscript += (fullTranscript ? ' ' : '') + newSpeech.trim();
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'result', text: fullTranscript.trim() }));
        }
      };

      recognition.onerror = function(event) {
        if (shouldKeepListening && (event.error === 'no-speech' || event.error === 'network')) {
          setTimeout(function() {
            if (shouldKeepListening) {
              try { recognition.start(); } catch(e) {}
            }
          }, 300);
        } else {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', error: event.error }));
        }
      };

      recognition.onend = function() {
        if (shouldKeepListening) {
          setTimeout(function() {
            if (shouldKeepListening) {
              try { recognition.start(); } catch(e) {}
            }
          }, 200);
        } else {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'end' }));
        }
      };

      try {
        recognition.start();
      } catch (err) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', error: err.message }));
      }
    }

    function stopListening() {
      shouldKeepListening = false;
      if (recognition) {
        try { recognition.stop(); } catch(e) {}
      }
    }
  </script>
</body>
</html>
`;

export const WebSpeechBridge = forwardRef<WebSpeechBridgeRef, WebSpeechBridgeProps>(
  ({ onResult, onError, onStart, onEnd }, ref) => {
    const webViewRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      startListening: () => {
        webViewRef.current?.injectJavaScript('startListening(); true;');
      },
      stopListening: () => {
        webViewRef.current?.injectJavaScript('stopListening(); true;');
      },
    }));

    const handleMessage = (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.type === 'result') {
          onResult(data.text);
        } else if (data.type === 'error') {
          onError(data.error);
        } else if (data.type === 'start') {
          onStart?.();
        } else if (data.type === 'end') {
          onEnd?.();
        }
      } catch (e) {
        console.warn('WebSpeechBridge parse error:', e);
      }
    };

    return (
      <View style={styles.hiddenContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: HTML_CONTENT }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          onPermissionRequest={(request: any) => {
            if (request && typeof request.grant === 'function') {
              request.grant(request.resources);
            }
          }}
          mixedContentMode="always"
          allowFileAccess={true}
          style={styles.hiddenWebView}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  hiddenContainer: {
    width: 1,
    height: 1,
    opacity: 0.01,
    position: 'absolute',
    left: -100,
    top: -100,
  },
  hiddenWebView: {
    width: 1,
    height: 1,
  },
});

export default WebSpeechBridge;
