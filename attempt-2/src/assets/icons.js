import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const HomeIcon = ({ size = 24, color = '#800000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
      fill={color}
    />
  </Svg>
);

export const AnalyticsIcon = ({ size = 24, color = '#0066cc' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"
      fill={color}
    />
  </Svg>
);

export const SettingsIcon = ({ size = 24, color = '#0066cc' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.22-.38-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.25-.42-.5-.42h-3.84c-.25 0-.46.18-.49.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.22-.07.5.12.64l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.22.38.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.03.24.24.42.49.42h3.84c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.5-.12-.64l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
      fill={color}
    />
  </Svg>
);

export const PlusIcon = ({ size = 28, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
  </Svg>
);

export const DeleteIcon = ({ size = 20, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"
      fill={color}
    />
  </Svg>
);

export const WalletIcon = ({ size = 64, color = '#ccc' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6h-2c0-2.66-2.24-4.84-4.9-4.84C6.5 1.16 4.3 3.34 4.3 6H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.66 0 3.04 1.34 3.04 3s-1.38 3-3.04 3c-1.66 0-3-1.34-3-3s1.34-3 3-3zm7 16H2V8h16v12zm-8-5.5c1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5 1.57 3.5 3.5 3.5z"
      fill={color}
    />
  </Svg>
);

export const TrashIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"
      fill={color}
    />
  </Svg>
);