#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
# set -o xtrace # for debugging

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

main() {
  docker build -t myauthtest.azurecr.io/web:latest "${dir}/.."
}

main "$@"
