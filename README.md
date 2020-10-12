[![PRETTIER](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://gitter.im/jlongster/prettie)
[![LICENSE](https://img.shields.io/github/license/arshadkazmi42/awesome-github-init.svg)](https://github.com/arshadkazmi42/awesome-github-init/LICENSE)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Flucioerlan%2FWeb-Chatbot&count_bg=%23E71A18&title_bg=%23555555&icon=dependabot.svg&icon_color=%23E7E7E7&title=views&edge_flat=false)](https://hits.seeyoufarm.com)

![web-bot](https://user-images.githubusercontent.com/67064886/93042515-9dce7e80-f625-11ea-8b70-22e08db73438.gif)

<br>

# Description

This is a chatbot made in nodejs, for the web, this chatbot does not use any external api or dependencies, some conversion functions and machine learning understanding have been implemented. This service has 2 panels, 1 to create questions for the chatbot and another to manage users. To incorporate chatbot on your website, it's very easy to just go to localhost: 9300 / teste to see an example.

 <br>

## 🔨 Installation

 <br>

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
git clone https://github.com/lucioerlan/web-chatbot.git
$ cd web-chatbot
$ npm install
```

---

<br>

## 🔥 Setup

```
Create a database called web-bot
```

```
$ cp .env-examples .env
```

---

<br>

## 🙋 Create as tables in the database and fill in the data

```bash
$ npx knex migrate:latest
```

```bash
$ npx knex seed:run
```

---

<br>

## 🚀 Running

```
$ npm start
```

### Running with Docker 🐳

```
$ docker build -t web-chat/node .
```

```
$ docker run web-chat/node
```

<br>

## 🔓 License

This project lives under MIT License. See LICENSE for more details. © - [Erlan Lucio](https://www.linkedin.com/in/erlanlucio/)
