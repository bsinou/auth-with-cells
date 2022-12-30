module github.com/bsinou/auth-with-cells

go 1.12

require (
	github.com/gin-gonic/gin v1.7.0
	github.com/gobuffalo/packr v1.30.1
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.1 // indirect
)

// Fix a conflict with module dependencies see: https://github.com/ugorji/go/issues/279#issuecomment-457813818
replace github.com/ugorji/go v1.1.4 => github.com/ugorji/go/codec v0.0.0-20190204201341-e444a5086c43
