import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '../../../../hooks';

export interface MarkdownTextProps {
  text: string;
  isUser?: boolean;
}

interface InlineToken {
  type: 'text' | 'bold' | 'italic' | 'strikethrough' | 'code' | 'link' | 'highlight' | 'superscript' | 'subscript' | 'footnote';
  content: string;
  url?: string;
}

/**
 * Parses inline markdown formatting (**bold**, *italic*, ~~strike~~, `code`, [link](url), ==highlight==, ^super^, ~sub~, [^1])
 */
const parseInlineFormatting = (text: string): InlineToken[] => {
  const tokens: InlineToken[] = [];
  // Regex pattern matching inline markdown structures
  const pattern = /(\*\*(.*?)\*\*|\*(.*?)\*|_(.*?)_|~~(.*?)~~|`(.*?)`|\[(.*?)\]\((.*?)\)|==(.*?)==|\^([^\^]+)\^|~([^~]+)~|\[\^(\d+)\])/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
      });
    }

    const [full, , bold, italic1, italic2, strike, code, linkText, linkUrl, highlight, superText, subText, footnoteId] = match;

    if (bold !== undefined) {
      tokens.push({ type: 'bold', content: bold });
    } else if (italic1 !== undefined || italic2 !== undefined) {
      tokens.push({ type: 'italic', content: italic1 || italic2 });
    } else if (strike !== undefined) {
      tokens.push({ type: 'strikethrough', content: strike });
    } else if (code !== undefined) {
      tokens.push({ type: 'code', content: code });
    } else if (linkText !== undefined && linkUrl !== undefined) {
      tokens.push({ type: 'link', content: linkText, url: linkUrl });
    } else if (highlight !== undefined) {
      tokens.push({ type: 'highlight', content: highlight });
    } else if (superText !== undefined) {
      tokens.push({ type: 'superscript', content: superText });
    } else if (subText !== undefined) {
      tokens.push({ type: 'subscript', content: subText });
    } else if (footnoteId !== undefined) {
      tokens.push({ type: 'footnote', content: footnoteId });
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }

  return tokens;
};

/**
 * Renders parsed inline tokens inside a Text element
 */
const renderInlineContent = (
  tokens: InlineToken[],
  isUser: boolean,
  themeColors: any,
  isDarkMode: boolean,
  baseStyle?: TextStyle
) => {
  return tokens.map((token, index) => {
    switch (token.type) {
      case 'bold':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.boldText,
              { color: isUser ? '#FFFFFF' : themeColors.textPrimary },
            ]}>
            {token.content}
          </Text>
        );
      case 'italic':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.italicText,
              { color: isUser ? '#FFFFFF' : themeColors.textPrimary },
            ]}>
            {token.content}
          </Text>
        );
      case 'strikethrough':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.strikeText,
              { color: isUser ? 'rgba(255,255,255,0.7)' : themeColors.textMuted },
            ]}>
            {token.content}
          </Text>
        );
      case 'code':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.inlineCode,
              {
                backgroundColor: isUser ? 'rgba(255,255,255,0.25)' : isDarkMode ? '#334155' : '#E2E8F0',
                color: isUser ? '#FFFFFF' : isDarkMode ? '#F8FAFC' : '#1E293B',
              },
            ]}>
            {` ${token.content} `}
          </Text>
        );
      case 'highlight':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.highlightText,
              {
                backgroundColor: isUser ? '#F59E0B' : isDarkMode ? '#854D0E' : '#FEF08A',
                color: isUser ? '#FFFFFF' : isDarkMode ? '#FEF08A' : '#713F12',
              },
            ]}>
            {` ${token.content} `}
          </Text>
        );
      case 'superscript':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.superScript,
              { color: isUser ? '#FFFFFF' : themeColors.textPrimary },
            ]}>
            {token.content}
          </Text>
        );
      case 'subscript':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.subScript,
              { color: isUser ? '#FFFFFF' : themeColors.textPrimary },
            ]}>
            {token.content}
          </Text>
        );
      case 'footnote':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.footnoteTag,
              { color: isUser ? '#E0F2FE' : themeColors.primary },
            ]}>
            [{token.content}]
          </Text>
        );
      case 'link':
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              styles.linkText,
              { color: isUser ? '#E0F2FE' : themeColors.primary },
            ]}
            onPress={() => token.url && Linking.openURL(token.url).catch(() => {})}>
            {token.content}
          </Text>
        );
      default:
        return (
          <Text
            key={index}
            style={[
              baseStyle,
              { color: isUser ? '#FFFFFF' : themeColors.textPrimary },
            ]}>
            {token.content}
          </Text>
        );
    }
  });
};

/**
 * Parses markdown table structure (| Col 1 | Col 2 |)
 */
const parseTableCell = (cellStr: string) => cellStr.trim();

export const MarkdownText: React.FC<MarkdownTextProps> = ({ text, isUser = false }) => {
  const theme = useTheme();

  if (!text) return null;

  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockLang = '';

  let inTable = false;
  let tableLines: string[] = [];

  const flushTable = (keyIndex: number) => {
    if (tableLines.length < 2) {
      tableLines.forEach((tLine, tIdx) => {
        const tokens = parseInlineFormatting(tLine);
        blocks.push(
          <Text key={`table-fallback-${keyIndex}-${tIdx}`} style={styles.paragraph}>
            {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
          </Text>
        );
      });
      tableLines = [];
      inTable = false;
      return;
    }

    // Process Table
    const headerRowStr = tableLines[0];
    const dataRowStrs = tableLines.slice(1).filter((l) => !/^[\|\s:\-]+$/.test(l.trim()));

    const parseRow = (rowStr: string) =>
      rowStr
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map(parseTableCell);

    const headers = parseRow(headerRowStr);
    const rows = dataRowStrs.map(parseRow);

    const borderColor = isUser ? 'rgba(255,255,255,0.3)' : theme.isDarkMode ? '#334155' : '#E2E8F0';
    const headerBg = isUser ? 'rgba(255,255,255,0.15)' : theme.isDarkMode ? '#1E293B' : '#F1F5F9';

    blocks.push(
      <ScrollView
        horizontal
        key={`table-${keyIndex}`}
        showsHorizontalScrollIndicator={false}
        style={styles.tableScrollView}
        contentContainerStyle={styles.tableScrollContent}>
        <View style={[styles.tableContainer, { borderColor }]}>
          {/* Header Row */}
          <View style={[styles.tableHeaderRow, { backgroundColor: headerBg, borderBottomColor: borderColor }]}>
            {headers.map((h, colIdx) => (
              <View
                key={`th-${colIdx}`}
                style={[
                  styles.tableCell,
                  colIdx < headers.length - 1 ? { borderRightWidth: 1, borderRightColor: borderColor } : null,
                ]}>
                <Text style={[styles.tableHeaderText, { color: isUser ? '#FFFFFF' : theme.colors.textPrimary }]}>
                  {renderInlineContent(parseInlineFormatting(h), isUser, theme.colors, theme.isDarkMode)}
                </Text>
              </View>
            ))}
          </View>

          {/* Body Rows */}
          {rows.map((row, rIdx) => {
            const isLastRow = rIdx === rows.length - 1;
            const rowBg =
              rIdx % 2 === 1
                ? isUser
                  ? 'rgba(255,255,255,0.05)'
                  : theme.isDarkMode
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(241,245,249,0.5)'
                : 'transparent';

            return (
              <View
                key={`tr-${rIdx}`}
                style={[
                  styles.tableDataRow,
                  { backgroundColor: rowBg },
                  !isLastRow ? { borderBottomWidth: 1, borderBottomColor: borderColor } : null,
                ]}>
                {row.map((cell, cIdx) => (
                  <View
                    key={`td-${rIdx}-${cIdx}`}
                    style={[
                      styles.tableCell,
                      cIdx < row.length - 1 ? { borderRightWidth: 1, borderRightColor: borderColor } : null,
                    ]}>
                    <Text style={[styles.tableCellText, { color: isUser ? '#FFFFFF' : theme.colors.textPrimary }]}>
                      {renderInlineContent(parseInlineFormatting(cell), isUser, theme.colors, theme.isDarkMode)}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );

    tableLines = [];
    inTable = false;
  };

  lines.forEach((line, idx) => {
    // Check if line is part of a table (| col | col |)
    const isTableLine = line.trim().startsWith('|') && line.trim().endsWith('|');

    if (isTableLine) {
      inTable = true;
      tableLines.push(line);
      return;
    } else if (inTable) {
      flushTable(idx);
    }

    // Code block toggle (```)
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        blocks.push(
          <View
            key={`code-${idx}`}
            style={[
              styles.codeBlockContainer,
              {
                backgroundColor: isUser ? 'rgba(255,255,255,0.18)' : theme.isDarkMode ? '#1E293B' : '#F1F5F9',
                borderColor: isUser ? 'rgba(255,255,255,0.3)' : theme.isDarkMode ? '#334155' : '#CBD5E1',
                borderWidth: 1,
              },
            ]}>
            {codeBlockLang ? (
              <Text
                style={[
                  styles.codeBlockLang,
                  { color: isUser ? '#E0F2FE' : theme.isDarkMode ? '#94A3B8' : '#475569' },
                ]}>
                {codeBlockLang.toUpperCase()}
              </Text>
            ) : null}
            <Text
              style={[
                styles.codeBlockText,
                { color: isUser ? '#FFFFFF' : theme.isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}>
              {codeBlockLines.join('\n')}
            </Text>
          </View>
        );
        codeBlockLines = [];
        codeBlockLang = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, '').trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    const trimmed = line.trim();

    // Horizontal Rule (---, ***, ___)
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push(
        <View
          key={`hr-${idx}`}
          style={[
            styles.hr,
            { backgroundColor: isUser ? 'rgba(255,255,255,0.3)' : theme.colors.border },
          ]}
        />
      );
      return;
    }

    // Headings (# H1, ## H2, ### H3)
    if (line.startsWith('# ')) {
      const tokens = parseInlineFormatting(line.replace(/^#\s+/, ''));
      blocks.push(
        <Text key={`h1-${idx}`} style={styles.h1}>
          {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
        </Text>
      );
      return;
    }
    if (line.startsWith('## ')) {
      const tokens = parseInlineFormatting(line.replace(/^##\s+/, ''));
      blocks.push(
        <Text key={`h2-${idx}`} style={styles.h2}>
          {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
        </Text>
      );
      return;
    }
    if (line.startsWith('### ')) {
      const tokens = parseInlineFormatting(line.replace(/^###\s+/, ''));
      blocks.push(
        <Text key={`h3-${idx}`} style={styles.h3}>
          {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
        </Text>
      );
      return;
    }

    // Blockquote (> text)
    if (line.startsWith('> ')) {
      const tokens = parseInlineFormatting(line.replace(/^>\s+/, ''));
      blocks.push(
        <View
          key={`quote-${idx}`}
          style={[
            styles.quoteContainer,
            {
              borderLeftColor: isUser ? '#FFFFFF' : theme.colors.primary,
              backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : 'rgba(0,168,132,0.06)',
            },
          ]}>
          <Text style={styles.quoteText}>
            {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
          </Text>
        </View>
      );
      return;
    }

    // Task List (- [x] or - [ ])
    if (/^[\*\-]\s+\[([ xX])\]\s+/.test(trimmed)) {
      const isChecked = trimmed.includes('[x]') || trimmed.includes('[X]');
      const contentText = trimmed.replace(/^[\*\-]\s+\[([ xX])\]\s+/, '');
      const tokens = parseInlineFormatting(contentText);
      blocks.push(
        <View key={`task-${idx}`} style={styles.listRow}>
          <Text style={[styles.taskCheck, { color: isUser ? '#FFFFFF' : theme.colors.primary }]}>
            {isChecked ? '☑ ' : '☐ '}
          </Text>
          <Text style={styles.listText}>
            {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
          </Text>
        </View>
      );
      return;
    }

    // Unordered List (- item or * item)
    if (/^[\*\-]\s+/.test(trimmed)) {
      const contentText = trimmed.replace(/^[\*\-]\s+/, '');
      const tokens = parseInlineFormatting(contentText);
      blocks.push(
        <View key={`ul-${idx}`} style={styles.listRow}>
          <Text style={[styles.bullet, { color: isUser ? '#FFFFFF' : theme.colors.textPrimary }]}>
            •{' '}
          </Text>
          <Text style={styles.listText}>
            {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
          </Text>
        </View>
      );
      return;
    }

    // Ordered List (1. item, 2. item)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const numStr = numMatch[1];
      const contentText = numMatch[2];
      const tokens = parseInlineFormatting(contentText);
      blocks.push(
        <View key={`ol-${idx}`} style={styles.listRow}>
          <Text style={[styles.bullet, { color: isUser ? '#FFFFFF' : theme.colors.textPrimary }]}>
            {numStr}.{' '}
          </Text>
          <Text style={styles.listText}>
            {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
          </Text>
        </View>
      );
      return;
    }

    // Footnote definition [^1]: Text
    const fnMatch = trimmed.match(/^\[\^(\d+)\]:\s+(.*)/);
    if (fnMatch) {
      const fnNum = fnMatch[1];
      const fnText = fnMatch[2];
      const tokens = parseInlineFormatting(fnText);
      blocks.push(
        <View key={`fn-${idx}`} style={styles.footnoteDefRow}>
          <Text style={[styles.footnoteDefNum, { color: isUser ? '#E0F2FE' : theme.colors.primary }]}>
            [{fnNum}]{' '}
          </Text>
          <Text style={styles.listText}>
            {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
          </Text>
        </View>
      );
      return;
    }

    // Standard Paragraph / Empty Line
    if (trimmed.length === 0) {
      blocks.push(<View key={`empty-${idx}`} style={styles.emptyLine} />);
    } else {
      const tokens = parseInlineFormatting(line);
      blocks.push(
        <Text key={`p-${idx}`} style={styles.paragraph}>
          {renderInlineContent(tokens, isUser, theme.colors, theme.isDarkMode)}
        </Text>
      );
    }
  });

  if (inTable && tableLines.length > 0) {
    flushTable(999);
  }

  // Handle trailing code block if not closed
  if (inCodeBlock && codeBlockLines.length > 0) {
    blocks.push(
      <View
        key="code-last"
        style={[
          styles.codeBlockContainer,
          {
            backgroundColor: isUser ? 'rgba(255,255,255,0.18)' : theme.isDarkMode ? '#1E293B' : '#F1F5F9',
            borderColor: isUser ? 'rgba(255,255,255,0.3)' : theme.isDarkMode ? '#334155' : '#CBD5E1',
            borderWidth: 1,
          },
        ]}>
        <Text
          style={[
            styles.codeBlockText,
            { color: isUser ? '#FFFFFF' : theme.isDarkMode ? '#F8FAFC' : '#0F172A' },
          ]}>
          {codeBlockLines.join('\n')}
        </Text>
      </View>
    );
  }

  return <View style={styles.container}>{blocks}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 2,
  },
  emptyLine: {
    height: 6,
  },
  boldText: {
    fontWeight: '700',
  },
  italicText: {
    fontStyle: 'italic',
  },
  strikeText: {
    textDecorationLine: 'line-through',
  },
  inlineCode: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    fontSize: 13,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  highlightText: {
    fontWeight: '700',
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  superScript: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
  },
  subScript: {
    fontSize: 10,
    lineHeight: 14,
  },
  footnoteTag: {
    fontSize: 11,
    fontWeight: '700',
  },
  footnoteDefRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148,163,184,0.3)',
  },
  footnoteDefNum: {
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  h1: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginTop: 8,
    marginBottom: 4,
  },
  h2: {
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 25,
    marginTop: 6,
    marginBottom: 4,
  },
  h3: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
    marginTop: 4,
    marginBottom: 2,
  },
  quoteContainer: {
    borderLeftWidth: 3.5,
    paddingLeft: 10,
    paddingVertical: 4,
    marginVertical: 4,
    borderRadius: 4,
  },
  quoteText: {
    fontSize: 14.5,
    fontStyle: 'italic',
    lineHeight: 21,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  bullet: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  taskCheck: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginRight: 4,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  hr: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  codeBlockContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  codeBlockLang: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    marginBottom: 6,
    letterSpacing: 1,
  },
  codeBlockText: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    fontSize: 13,
    lineHeight: 19,
    color: '#F8FAFC',
  },
  // Table Styles
  tableScrollView: {
    marginVertical: 8,
    width: '100%',
  },
  tableScrollContent: {
    minWidth: '100%',
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableCell: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    minWidth: 80,
  },
  tableHeaderText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  tableCellText: {
    fontSize: 13.5,
    lineHeight: 19,
  },
});

export default MarkdownText;
