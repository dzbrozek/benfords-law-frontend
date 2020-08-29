.PHONY : testci
# Test CI
testci:
	act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04 --env-file "no-default-env-file" $(arguments)

.PHONY : help
# Show help
help:
	@awk '/^#/{c=substr($$0,3);next}c&&/^[[:alpha:]][[:alnum:]_-]+:/{print substr($$1,1,index($$1,":")),c}1{c=0}' $(MAKEFILE_LIST) | column -s: -t


.DEFAULT_GOAL := help
