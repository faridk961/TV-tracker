import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useStore } from '../store';
import { useAsync } from '../useAsync';
import { img, season, tv } from '../tmdb';
import { Chip, Poster, State } from '../ui';
import { c, s } from '../theme';

export default function Show({ route, navigation }) {
  const { id } = route.params;
  const { has, toggle, seen, toggleSeen } = useStore();
  const x = useAsync(() => tv(id, 'aggregate_credits,recommendations'), [id]);
  const d = x.data;
  const seasons = d ? d.seasons.filter((n) => n.season_number > 0) : [];
  const [pick, setPick] = useState(null);
  const sn = pick ?? (seasons.length ? seasons[0].season_number : null);
  const eps = useAsync(() => (sn == null ? Promise.resolve(null) : season(id, sn)), [id, sn]);

  if (!d) return <State s={x} />;
  const on = has(d.id);
  const back = img(d.backdrop_path, 'w780');
  const cast = d.aggregate_credits.cast.slice(0, 15);
  const similar = d.recommendations.results.slice(0, 10);

  return (
    <ScrollView style={s.screen}>
      {back ? <Image source={{ uri: back }} style={{ width: '100%', height: 200 }} /> : null}
      <View style={s.pad}>
        <Text style={s.h1}>{d.name}</Text>
        <Text style={s.mu}>{(d.first_air_date || '').slice(0, 4)} · {d.number_of_seasons} seasons · {d.status}</Text>
        <View style={s.chips}>
          {d.genres.map((g) => (
            <Chip key={g.id} label={g.name} onPress={() => navigation.navigate('Tabs', { screen: 'Browse', params: { genre: g.id } })} />
          ))}
        </View>
        <Text style={s.body}>{d.overview || 'No description available.'}</Text>
        <Pressable style={[s.btn, on && s.btnAlt]} onPress={() => toggle({ id: d.id, name: d.name, poster_path: d.poster_path })}>
          <Text style={[s.btnTxt, on && { color: c.text }]}>{on ? 'On your watchlist' : 'Add to watchlist'}</Text>
        </Pressable>

        <Text style={s.h2}>Episodes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[s.chips, { flexWrap: 'nowrap' }]}>
            {seasons.map((n) => <Chip key={n.id} label={`Season ${n.season_number}`} on={n.season_number === sn} onPress={() => setPick(n.season_number)} />)}
          </View>
        </ScrollView>
        {eps.data ? eps.data.episodes.map((e) => {
          const k = `${d.id}:${e.season_number}:${e.episode_number}`;
          return (
            <Pressable key={e.id} style={[s.row, { marginBottom: 8 }]} onPress={() => toggleSeen(k)} accessibilityState={{ checked: !!seen[k] }}>
              <View style={{ flex: 1 }}>
                <Text style={[s.body, { fontWeight: '600' }]}>E{e.episode_number} · {e.name}</Text>
                <Text style={s.mu}>{e.air_date || 'Date to be announced'}</Text>
              </View>
              <View style={[s.tick, seen[k] && s.tickOn]}>{seen[k] ? <Text style={{ color: '#fff' }}>✓</Text> : null}</View>
            </Pressable>
          );
        }) : <State s={eps} />}

        {cast.length ? <Text style={s.h2}>Cast</Text> : null}
        <FlatList
          horizontal
          data={cast}
          keyExtractor={(p) => String(p.id)}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <Pressable style={{ width: 96 }} onPress={() => navigation.push('Actor', { id: item.id })}>
              <Poster path={item.profile_path} title={item.name} w={96} />
              <Text numberOfLines={1} style={s.small}>{item.name}</Text>
              <Text numberOfLines={1} style={s.mu}>{item.roles?.[0]?.character}</Text>
            </Pressable>
          )}
        />

        {similar.length ? <Text style={s.h2}>Similar shows</Text> : null}
        <FlatList
          horizontal
          data={similar}
          keyExtractor={(p) => String(p.id)}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <Pressable style={{ width: 110 }} onPress={() => navigation.push('Show', { id: item.id })}>
              <Poster path={item.poster_path} title={item.name} w={110} />
              <Text numberOfLines={2} style={s.small}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </ScrollView>
  );
}
