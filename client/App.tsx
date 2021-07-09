import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'

import { ApolloProvider } from '@apollo/client'
import useCreateApolloClient from './src/hooks/useCreateApolloClient'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const client = useCreateApolloClient()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    )
  }
}
