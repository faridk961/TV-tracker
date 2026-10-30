import { StyleSheet } from 'react-native';

export const c = { bg: '#15122B', card: '#211C43', text: '#ECE9FA', mu: '#A09BC8', ac: '#FFD23F', ln: '#352F62', ok: '#5FD3AE' };

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bg },
  pad: { padding: 16 },
  h1: { color: c.text, fontSize: 26, fontWeight: '700' },
  h2: { color: c.text, fontSize: 19, fontWeight: '700', marginTop: 24, marginBottom: 10 },
  body: { color: c.text, fontSize: 15, lineHeight: 22 },
  mu: { color: c.mu, fontSize: 13 },
  small: { color: c.text, fontSize: 13, marginTop: 6 },
  empty: { color: c.mu, padding: 24, fontSize: 15, lineHeight: 22 },
  row: { flexDirection: 'row', gap: 14, alignItems: 'center', backgroundColor: c.card, borderRadius: 12, padding: 12, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 },
  chip: { borderWidth: 1.5, borderColor: c.ln, borderRadius: 99, paddingVertical: 6, paddingHorizontal: 14, backgroundColor: c.card },
  chipOn: { backgroundColor: c.ac, borderColor: c.ac },
  chipTxt: { color: c.text, fontWeight: '600' },
  chipTxtOn: { color: c.bg },
  btn: { backgroundColor: c.ac, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 14 },
  btnAlt: { backgroundColor: c.card, borderWidth: 1.5, borderColor: c.ln },
  btnTxt: { color: c.bg, fontWeight: '700', fontSize: 15 },
  tick: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: c.ln, alignItems: 'center', justifyContent: 'center' },
  tickOn: { backgroundColor: c.ok, borderColor: c.ok },
  input: { backgroundColor: c.card, color: c.text, borderRadius: 10, borderWidth: 1.5, borderColor: c.ln, paddingHorizontal: 14, paddingVertical: 11, fontSize: 16 },
});
