// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import ThemeProvider from './components/ThemeProvider';

export const metadata = {
  title: 'Ragsites — White-label AI for Agencies',
  description: 'AI Voice & Chat assistants agencies can resell — we handle setup & support.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    animation: {
                      'gradient-x': 'gradient-x 15s ease infinite',
                      'gradient-y': 'gradient-y 15s ease infinite',
                      'gradient-xy': 'gradient-xy 15s ease infinite',
                    },
                    keyframes: {
                      'gradient-y': {
                        '0%, 100%': {
                          'background-size': '400% 400%',
                          'background-position': 'center top'
                        },
                        '50%': {
                          'background-size': '200% 200%',
                          'background-position': 'center center'
                        }
                      },
                      'gradient-x': {
                        '0%, 100%': {
                          'background-size': '200% 200%',
                          'background-position': 'left center'
                        },
                        '50%': {
                          'background-size': '200% 200%',
                          'background-position': 'right center'
                        }
                      },
                      'gradient-xy': {
                        '0%, 100%': {
                          'background-size': '400% 400%',
                          'background-position': 'left center'
                        },
                        '25%': {
                          'background-size': '400% 400%',
                          'background-position': 'left center'
                        },
                        '50%': {
                          'background-size': '400% 400%',
                          'background-position': 'right center'
                        },
                        '75%': {
                          'background-size': '400% 400%',
                          'background-position': 'right center'
                        }
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}