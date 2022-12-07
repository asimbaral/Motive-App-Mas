import React from 'react';
import { Button, SafeAreaView } from "react-native";
// import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = true;
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

const analytics = new ExpoMixpanelAnalytics("8eee91fa259f94afdedfdba55da7d918");

analytics.identify("13793");

analytics.register({ email: "bob@bob.com" }); // super props sent on every request and persisted in AsyncStorage

analytics.track("Signed In", { "Referred By": "Friend" });
// const mixpanel = new Mixpanel("8eee91fa259f94afdedfdba55da7d918", trackAutomaticEvents);
// mixpanel.init();

const MixPanel = () => {
  return (
    <SafeAreaView>
      <Button
        title="Select Premium Plan"
        onPress={() => analytics.track("Signed In", { "Referred By": "Friend" })
    }
      />
    </SafeAreaView>
  );
}

export default MixPanel;
