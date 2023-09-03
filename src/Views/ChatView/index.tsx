import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Title } from '../../shared/Text'

const ChatView = () => {
    return (
        <SafeAreaView>
            <View>
                <Title>hello</Title>
            </View>
        </SafeAreaView>
    )
}

export default ChatView