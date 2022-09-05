# Hot or Not 2

<center>
<img src="https://guissmo.com/hot-or-not-data/logo.png"/>
</center>

Hot or Not is a game involving temperature.

In each round, you are shown two cities and you have to guess whether or not the second is **hotter** than the first.

Your score depends on the number of consecutive rounds you answer correctly.

This is a new version of [Hot or Not](https://github.com/hot-or-not), a React app I made to study React.

Link: [Hot or Not 2](https://hotornot.guissmo.com)

## What's New in this Version?

### Mobile Friendly

Majority of internet users are on the phone these days. As browser viewports vary, the app not only shrinks and grows but it could also rearrange its layout for the best user experience.

<center>
<img src="https://guissmo.com/hot-or-not-data/iphone12pro.png" width="200px"/>
</center>

### CSS Animations

This project was motivated by wanting to learn CSS animations and CSS transitions. I chose to do it manually for this project, as opposed to using a library to get a better grasp of it.

<center>
<img src="https://guissmo.com/hot-or-not-data/css-transitions.gif" />
</center>

### Loading Icons

Since this app fetches real-time data, some delay may occur. Hence, various loading indicators are on the app so that it is perceived as faster.

### Share Buttons

I've also manually coded Share Buttons, as opposed to using a library. It should make the app easier to share and perhaps it could gain more traffic that way.

### More Suspense

After giving your answer, the app takes a few milliseconds to reveal the answer. The manner in which it does so is a hand-made function inside to make the game more exciting.

This is a change from before when the *suspense* mechanism was to display random numbers and suddenly stop at the correct answer.

## Technologies Used

* **CSS**, for animations and transitions.
* **React**, the popular front-end Javascript library.
* **VS Code**, and various extensions such as:
  * **prettier**
  * **ES Lint**
* **Docker**, to containerize and deploy.

## Credits

* [**Open Weather API**](https://openweathermap.org/api) for up-to-date temperature readings
* [**Teleport Cities API**](https://developers.teleport.org/api/) and the various photographers (credited in the app) for the city images
* [**Free SVG Backgrounds**](https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/) for the backgrounds
