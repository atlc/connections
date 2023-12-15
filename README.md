# Connections!

### Purpose

This application is built for keeping track of my family's scoreboards for the [NYT's 'Connections' game](https://www.nytimes.com/games/connections), storing a long history of each individual player's board and providing analytical statistics and leaderboards for various performance metrics.

Some of the metrics include finding total wins, each player's winning accuracy, calculating the mean and standard deviation of the cumulative playerbase accuracy, calculating each individual player's standard deviations, amount of perfect boards, amount of times to be the first respondent, the average time it takes to play, amount of days actively played, and the overall max streak of amount of days actively played.

To keep everything as streamlined as possible for my non-tech-adjacent family, user input is taken directly from the copy-pasted output from the New York Times and parsed and sanitized to strip and organize the data.

Below are some screenshots showing a brief overview of the functionality.

### Desktop screenshots

<details open>
<summary>Submissions from multiple days of boards</summary>

![Submissions of two days of boards in a roughly widescreen aspect ratio](./media/Boards_Wide.png "Widescreen Board Submissions")

</details>

<details open>
<summary>Leaderboard metrics</summary>

![A leaderboard in a roughly widescreen aspect ratio keeping track of various scores and metrics](./media/Leaderboard_Wide.png "Widescreen Leaderboard")

</details>

### Mobile screenshots

<details>
<summary>Submissions from multiple days of boards</summary>

![Submissions of two days of boards in a roughly portrait aspect ratio](./media/Boards_Responsive.png "Mobile/Responsive Board Submissions")

</details>

<details>
<summary>Leaderboard metrics</summary>

![A leaderboard in a roughly portrait aspect ratio keeping track of various scores and metrics](./media/Leaderboard_Responsive.png "Responsive Leaderboard")

</details>

<br />
<br />

# Tech Details

### Stack

##### Client

Just a good bit of Typescript & React. This was initially meant more as a PoC, so styling is just some quick and dirty Bootstrap.

##### Server

The server is a pretty minimalist Typescript+Node express server. For the persistent data, all data is stored long-term via MySQL, but there is a Redis cache serving the data to optimize response time. Upon a new board being created, the cache is updated.

### Roadmap

##### Miscellaneous

Play nice chimes audio if you submit your score in under 60s; triple airhorn for a perfect score under 60s

##### Data architecture/state management

Since this left concept territory pretty quickly, my initial data architecture has migrated several times over with the desire to add in additional capabilities. As a result, there's a good bit of state creep, and being structured with many smaller components, there's a lot of prop drilling going on. Some global state management on the client side is close to becoming a necessity, and currently it seems like [Zustand](https://zustand-demo.pmnd.rs/) might be the better fit for my use cases over Redux/RTK or something more granular like Jotai. Before that, I'd also like to offload some of the calculations back to the server.

##### Styling

I'll likely be migrating the UI to using Tailwind at some point, especially given that everything is capable of using responsive breakpoints.

##### Operations/interactivity

A major downstream plan is instead of having this one singular board instance, is to allow the creation of multiple shared instances so that I can make this app available for public usage.
