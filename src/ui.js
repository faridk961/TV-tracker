import { ActivityIndicator, FlatList, Image, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { c, s } from './theme';
import { img } from './tmdb';

export function Poster({ path, title, w }) {
  const box = { width: w, height: Math.round(w * 1.5), borderRadius: 8, backgroundColor: c.card };
  const u = img(path);
  return u ? <Image source={{ uri: u }} style={box} /> : <View style={[box, { justifyContent: 'center', padding: 6 }]}><Text style={s.mu}>{title}</Text></View>;
}

export function Chip({ label, on, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityState={{ selected: !!on }} style={[s.chip, on && s.chipOn]}>
      <Text style={[s.chipTxt, on && s.chipTxtOn]}>{label}</Text>
    </Pressable>
  );
}

// Shown while an async result is loading or failed.
export function State({ s: st }) {
  if (st.error) return <Text style={s.empty}>{st.error.message}</Text>;
  return <ActivityIndicator color={c.ac} style={{ marginTop: 40 }} />;
}

// 3-column poster grid. data: [{key, title, sub, path}]
export function Grid({ data, onPress, header, footer, empty }) {
  const { width } = useWindowDimensions();
  const w = Math.floor((width - 32 - 24) / 3);
  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={(i) => i.key}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{ gap: 12 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <Pressable style={{ width: w }} onPress={() => onPress(item)}>
          <Poster path={item.path} title={item.title} w={w} />
          <Text numberOfLines={2} style={s.small}>{item.title}</Text>
          {item.sub ? <Text style={s.mu}>{item.sub}</Text> : null}
        </Pressable>
      )}
    />
  );
}
