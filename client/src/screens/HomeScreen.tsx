import * as React from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'

import { gql, useQuery } from '@apollo/client'

import { Text, View } from '../components/Themed'
import { GetPosts, GetPosts_getPosts as Post } from './__generated__/GetPosts'

export default function HomeScreen() {
  const { data, loading } = useQuery<GetPosts>(GET_POSTS)

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <ActivityIndicator animating={loading} />
      </View>
    )
  }

  console.log(data)

  const renderItem = (post: Post | undefined) => (
    <View style={styles.item}>
      <Text style={styles.title}>{post?.description}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {data?.getPosts?.map((post) => renderItem(post))}
    </View>
  )
}

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      description
      createdAt
      updatedAt
    }
  }
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
})
