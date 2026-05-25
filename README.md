# 💱 Live Currency Exchange

A real-time currency exchange application that converts between multiple currencies using live exchange rates.

## Features

✨ **Live Exchange Rates** - Real-time rates updated every 60 seconds  
🔄 **Currency Swap** - Easily swap between "from" and "to" currencies  
🌍 **10+ Currencies** - Support for USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, INR, MXN  
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices  
⚡ **Fast & Lightweight** - No dependencies, pure HTML/CSS/JavaScript  
🎨 **Beautiful UI** - Modern gradient design with smooth animations  
🛡️ **Error Handling** - Graceful error messages and loading states  

## How to Use

1. **Enter Amount** - Type the amount you want to convert
2. **Select Currencies** - Choose "From" and "To" currencies
3. **View Result** - See the converted amount in real-time
4. **Swap Currencies** - Click the ⇄ button to swap currencies
5. **Auto-Update** - Rates automatically refresh every 60 seconds

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks or dependencies
- **ExchangeRate-API** - Free API for real-time exchange rates

## API

This application uses the free **ExchangeRate-API** service:
- Endpoint: `https://api.exchangerate-api.com/v4/latest`
- No API key required
- Rate limits: 1500 requests/month (free tier)

## File Structure

```
├── index.html      # Main HTML interface
├── styles.css      # Styling and animations
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Supported Currencies

- 🇺🇸 USD - US Dollar
- 🇪🇺 EUR - Euro
- 🇬🇧 GBP - British Pound
- 🇯🇵 JPY - Japanese Yen
- 🇦🇺 AUD - Australian Dollar
- 🇨🇦 CAD - Canadian Dollar
- 🇨🇭 CHF - Swiss Franc
- 🇨🇳 CNY - Chinese Yuan
- 🇮🇳 INR - Indian Rupee
- 🇲🇽 MXN - Mexican Peso

## Installation & Setup

1. Clone this repository:
```bash
git clone https://github.com/jjkok6o6-crypto/Hello-World-.git
cd Hello-World-
```

2. Open `index.html` in your web browser

That's it! No installation or build process required.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Features in Detail

### Real-Time Conversion
- Converts instantly as you type
- Automatically fetches the latest rates every 60 seconds
- Displays exchange rate for transparency

### User-Friendly Interface
- Intuitive dropdown selectors for currencies
- Number input with decimal support
- Swap button for quick currency exchange
- Displays "last updated" timestamp

### Error Handling
- Network error messages
- Loading indicator during API calls
- Graceful fallback behavior

## Customization

### Change Update Interval
Edit `script.js` line 8:
```javascript
UPDATE_INTERVAL: 60000 // Change this value (in milliseconds)
```

### Add More Currencies
Edit `index.html` and add options to the select elements:
```html
<option value="SGD">SGD - Singapore Dollar</option>
```

## Performance

- **Zero Dependencies** - Pure vanilla JavaScript
- **Fast Loading** - Minimal CSS and JS
- **Optimized API Calls** - Batched requests
- **Smooth Animations** - CSS-based, not JavaScript
- **Mobile Optimized** - Responsive and touch-friendly

## Future Enhancements

- 📊 Historical exchange rate charts
- 💾 Save favorite currency pairs
- 🔔 Price alerts
- 📊 More currencies support
- 🌙 Dark mode theme
- 📱 Progressive Web App (PWA)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have suggestions, please create an issue on GitHub.

---

Made with ❤️ | Exchange rates provided by ExchangeRate-API
