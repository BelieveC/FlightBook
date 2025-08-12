# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup
```bash
# Install dependencies (use Node v14 as specified in .nvmrc)
npm install
# or
yarn install

# Create environment configuration
cp .env.development.sample .env.development
# Add Finnhub API token to .env.development (get from https://finnhub.io/)
```

### Running the Application
```bash
# Development server (runs on port 3013 by default)
npm start
# or
yarn start

# Production build
npm run build
# or
yarn build

# Deploy to GitHub Pages
npm run deploy
# or
yarn deploy
```

## Architecture Overview

### Redux-Saga Data Flow
The application uses Redux with Redux-Saga for state management and async operations:

1. **Initial Load Sequence** (src/App.js:31-40):
   - Checks localStorage for cached data (daily cache strategy)
   - If cache is invalid or market session is over, dispatches `INITIAL_LOAD`
   - Otherwise, loads cached data directly into Redux store

2. **Saga Flow** (src/sagas.js):
   - `INITIAL_LOAD` triggers parallel fetching of:
     - NIFTY 50 index data
     - Bank Nifty index data  
     - All 50 constituent stocks (defined in constants.js)
   - Each fetch stores results in localStorage with date-based keys
   - Data is fetched for last 2 months via Finnhub API

3. **State Structure** (src/reducer.js):
   ```javascript
   {
     nifty: [],        // NIFTY 50 index data
     bankNifty: [],    // Bank Nifty index data
     allNiftyStocks: {}, // All constituent stocks data
     currentSelectedDate: null,
     currentSelectedIndex: null
   }
   ```

### Caching Strategy
- **Daily Cache**: Data is cached in localStorage with date-based keys
- **Session Awareness**: After market close (3:30 PM IST), sets `after_session_reload` flag
- **Cache Invalidation**: Clears all localStorage if accessing on new day or missing critical data
- **Cache Keys Pattern**: `${date}_nifty50`, `${date}_banknifty`, `${date}_allNiftyStocks`

### Trading Calculations

#### Pivot Point System (src/utils/pivotCalculations.js)
Implements Central Pivot Range (CPR) calculations:
- **CPR Components**: Top Central (TC), Pivot, Bottom Central (BC)
- **Support/Resistance**: 4 levels each (R1-R4, S1-S4)
- **Two-Day Relationships**: Compares current CPR with previous day to determine market bias
- **Width Analysis**: Narrow (<0.5%), Moderate (0.5-1%), Wide (>1%) indicates expected volatility

#### Camarilla Levels (src/utils/camrillaCalculations.js)
Alternative pivot system for intraday trading:
- **H/L Levels**: H1-H5 (resistance), L1-L5 (support)
- **Key Levels**: H3 (sell reversal), L3 (buy reversal), H4/L4 (breakout levels)
- **Two-Day Analysis**: Similar to pivot system but using H3/L3 for comparison
- **Width Thresholds**: Narrow (<1%), Moderate (1-2%), Wide (>2%)

### API Integration
- **Provider**: Finnhub.io (requires API token)
- **Endpoint**: Stock candle data with daily resolution
- **Time Range**: Last 2 months of data
- **Symbols**: Uses `.NS` suffix for NSE stocks (e.g., "NIFTY.NS", "RELIANCE.NS")

## Key Implementation Notes

### Market Hours Logic
- Trading session: 9:15 AM - 3:30 PM IST
- `isTodaySessionOver()` helper determines if market is closed
- Cache refresh happens after session close on first reload

### Stock List
All 50 NIFTY constituent stocks are hardcoded in `src/constants.js:ALL_NIFTY_STOCKS`
Update this array when index composition changes.

### Component Structure
- **Main.js**: Container component managing date/index selection
- **PivotRange/CamarillaRange**: Display calculated levels
- **PivotTwoDayRelation/CamarillaTwoDayRelation**: Show relationship analysis
- **HotStock**: Identifies stocks with significant movement
- **FlightCard**: Individual stock display component

### Material-UI Version
Uses Material-UI v4 with date pickers v3. Component imports use `@material-ui/core`.