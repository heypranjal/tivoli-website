/**
 * Environment Setup and Validation
 * Ensures all required environment variables are properly configured
 */

// Required environment variables for Supabase integration
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

interface EnvironmentConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Validates that all required environment variables are present
 */
function validateEnvironment(): void {
  const missingVars = REQUIRED_ENV_VARS.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    const error = new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n\n` +
      'Please ensure your .env.local file contains:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key'
    );
    
    // In development, provide helpful guidance
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Environment Configuration Error:');
      console.error(error.message);
      console.error('\n📋 Quick Setup Guide:');
      console.error('1. Copy .env.example to .env.local');
      console.error('2. Update the values with your Supabase project details');
      console.error('3. Restart your development server');
    }
    
    throw error;
  }
}

/**
 * Gets the validated environment configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  validateEnvironment();
  
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  };
}

/**
 * Example .env.local file content
 */
export const EXAMPLE_ENV_CONTENT = `# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Development settings
NODE_ENV=development
`;

/**
 * Generates environment file with example values
 */
export function generateExampleEnvFile(): string {
  return EXAMPLE_ENV_CONTENT;
}

export default getEnvironmentConfig;