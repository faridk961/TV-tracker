import { Image, Text, View } from 'react-native';
import { useAsync } from '../useAsync';
import { img, person } from '../tmdb';
import { Grid, State } from '../ui';
import { s } from '../theme';

export default function Actor({ route, navigation }) {
  const { id } = route.params;
  const x = useAsync(() => person(id), [id]);
  const p = x.data;
  if (!p) return <State s={x} />;

  const photo = img(p.profile_path);
  const data = p.combined_credits.cast
    .filter((m) => m.poster_path)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 30)
    .map((m) => ({
      key: `${m.media_type}${m.id}`,
      id: m.id,
      type: m.media_type,
      title: m.title || m.name,
      sub: `${m.media_type === 'tv' ? 'Show' : 'Movie'} · ${(m.release_date || m.first_air_date || '').slice(0, 4)}`,
      path: m.poster_path,
    }));

  const header = (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        {photo ? <Image source={{ uri: photo }} style={{ width: 90, height: 90, borderRadius: 45 }} /> : null}
        <Text style={[s.h1, { flex: 1 }]}>{p.name}</Text>
      </View>
      {p.biography ? <Text numberOfLines={6} style={[s.body, { marginTop: 12 }]}>{p.biography}</Text> : null}
      <Text style={s.h2}>Shows and movies</Text>
    </View>
  );

  // Movies have no detail screen yet, so only shows are tappable.
  return <View style={s.screen}><Grid data={data} header={header} onPress={(i) => i.type === 'tv' && navigation.push('Show', { id: i.id })} /></View>;
}
