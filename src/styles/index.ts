import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2980b9',
  background: '#f5f6fa',
  cardBackground: '#ffffff',
  selectedCard: '#f0f8ff',
  selectedBorder: '#2196F3',
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#95a5a6'
  }
};

export const baseStyles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // Card styles
  card: {
    marginVertical: 10,
    backgroundColor: colors.cardBackground,
  },
  selectedCard: {
    backgroundColor: colors.selectedCard,
    borderColor: colors.selectedBorder,
    borderWidth: 2,
  },

  // Text styles
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  
  // Button styles
  button: {
    marginVertical: 8,
    padding: 8,
  },
  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
  },

  // Game specific styles
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // area around word
  wordContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    overflow: 'scroll'
  },
  // justifies word to center of screen
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minWidth: '100%',  // Ensures the content takes full width
  },
  wordWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  word: {
    fontSize: 32,
    letterSpacing: 8,
    fontWeight: 'bold',
    color: colors.text.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexShrink: 0,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  letterChip: {
    margin: 2,
  }

});