import { Alert, Share } from 'react-native';

export const onShare = async (message: string, url?: string) => {
    try {
        const result = await Share.share({
            message,
            url
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        Alert.alert(error.message);
    }
};
