import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
  Animated,
  PanResponder,
} from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ATIVIDADES = [
  { id: '1', label: 'Escovar dentes', emoji: '🦷' },
  { id: '2', label: 'Banho', emoji: '🛁' },
  { id: '3', label: 'Vestir', emoji: '👕' },
  { id: '4', label: 'Café da manhã', emoji: '☕' },
  { id: '5', label: 'Estudar', emoji: '📚' },
  { id: '6', label: 'Dormir', emoji: '😴' },
  { id: '7', label: 'Brincar', emoji: '🎮' },
  { id: '8', label: 'Almoço', emoji: '🍽️' },
];

const SLOTS = [
  { id: 'manha', label: 'Manhã', emoji: '🌤️' },
  { id: 'tarde', label: 'Tarde', emoji: '🌥️' },
  { id: 'noite', label: 'Noite', emoji: '🌙' },
];

/* ─── CARD DRAGGABLE ───────────────────────────────────── */
function DraggableCard({ item, onDrop, slotLayouts, onRemove, isAssigned }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const tryDrop = (x, y) => {
    const slots = slotLayouts.current;

    for (let i = 0; i < slots.length; i++) {
      const s = slots[i];

      if (
        x >= s.x &&
        x <= s.x + s.w &&
        y >= s.y &&
        y <= s.y + s.h
      ) {
        onDrop(item.id, s.id);
        return;
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        tryDrop(gesture.moveX, gesture.moveY);

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card,
        {
          transform: pan.getTranslateTransform(),
          opacity: isAssigned ? 0.85 : 1,
        },
        isAssigned && styles.cardAssigned,
      ]}
    >
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
      <Text style={styles.cardLabel}>{item.label}</Text>

      {isAssigned && (
        <Pressable style={styles.removeBtn} onPress={() => onRemove(item.id)}>
          <Text style={styles.removeBtnText}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

/* ─── SLOT ─────────────────────────────────────────────── */
function DropSlot({ slot, assigned, onRemoveItem, slotLayouts }) {
  const ref = useRef(null);

  const handleLayout = () => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, w, h) => {
        const list = slotLayouts.current;
        const idx = list.findIndex((s) => s.id === slot.id);

        const data = { id: slot.id, x, y, w, h };

        if (idx >= 0) list[idx] = data;
        else list.push(data);
      });
    }
  };

  return (
    <View ref={ref} onLayout={handleLayout} style={styles.slotRow}>
      <View style={styles.slotLabelArea}>
        <Text style={styles.slotTitle}>{slot.label}</Text>
        <Text style={styles.slotEmoji}>{slot.emoji}</Text>
      </View>

      <View style={styles.slotDropArea}>
        {assigned.length === 0 ? (
          <Text style={styles.slotPlaceholder}>Arraste aqui</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slotScrollContent}
          >
            {assigned.map((it) => (
              <Pressable
                key={it.id}
                style={styles.slotChip}
                onPress={() => onRemoveItem(it.id)}
              >
                <Text>{it.emoji}</Text>
                <Text>{it.label}</Text>
                <Text style={styles.slotChipRemove}>✕</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

/* ─── MAIN ─────────────────────────────────────────────── */
export default function SelRotinaFixa({ navigation }) {
  const [assignments, setAssignments] = useState({
    manha: [],
    tarde: [],
    noite: [],
  });

  const slotLayouts = useRef([]);

const handleDrop = (itemId, slotId) => {
  setAssignments((prev) => {
    const novo = { ...prev };

    // 👉 não remove mais dos outros slots
    if (!novo[slotId].includes(itemId)) {
      novo[slotId] = [...novo[slotId], itemId];
    }

    return novo;
  });
};

const handleRemove = (itemId) => {
  setAssignments((prev) => {
    const novo = { ...prev };

    Object.keys(novo).forEach((key) => {
      novo[key] = novo[key].filter((id) => id !== itemId);
    });

    return novo;
  });
};

  const getSlotItems = (slotId) =>
    ATIVIDADES.filter((a) =>
      assignments[slotId]?.includes(a.id)
    );

  const handleStart = () => {
    const total = Object.values(assignments).flat().length;

    if (total === 0) {
      Alert.alert('Ops!', 'Arraste pelo menos uma atividade.');
      return;
    }

    const rotina = {};
    SLOTS.forEach((s) => {
      rotina[s.id] = getSlotItems(s.id);
    });

    navigation?.navigate('Embaralhar', { rotina });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Selecione sua rotina</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.mainRow}>

          {/* CARDS */}
          <View style={styles.cardsPanel}>
            <View style={styles.cardsGrid}>
              {ATIVIDADES.map((item) => (
                <DraggableCard
                  key={item.id}
                  item={item}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  slotLayouts={slotLayouts}
                  isAssigned={
                    assignments.manha.includes(item.id) ||
                    assignments.tarde.includes(item.id) ||
                    assignments.noite.includes(item.id)
                  }
                />
              ))}
            </View>
          </View>
          <View style={styles.slotsPanel}>
            {SLOTS.map((slot) => (
              <DropSlot
                key={slot.id}
                slot={slot}
                assigned={getSlotItems(slot.id)}
                onRemoveItem={handleRemove}
                slotLayouts={slotLayouts}
              />
            ))}
          </View>

        </View>
      </ScrollView>

      <Pressable style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startBtnText}>Criar rotina</Text>
      </Pressable>
    </View>
  );
}

const CARD_SIZE = Math.min(Math.floor((SCREEN_WIDTH * 0.45) / 3) - 6, 92);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f0f8ff' },

  header: {
    padding: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#7ecfea',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  headerTitle: { fontSize: 18, fontWeight: '700' },

  body: { padding: 12 },

  mainRow: { flexDirection: 'row', gap: 12 },

  cardsPanel: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#7ecfea',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 8,
  },

  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c5e8f5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardAssigned: {
    backgroundColor: '#e8f7fd',
  },

  cardEmoji: { fontSize: 22 },
  cardLabel: { fontSize: 10, textAlign: 'center' },

  removeBtn: {
    position: 'absolute',
    top: 3,
    right: 3,
  },

  removeBtnText: { color: 'red' },

  slotsPanel: { flex: 1, gap: 10 },

  slotRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  slotLabelArea: { minWidth: 70 },

  slotTitle: { fontWeight: '700' },

  slotEmoji: { fontSize: 16 },

  slotDropArea: {
    flex: 1,
    minHeight: 60,
    maxHeight: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#7ecfea',
    borderRadius: 10,
    justifyContent: 'flex-start',
    padding: 6,
    overflow: 'hidden',
  },

  slotScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
    flexGrow: 1,
  },

  slotChip: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 6,
    backgroundColor: '#d4f0fc',
    padding: 4,
    borderRadius: 20,
  },

  slotChipRemove: { color: 'red' },

  startBtn: {
    margin: 12,
    padding: 14,
    backgroundColor: '#7ecfea',
    borderRadius: 20,
    alignItems: 'center',
  },

  startBtnText: { color: '#fff', fontWeight: '700' },
});