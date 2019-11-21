# Step By Step How-To

We describe here the followed path from scratch until we have a fully working solution.
We regularly make SNAPSHOT of the state of the code with branches in order for the reader to be able to see the various steps within the code.

_All the following as been written and tested on CentOS, adapt if necessary_.

## v0.0.1 - initialise golang part

- Install the various required software
- Create a repo on github and clone it locally
- Create a simple tree structure for go
- Add a simple main
- Initialise modules

At this point (tag v0.0.1), you should then be able to compile, run and test this dummy entry point

```sh
cd <path to your repo>
go run main.go
# or
go build -o awc main.go
./awc

# In another shell
$ curl http://localhost:8888/api/
> {"message":"Hello world!"}
```

## v0.0.2 - initialise react

```sh
# at the root of your project
npx create-react-app frontend
cd frontend
npm start
# Your browser opens on the generic reactJS landing page
```

You might then edit and customise a few of the default created resources to tune your app.

## v0.0.3 - integrate go and react

Once you have the preceeding steps done, you can easily integrate Go and Js parts by exposing the built JS via the main Gin router in Go. In our context, we simply have to add a route at the base path in your gin router to forward all traffic to your static files:

```go
router.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))
```

A very common trick is then to add `"proxy": "http://localhost:8888",` to your `frontend/package.json` file, this adds a proxy that lets you start both the go server and the react app (via nodejs) while being able to directly see the changes you make in the ReactJS app in your browser when developping. See [this post](https://create-react-app.dev/docs/proxying-api-requests-in-development/) for more info.

### Use axios to make API calls from the frontend to the backend

To validate this works, we include axios in our dependencies:

```sh
cd frontend
npm install --save axios
```

And implement a very basic call to the api using a skeleton of the Hello handler that will be re-used after when plug in Cells.

## v0.0.4 - add Redux to the mix

```sh
cd frontend
npm install --save redux react-redux redux-thunk
# Out of lazyness, also add material UI core, to easily add a button
npm install --save @material-ui/core
```

You can check the `index.js` file to see the _tricks_ we use to ease development when using redux:

- You might also want to install and enable dev tools plugins for react and redux in your browser.
- We add a middleware that enables debugging the redux state and actions in dev mode via Chrome.
- Normally reducers in Redux are synchronous, we add thunk to also support promises and so enable API call via axios in the reducers_.

Once Redux has been installed and the go backend updated, you can test :

```sh
# check if the backend returns expected response:
curl -i -X POST -H "Content-Type:application/json" http://localhost:8888/auth/login -d '{"email":"alice@example.com","password":"pwd","returnSecureToken":true}'
```

## v0.1.0 - Wrap up

At this point we have a working Golang App that exposes a front-end that is Redux enabled and can communicate with the go backend smoothly to update its state.

We can now bundle this and start only the go app:

```sh
# Package the javascript with npm
cd frontend
npm run build
# Build the Go binary
cd ..
go build -o awc main.go
# Start the app
./awc
```

Yet, if you push your binary to your server and launch it, you will get:

- some json back when visiting `<your IP address>:8888>/api/`
- a 404 error if you visit the root of your website: `<your IP address>:8888>`

It comes from the fact that your static built js files are not by default embedded in the go binary. That is when [Packr](https://github.com/gobuffalo/packr) comes to the rescue.

First we have to adapt our code a little bit, see `main.go`:

- declare a box
- expose it a static files under `/ui`: we cannot expose a raw file system at the root of the website
- declare the prefix in the `package.json` file, so that the prefixed is used only in deployment mode
- add a redirect at root path toward `/ui`, so that the end user can still access the website at `<your domain name>`.

```sh
# First install packer from *outside of your project*
cd
go get -u github.com/gobuffalo/packr/packr
cd -
# Then to bundle the static files as go files
$GOPATH/bin/packr -v
# Finally rebuild the Go binary that embeds everything:
go build -o awc main.go
```

You can now deploy your binary on your server, and start it.

_Note: although builds should be Linux-type independant, we noticed that the Packr process fails to display js file when building on a CentOS machine and deploying on a Debian, while the opposite works_.

We will now focus on the funny part: adding Cells as an identity provider.
