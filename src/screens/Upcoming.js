import { Pressable, ScrollView, Text, View } from 'react-native';
import { useStore } from '../store';
import { useAsync } from '../useAsync';
import { tv } from '../tmdb';
import { Poster, State } from '../ui';
import { s } from '../theme';

function when(date) {
  const n = Math.round((new Date(`${date}T00:00:00`) - new Date().setHours(0, 0, 0, 0)) / 864e5);
  return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n > 1 ? `In ${n} days` : `${-n} days ago`;
}

export default function Upcoming({ navigation }) {
  const { list, seen } = useStore();
  const x = useAsync(() => Promise.all(list.map((l) => tv(l.id))), [list.map((l) => l.id).join()]);
  if (!list.length) return <Text style={s.empty}>Follow shows from Browse to see their next episodes here.</Text>;
  if (!x.data) return <State s={x} />;

  const key = (d, e) => `${d.id}:${e.season_number}:${e.episode_number}`;
  const fresh = x.data.filter((d) => d.last_episode_to_air && !seen[key(d, d.last_episode_to_air)]);
  const soon = x.data.filter((d) => d.next_episode_to_air).sort((a, b) => a.next_episode_to_air.air_date.localeCompare(b.next_episode_to_air.air_date));

  const Item = ({ d, e, note }) => (
    <Pressable style={s.row} onPress={() => navigation.navigate('Show', { id: d.id })}>
      <Poster path={d.poster_path} title={d.name} w={48} />
      <View style={{ flex: 1 }}>
        <Text style={[s.body, { fontWeight: '700' }]}>{d.name}</Text>
        <Text style={s.body}>S{e.season_number} E{e.episode_number} · {e.name}</Text>
        <Text style={s.mu}>{note}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={s.pad}>
      <Text style={s.h2}>New to watch</Text>
      {fresh.length ? fresh.map((d) => <Item key={d.id} d={d} e={d.last_episode_to_air} note={`Aired ${when(d.last_episode_to_air.air_date)}`} />) : <Text style={s.mu}>You are caught up on the latest episodes.</Text>}
      <Text style={s.h2}>Coming soon</Text>
      {soon.length ? soon.map((d) => <Item key={d.id} d={d} e={d.next_episode_to_air} note={when(d.next_episode_to_air.air_date)} />) : <Text style={s.mu}>No new episodes scheduled.</Text>}
    </ScrollView>
  );
}
