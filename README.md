Project 1 - Assignment Week 1 - Flicks

Time spent: X hours spent in total

User Stories

The following required functionality is completed:

x User can view a list of movies currently playing in theaters from The Movie Database. Poster images must be loaded asynchronously. Use the latest movies data from the Movie Database API. Ensure you can hit the "Now Playing" endpoint in a browser. This shows the data we will be using from The Movies Database. Note: It's helpful to install the JSON Formatter Chrome Extension to browse the returned JSON easily. Sample Request: https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed
x User can view movie details by tapping on a cell.
x User can pull to refresh the movie list or you can reference Week 1 Lab [Bonus 2: Infinite Scrolling]
A few key pointers:

ListView
Hint: ListView
x Add a tab bar for Now Playing or Top Rated movies. Hint: React Native does not design Tabbar for android, you we have to use an external component tab bar component.
x Implement a Nagivator to switch between a list view and a grid view. (high). Hint: Follow the Prework instruction Navigator. Feel free to use React Navigation if you like.

Extra:
x Add a search bar (see below)
x All images fade in as they are loading. (see below). Hint: The image should only fade in if it's coming from network, not cache, we use external component react-native-image-progress
x For the large poster, load the low-res image first and switch to high-res when complete. (low)
