import type { ComponentProps } from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '../context/AppContext';
import { Icon, type IconName } from './UI';

type BottomTabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>['tabBar']>
>[0];

const tabIcons: Record<string, IconName> = {
  index: 'search-outline',
  favorites: 'heart-outline',
  trips: 'trail-sign-outline',
  inbox: 'chatbox-outline',
  more: 'ellipsis-horizontal',
};

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { dark, colors } = useApp();
  const insets = useSafeAreaInsets();

  const bottomOffset = Math.max(insets.bottom, Platform.OS === 'web' ? 4 : 8);

  return (
    <View pointerEvents="box-none" style={[styles.position, { bottom: bottomOffset }]}>
      <View
        style={[
          styles.bar,
          {
            backgroundColor: dark ? '#292929' : '#E9E9E9',
            borderColor: dark ? '#414141' : '#D0D0D0',
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const selected = state.index === index;
          const label = descriptors[route.key].options.title ?? route.name;
          const iconName =
            selected && route.name === 'favorites'
              ? 'heart'
              : tabIcons[route.name];

          function handlePress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!selected && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{ selected }}
              onPress={handlePress}
              onLongPress={() =>
                navigation.emit({ type: 'tabLongPress', target: route.key })
              }
              style={[
                styles.item,
                { backgroundColor: selected ? colors.background : 'transparent' },
              ]}
            >
              <Icon name={iconName} size={29} color={colors.text} />
              <Text style={[styles.label, { color: colors.text }]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    left: 18,
    right: 18,
  },
  bar: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 40,
    borderWidth: 1,
    minHeight: 64,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 35,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});
