# Changelog

## [0.11.21] - 2024-03-11

### Changed

- Enhanced key metrics cards with more prominent numerical values
- Standardized stat card layouts for consistent information presentation
- Improved overall information hierarchy to emphasize important metrics
- Optimized card structure for better readability and visual alignment
- Reorganized stat cards with consistent spacing and text positioning

## [0.11.20] - 2024-03-11

### Changed

- Softened the stroke lines on area charts for a more subtle visual effect
- Reduced opacity of chart borders to create a more cohesive visual style
- Decreased the size and brightness of data point indicators
- Made legend indicators match the softer color scheme
- Improved overall visual consistency between heatmap and area charts

## [0.11.19] - 2024-03-11

### Changed

- Replaced bar chart in Hourly Activity section with a heatmap visualization
- Added day-of-week dimension to activity analysis for better pattern recognition
- Implemented color intensity scale to represent message volume more intuitively
- Enhanced data visualization with improved tooltips showing detailed activity metrics
- Added color scale legend for better interpretation of the heatmap

## [0.11.18] - 2024-03-11

### Changed

- Completely redesigned chart layouts for a more professional appearance
- Improved grid line presentation with consistent sizing and spacing
- Repositioned chart legends to the bottom right with better visibility
- Added custom backgrounds to legends for improved readability
- Enhanced data point indicators for better visual tracking
- Updated gradient opacities for more balanced chart visuals
- Improved spacing and alignment of axis labels
- Standardized positioning of contextual information across all charts
- Increased chart height for better data visualization

## [0.11.17] - 2024-03-11

### Fixed

- Improved consistency of stat cards by enforcing uniform height
- Fixed chart legend overlap issues by repositioning and adding background for better readability
- Enhanced platform performance cards with improved background and hover effects
- Adjusted spacing and margins for more consistent layout across all components
- Improved overall visual hierarchy and readability of dashboard elements

## [0.11.16] - 2024-03-11

### Added

- Implemented a consistent color system for all chart visualizations
- Added a centralized CHART_COLORS object for better maintainability of the color palette
- Added reference lines to charts for contextual comparison
- Implemented dynamic opacity based on data values for better visual hierarchy
- Added target reference lines to support data context

### Changed

- Updated all charts to use the application's accent color theme (#87fafd)
- Improved chart visibility and readability on dark backgrounds
- Enhanced color contrast for all chart elements based on data visualization best practices
- Applied consistent color semantics (positive/neutral/negative) across all charts
- Refined tooltips for better data context and readability

### Fixed

- Fixed inconsistent color application across different chart types
- Addressed visual hierarchy issues in data presentation
- Improved color accessibility in all data visualizations
- Fixed color consistency between legends and chart elements

## [0.11.15] - 2024-03-11

### Fixed

- Completely replaced Tremor chart components with custom-built chart elements to fix visibility issues
- Created custom SVG-based area charts, line charts, and bar charts with vivid colors
- Implemented custom donut chart with direct color application to ensure proper display in dark mode
- Added custom progress bars for platform performance metrics with better visibility
- Ensured consistent colors across all chart elements with direct application of CSS
- Enhanced tooltips and legends for better user experience
- Fixed all chart display issues on dark backgrounds

## [0.11.14] - 2024-03-11

### Fixed

- Fixed chart visibility issues on dark backgrounds by enhancing CSS for Tremor charts
- Added CSS overrides to make bar charts, pie charts, and area charts more visible
- Improved color contrast for all chart elements in dark mode
- Enhanced DonutChart with better styling and larger color indicators
- Added additional context to charts with improved legends and annotations
- Fixed New Members chart with more vibrant colors and grid improvements

## [0.11.13] - 2024-03-11

### Added

- Completely redesigned Community Analytics page with modern UI
- Added interactive time period filters (7d, 30d, 90d)
- Added tabbed chart sections for growth, retention, and new members
- Implemented detailed platform performance metrics with visual indicators
- Added hourly activity chart to track message volume patterns
- Added trending topics section with sentiment analysis
- Added real-time activity feed with platform-specific styling
- Enhanced statistics cards with additional metrics
- Added proper mobile responsiveness throughout the analytics page

### Changed

- Made the existing Community Analytics page accessible through the main sidebar navigation
- Updated visualization components with improved styling and interactivity
- **Improved chart colors and customization for better visibility on dark backgrounds**
- **Added custom tooltips to all charts for enhanced data readability**
- **Implemented consistent color scheme across all platform-specific elements**
- Enhanced data presentation with more intuitive visual hierarchy
- Improved overall user experience with cleaner interface and better information organization

## [0.11.12] - 2024-03-11

### Fixed

- Improved image handling to work in both development and production environments
- Added environment-specific image loading to prevent configuration issues
- Enhanced logo display with conditional loading based on environment
- Fixed local development image loading while maintaining production reliability

## [0.11.11] - 2024-03-11

### Fixed

- Fixed logo display in production by using hosted image URLs instead of local paths
- Updated Next.js image configuration to support GitHub hosted images
- Improved image loading reliability across all environments
- Ensured consistent branding across development and production

## [0.11.10] - 2024-03-11

### Added

- Added Aiden fox logo to the navbar next to the brand text
- Enhanced visual branding with consistent logo placement
- Added Aiden fox logo to the dashboard sidebar
- Improved sidebar branding and identity
- Added clean highlight for active/selected navigation items in sidebar
- Implemented smart path matching for navigation highlighting
- Added custom icons for all platforms in Agent filters (Telegram, Farcaster)

### Changed

- Updated branding text with white-to-blue gradient styling
- Optimized spacing between logo and "Aiden" text for better readability
- Standardized brand text appearance across the application
- Improved sidebar UX by keeping the fox logo in a fixed position when sidebar is collapsed
- Fixed sidebar toggle button to maintain consistent positioning in both expanded and collapsed states
- Enhanced sidebar animations with smooth text transitions
- Refined navigation highlight with a cleaner, simpler style
- Added proper ARIA labels to improve accessibility
- Optimized layout for both expanded and collapsed sidebar states
- Fixed jumpy text in navigation items when opening/closing the sidebar
- Improved transition animations for smoother sidebar open/close experience
- Improved Agent filter UI by making labels more concise to fit on a single row

### Fixed

- Fixed "Deploy New Agent" button on dashboard overview to navigate to the agents page

## [0.11.6] - 2024-02-14

### Added

- Centralized notification system using React Context
- Notification queueing system for handling multiple notifications
- Persistent error notifications with manual dismissal
- Enhanced accessibility for notifications with ARIA attributes
- Keyboard navigation support for notification dismissal
- Improved notification stacking and positioning
- Additional validation rules for structured data
- Real-time operation feedback through notifications

### Changed

- Migrated from component-based to context-based notifications
- Updated notification behavior based on type (errors persist, others auto-hide)
- Enhanced notification styling for better visibility
- Improved notification z-index handling
- Updated documentation with notification system details
- Standardized notification patterns across all components
- Made root layout client-side to support NotificationProvider
- Ensured NotificationProvider is correctly placed at the root level
- Standardized notification handling across all components

### Fixed

- Notification overlap issues
- Accessibility issues with notification contrast
- Keyboard navigation gaps
- TypeScript errors related to notification props
- Inconsistent notification behavior across components
- Fixed notification context availability issues in knowledge base components
- Resolved 'useNotification must be used within a NotificationProvider' error

## [0.11.5] - 2024-02-14

### Added

- FAQ category dropdown with predefined categories
- Enhanced notification system with auto-hide functionality
- Loading states for all async operations
- File validation with size and type checks
- URL validation with protocol checks
- FAQ validation with length limits

### Changed

- Improved type definitions for better type safety
- Enhanced error messages with more context
- Updated UI components for better user feedback
- Refactored state management for better reliability

### Fixed

- Type errors in FAQ category handling
- Race conditions in document processing
- Memory leaks from unmounted components
- Duplicate ID generation issues

## [0.11.4] - Previous version

## [0.11.7] - 2024-02-14

### Changed

- Separated root layout into server and client components for proper metadata handling
- Moved NotificationProvider to a dedicated client layout component
- Improved Next.js 14 App Router compatibility

### Fixed

- Fixed "attempting to export metadata from a component marked with 'use client'" error
- Resolved metadata export issues in client components

## [0.11.8] - 2024-02-14

### Fixed

- Removed duplicate notifications by removing Pages Router implementation
- Cleaned up legacy \_app.tsx file
- Ensured single instance of NotificationProvider in App Router

## [0.11.9] - 2024-02-14

### Fixed

- Removed duplicate notifications in FAQ and URL panels by centralizing notification handling in parent component
- Improved notification management in knowledge base components
- Ensured consistent notification behavior across all knowledge base panels

## [0.12.0] - 2024-02-14

### Added

- Comprehensive settings page with multiple sections:
  - Profile management with user information
  - Team management with role controls
  - Notification preferences for agent updates
  - Security settings with 2FA support
  - Admin controls for API and webhook management
- Enhanced UI components:
  - Custom toggle switches for preferences
  - Responsive grid layouts
  - Animated tab transitions
  - Modern form controls
- Display preferences for agent views and metrics
- Usage statistics dashboard in admin panel

### Changed

- Updated global button styling
- Improved form input consistency
- Enhanced mobile responsiveness for settings panels

## [0.12.1] - 2024-02-14

### Added

- New Moderation Log tab in settings:
  - Detailed activity tracking for admin actions
  - Filterable log entries by action type
  - Timestamp and moderator tracking
  - Export functionality for logs
  - Pagination support for log entries
- Enhanced logging interface with:
  - Action categorization
  - Target identification
  - Detailed action descriptions
  - Chronological ordering

### Changed

- Updated settings navigation to include moderation log
- Improved action tracking granularity
- Enhanced log entry styling and readability

## [0.12.2] - 2024-02-14

### Added

- Enhanced Agents page with new features:
  - Agent deployment system with templates
  - Filtering by use case (Community Management, Social Engagement)
  - Platform-specific filtering (Discord, Twitter, Instagram, LinkedIn)
  - Agent metrics dashboard
  - Status indicators for active agents
  - Quick actions for configuration and details
- New deployment modal with:
  - Pre-configured templates for different use cases
  - Multi-platform support
  - Visual platform indicators
  - Streamlined deployment process

### Changed

- Redesigned agents list view with metrics
- Improved filtering UI with platform-specific icons
- Enhanced agent card design with status and metrics
- Added Radix UI icons for better platform representation

## [0.12.3] - 2024-02-15

### Changed

- Updated supported platforms to focus on Telegram, Discord, and Twitter
- Enhanced agent cards with profile pictures and improved layout
- Streamlined platform selection in deployment modal

## [0.12.4] - 2024-02-15

### Changed

- Standardized page headers across all dashboard pages:
  - Consistent title and description styling
  - Unified spacing and layout
  - Standardized gradient effects
- Improved page load animations:
  - Removed animation from page headers for instant visibility
  - Maintained content section animations for better UX
  - Consistent animation timing across all pages
