# Character Quick-ref Cards
## Character notes: on-hand, customized, flexible, printable! 

dnd-characters-quickref is a website designed for flexibly creating note cards for characters in various TTRPGs, videogames, and more. Cards are data-driven and responsive, allowing an organizer to tweak them to their preferred style.

![demo](https://github.com/wesrupert/dnd-character-quickref/blob/33fff9f1daaa8c5adfff15bb5aa4a9933e17a56d/assets/demo.gif)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Docker

## Build

- Clone this repository
- Place any character portraits as desired in the public directory
- Run `docker build . -t character-quickref-cards:latest`

## Deploy

- To run the container directly you can run `docker run -it --rm -p 8080:80 character-quickref-cards:latest`
- To use docker-compose, simply use `docker-compose up`
