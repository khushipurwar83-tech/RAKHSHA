export const Theme = {
  colors: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    primary: '#00F0FF', // Cyber Cyan
    secondary: '#7000FF', // Electric Purple
    error: '#FF3B30', // SOS Red
    success: '#4CD964',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    glass: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 20,
    round: 50,
  }
};

export const GlobalStyles = {
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.md,
  },
  glassCard: {
    backgroundColor: Theme.colors.glass,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    backdropFilter: 'blur(10px)',
  },
  neonButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  }
};
