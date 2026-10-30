import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useAsync } from '../useAsync';
import { discoverTv, genres, searchTv } from '../tmdb';
import { Chip, Grid, State } from '../ui';
import { s } from '../theme';

export default function Browse({ route, navigation }) {
  const [q, setQ] = useState('');
  const [dq, setDq] = useState('');
  const [gs, setGs] = useState([]);

  useEffect(() => { const t = setTimeout(() => setDq(q.trim()), 400); return () => clearTimeout(t); }, [q]);
  // Opened from a genre tag on a show page.
  useEffect(() => { if (route.params?.genre) { setGs([route.params.genre]); setQ(''); } }, [route.params]);

  const gl = useAsync(genres, []);
  const res = useAsync(
    () => (dq ? searchTv(dq).then((r) => r.filter((x) => gs.every((g) => x.genre_ids.includes(g)))) : discoverTv(gs)),
    [dq, gs.join()]
  );
  const toggle = (id) => setGs((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));

  const header = (
    <View>
      <TextInput style={s.input} value={q} onChangeText={setQ} placeholder="Search shows" placeholderTextColor="#A09BC8" autoCorrect={false} />
      <View style={s.chips}>
        {(gl.data || []).map((g) => <Chip key={g.id} label={g.name} on={gs.includes(g.id)} onPress={() => toggle(g.id)} />)}
      </View>
    </View>
  );

  const data = (res.data || []).map((x) => ({ key: String(x.id), id: x.id, title: x.name, sub: (x.first_air_date || '').slice(0, 4), path: x.poster_path }));
  return (
    <View style={s.screen}>
      <Grid
        data={data}
        header={header}
        onPress={(i) => navigation.navigate('Show', { id: i.id })}
        empty={res.data ? <Text style={s.mu}>No shows match. Remove a genre or clear the search.</Text> : <State s={res} />}
        footer={<Text style={[s.mu, { textAlign: 'center', marginTop: 24 }]}>This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>}
      />
    </View>
  );
}
