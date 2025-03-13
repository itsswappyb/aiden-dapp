# Community Analytics Documentation

## Overview

The Community Analytics dashboard provides comprehensive insights into your community's growth, engagement, and sentiment across various platforms. It offers interactive visualizations, real-time data tracking, and exportable reports to help community managers make data-driven decisions.

## Features

### Growth & Retention Analytics

- **Member Growth Tracking**: Monitor total and new member counts over time
- **Retention Analysis**: Track weekly, monthly, and quarterly retention rates
- **New Member Visualization**: Identify peak growth periods and trends
- **Context Annotations**: Growth targets and historical comparisons
- **Time Period Comparison**: 7-day, 30-day, and 90-day filtering options

### Platform Performance

- **Cross-Platform Metrics**: Track engagement across Telegram, Discord, Twitter, etc.
- **Active User Tracking**: Monitor active users per platform
- **Message Volume Analysis**: Track message counts and growth rates
- **Engagement Percentage**: Visual indicators of engagement relative to targets
- **Platform-Specific Growth Rates**: Track growth trends by platform

### Sentiment Analysis

- **Overall Community Sentiment**: Positive, neutral, and negative sentiment breakdown
- **Sentiment Scoring**: Numerical sentiment scoring (1-10 scale)
- **Historical Comparison**: Track sentiment changes over time
- **Visual Indicators**: Color-coded sentiment representation

### Activity Patterns

- **Hourly Activity Heatmap**: Track message volume by hour across all days of the week
- **Peak Activity Detection**: Automatically highlight peak activity periods
- **Day-of-Week Analysis**: Identify active days and hours for better community engagement
- **Message Volume Intensity**: Color-coded visualization of activity levels

### Topic Analysis

- **Trending Topics Tracking**: Identify most discussed subjects
- **Sentiment Breakdown by Topic**: See sentiment classification for each topic
- **Mention Counts**: Track volume of topic mentions
- **Growth/Decline Indicators**: Track topic popularity changes

### Real-Time Activity

- **Live Activity Feed**: Track recent interactions across platforms
- **Platform-Specific Styling**: Visual differentiation between platforms
- **Timestamp Tracking**: Time-based organization of activities
- **Action Type Classification**: Categorized by action type (join, message, mention)

### Data Export

- **CSV Export Functionality**: Download analytics data for offline analysis
- **Selective Export Options**: Export specific datasets (growth, sentiment, etc.)
- **Period-Based Exports**: Export data for selected time periods
- **Complete Dataset Export**: Option to export all analytics data

## Usage

### Accessing the Dashboard

1. Navigate to the main dashboard
2. Select "Community Analytics" from the sidebar
3. View the comprehensive analytics dashboard

### Filtering Data

1. Use the time period selectors (7d, 30d, 90d) at the top right
2. Select different tabs within each chart for different metrics
3. Use platform-specific filters to focus on particular platforms

### Exporting Data

1. Click the "Export" button in the top navigation bar
2. Select the specific dataset you wish to export
3. The data will be downloaded as a CSV file
4. Import into your preferred analysis tool (Excel, Google Sheets, etc.)

### Reading Charts

- **Area Charts**: Show trends over time with filled areas
- **Line Charts**: Track specific metrics across time periods
- **Bar Charts**: Compare values between categories
- **Donut Charts**: Show proportion distribution
- **Heatmaps**: Visualize intensity across two dimensions

### Interpreting Metrics

- **Growth metrics**: Higher is better, compared to targets
- **Engagement rates**: Higher is better, benchmark against 70%
- **Sentiment score**: Higher is better (7+ is excellent)
- **Activity patterns**: Use to schedule important announcements
- **Trending topics**: Guide content strategy and community focus

## Technical Details

- **Data Refresh Rate**: Real-time / 5 minute intervals
- **Chart Rendering**: Client-side with optimized SVG rendering
- **Color System**: Centralized CHART_COLORS object for consistent styling
- **Dark Mode Optimization**: All charts are designed for dark backgrounds
- **Export Format**: Standards-compliant CSV
- **Data Source**: Aggregated from connected platforms via API
- **Time Zone**: All times displayed in user's local time zone

## Best Practices

1. **Regular Monitoring**: Check analytics daily for trend identification
2. **Data-Driven Decisions**: Use peak activity times for important announcements
3. **Sentiment Awareness**: Address negative sentiment topics promptly
4. **Comparative Analysis**: Use time period filters to track growth patterns
5. **Export for Reporting**: Create regular exports for stakeholder reports
6. **Platform Focus**: Identify and prioritize high-engagement platforms
7. **Topic Tracking**: Align content strategy with popular community topics
8. **Engagement Targeting**: Set clear targets and track progress visually
