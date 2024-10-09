# Shoppable Video Project Documentation
### Overview
This project enables the creation of interactive shoppable videos, where products are linked to specific hotspots in the video. When a viewer clicks on these hotspots, they can view product details, prices, and links to purchase.

### Features
1. Hotspot Creation: Add clickable hotspots linked to products at specific timestamps.
1. Product Information: Customize product titles, descriptions, prices, and links.
1. Interactive Video: Viewers can interact with the video to explore products in real time.


### Example: Hotspot Filtering by Time
```js
   prod.hotspots
  .filter(spot => Math.abs(spot.time - currentTime) < 0.5)
  .map((spot, index) => (
    <div 
      key={index}
      className="hotspot" 
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    />
  ));
```
This code filters and displays hotspots if they are within 0.5 seconds of the current video time (currentTime).

### Key Functions
1. handleVideoClick: Triggers when the user clicks on the video to place a new product hotspot.
2. handleSliderChange: Updates video timestamp and allows positioning of the hotspot.
3. handleAddProduct: Adds a new product with metadata, such as title, price, and description.

### Styling Hotspots
Hotspots can be styled with CSS for different visual effects, such as making them semi-transparent with a beacon-like animation:

```js
  .hotspot {
    background-color: rgba(0, 0, 255, 0.5);
    border-radius: 50%;
    animation: beacon 2s infinite;
  }
  
  @keyframes beacon {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }

```

This provides a glowing effect that draws attention to the clickable product points.

### Running the Project
To run the project locally, follow these steps:

Install Dependencies: Run npm install to install all necessary dependencies.

Start the Project: Use npm start to launch the development server.

Upload Videos: Add your video files in the assets folder, and update the video source in the code.

Feel free to expand on these features and customize the interactions!









