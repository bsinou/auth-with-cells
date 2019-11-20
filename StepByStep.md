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




