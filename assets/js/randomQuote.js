const QUOTES = [
  // No Place Like Home, Marianas Trench (Ever After)
  "Carolina, Carolina, tell me how I'm gonna get down from here?",
  // No Place Like Home, Marianas Trench (Ever After)
  "Toy soldiers, will you follow?",
  // Astoria, Marianas Trench (Astoria) [*Romeo and Juliet]
  "Never after will suffice when star-crossed lovers take their lives",
  // Masterpiece Theatre II, Marianas Trench (Masterpiece Theatre)
  "This masterpiece will tear you apart.",
  // Echoes of You, Marianas Trench (The Killing Kind) [*It]
  "I thrust my fist into the post; I still insist I see the ghost",
  // Celebrity Status, Marianas Trench (Masterpiece Theatre)
  "When the mirrors and the lights and the smoke clear",
  // Low, Marianas Trench (Fix Me)
  "This used to be easy!",
  // // Come On Now, Miss Amani
  // "You make me feel alive; Energy is crazy tonight!",
  // // Unfragment, Hanasoumen-P
  // "I touch your world",
  // // Saving Light, Gareth Emery & Standerwick feat. HALIENE
  // "I'm standing at the edge",
  // // Rewrite the Stars, Zac Efron & Zendaya [The Greatest Showman]
  // "I know you're wondering why",
  // // I'm a mess, Ed Sheeran
  // "See the flames inside my eyes",
];

function showQuote() {
  // Get random quote
  let quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  // Display it
  document.getElementById("my-quote").innerHTML = quote;
}

window.addEventListener("load", showQuote);
