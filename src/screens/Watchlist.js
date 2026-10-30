import { FlatList, Pressable, Text, View } from 'react-native';
import { useStore } from '../store';
import { Poster } from '../ui';
import { s } from '../theme';

export default function Watchlist({ navigation }) {
  const { list, seen } = useStore();
  if (!list.length) return <Text style={s.empty}>Your watchlist is empty. Find a show in Browse and tap Add to watchlist.</Text>;
  const count = (id) => Object.keys(seen).filter((k) => k.startsWith(`${id}:`)).length;
  return (
    <FlatList
      data={list}
      keyExtractor={(x) => String(x.id)}
      contentContainerStyle={s.pad}
      renderItem={({ item }) => (
        <Pressable style={s.row} onPress={() => navigation.navigate('Show', { id: item.id })}>
          <Poster path={item.poster_path} title={item.name} w={56} />
          <View style={{ flex: 1 }}>
            <Text style={[s.body, { fontWeight: '700' }]}>{item.name}</Text>
            <Text style={s.mu}>{count(item.id)} episodes watched</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
